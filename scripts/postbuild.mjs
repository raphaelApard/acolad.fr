// Post-processes the static export in `out/`.
//
// 1. Removes the React/Next.js client runtime. Every page is fully
//    server-rendered and the only interactive part (the mobile menu) uses the
//    native Popover API, so the runtime is pure overhead (~180 KB of JS,
//    hydration long task, duplicated RSC payload in the HTML).
//    ⚠️ If you add a Client Component ("use client") later, remove this step.
// 2. Generates the responsive WebP variants referenced by `next/image`
//    (see src/lib/image-loader.ts): `srcset` candidates wider than the source
//    image are collapsed into one at the real width, then only the variants
//    still referenced are encoded. Unused original images are deleted.
// 3. Recompresses the generated PNG share images (OG images, Apple touch icon).
// 4. Adds long-term caching for hashed assets (Apache).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("out");
const mediaDir = path.join(outDir, "_next", "static", "media");
const MEDIA_URL = "/_next/static/media/";
const WEBP_QUALITY = 80;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));
const readHtml = (file) => fs.readFileSync(file, "utf8");

// ---------------------------------------------------------------------------
// 1. Strip the client runtime
// ---------------------------------------------------------------------------
const runtimePatterns = [
  /<script\b[^>]*\bsrc="\/_next\/static\/[^"]+"[^>]*><\/script>/g,
  /<script>\(?self\.__next_f[\s\S]*?<\/script>/g,
  /<link\b[^>]*\brel="(?:preload|modulepreload)"[^>]*\bas="script"[^>]*\/?>/g,
  /<link\b[^>]*\bas="script"[^>]*\brel="(?:preload|modulepreload)"[^>]*\/?>/g,
];

let runtimeBytes = 0;
for (const file of htmlFiles) {
  const html = readHtml(file);
  let stripped = html;
  for (const pattern of runtimePatterns) stripped = stripped.replace(pattern, "");

  if (/\/_next\/static\/[^"]+\.js/.test(stripped) || /self\.__next_f/.test(stripped)) {
    throw new Error(`Client runtime still referenced in ${path.relative(outDir, file)}`);
  }

  runtimeBytes += html.length - stripped.length;
  fs.writeFileSync(file, stripped);
}

// Files only the client router uses: JS chunks and RSC payloads.
for (const file of walk(outDir)) {
  const name = path.basename(file);
  const isChunk =
    file.includes(`${path.sep}_next${path.sep}static${path.sep}chunks${path.sep}`) && name.endsWith(".js");
  const isRscPayload = name.endsWith(".txt") && (name === "index.txt" || name.startsWith("__next."));
  if (isChunk || isRscPayload) {
    runtimeBytes += fs.statSync(file).size;
    fs.rmSync(file);
  }
}
console.log(`postbuild: removed ${kb(runtimeBytes)} of client runtime`);

// ---------------------------------------------------------------------------
// 2. Responsive WebP variants
// ---------------------------------------------------------------------------
const isOriginalImage = (name) =>
  /\.(png|jpe?g|webp|avif)$/i.test(name) && !/\.\d+w\.webp$/.test(name);
const mediaFiles = fs.existsSync(mediaDir) ? fs.readdirSync(mediaDir) : [];

// base name (without extension) -> { file, width }
const originals = new Map();
for (const name of mediaFiles.filter(isOriginalImage)) {
  const { width } = await sharp(path.join(mediaDir, name)).metadata();
  originals.set(name.replace(/\.[a-z0-9]+$/i, ""), { file: name, width });
}

const variantUrl = /^\/_next\/static\/media\/(.+)\.(\d+)w\.webp$/;

/** Drops srcset candidates wider than the source; adds one at the real width. */
function clampSrcset(srcset) {
  const kept = [];
  const clampedTo = new Set();

  for (const candidate of srcset.split(",").map((c) => c.trim()).filter(Boolean)) {
    const [url, descriptor = ""] = candidate.split(/\s+/);
    const match = url.match(variantUrl);
    const source = match && originals.get(match[1]);
    if (!source || !descriptor.endsWith("w")) {
      kept.push({ url, descriptor });
      continue;
    }
    // Widths within 15% of the source are not worth a separate, re-encoded file.
    if (Number(match[2]) < source.width * 0.85) {
      kept.push({ url, descriptor, width: Number(match[2]) });
    } else if (!clampedTo.has(match[1])) {
      clampedTo.add(match[1]);
      kept.push({
        url: `${MEDIA_URL}${match[1]}.${source.width}w.webp`,
        descriptor: `${source.width}w`,
        width: source.width,
      });
    }
  }
  return kept;
}

function rewriteImageTag(tag) {
  const srcsetAttr = /\b(srcset|imagesrcset)="([^"]*)"/i;
  const found = tag.match(srcsetAttr);
  if (!found) return tag;

  const candidates = clampSrcset(found[2]);
  const largest = candidates.filter((c) => c.width).at(-1);
  let rewritten = tag.replace(
    srcsetAttr,
    `${found[1]}="${candidates.map((c) => `${c.url} ${c.descriptor}`.trim()).join(", ")}"`,
  );
  if (largest) {
    rewritten = rewritten.replace(
      /\b(src|href)="\/_next\/static\/media\/[^"]+\.\d+w\.webp"/,
      `$1="${largest.url}"`,
    );
  }
  return rewritten;
}

for (const file of htmlFiles) {
  const html = readHtml(file);
  const rewritten = html.replace(/<img\b[^>]*>|<link\b[^>]*\bas="image"[^>]*>/g, rewriteImageTag);
  if (rewritten !== html) fs.writeFileSync(file, rewritten);
}

// Encode every variant still referenced by the HTML.
const variants = new Map();
for (const file of htmlFiles) {
  for (const [, base, width] of readHtml(file).matchAll(/\/_next\/static\/media\/([^"'\s,?]+)\.(\d+)w\.webp/g)) {
    variants.set(`${base}.${width}w.webp`, { base, width: Number(width) });
  }
}

let variantBytes = 0;
await Promise.all(
  [...variants].map(async ([variantName, { base, width }]) => {
    const source = originals.get(base);
    if (!source) throw new Error(`No source image for ${variantName}`);
    const sourcePath = path.join(mediaDir, source.file);

    let output = await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, alphaQuality: 100, effort: 6 })
      .toBuffer();

    // Re-encoding an already optimized WebP at full size can make it bigger.
    const sourceBytes = fs.statSync(sourcePath).size;
    if (width >= source.width && source.file.endsWith(".webp") && output.length > sourceBytes) {
      output = fs.readFileSync(sourcePath);
    }

    fs.writeFileSync(path.join(mediaDir, variantName), output);
    variantBytes += output.length;
  }),
);

// Originals are no longer needed once every <img> points to a variant.
const referencedText = walk(outDir)
  .filter((file) => /\.(html|css|xml|webmanifest)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
let removedOriginals = 0;
for (const { file } of originals.values()) {
  if (!referencedText.includes(file)) {
    removedOriginals += fs.statSync(path.join(mediaDir, file)).size;
    fs.rmSync(path.join(mediaDir, file));
  }
}

console.log(
  `postbuild: ${variants.size} WebP variants (${kb(variantBytes)}), removed ${kb(removedOriginals)} of unused originals`,
);

// ---------------------------------------------------------------------------
// 3. Share images must stay PNG (social networks), but can be quantized.
// ---------------------------------------------------------------------------
let pngSaved = 0;
for (const file of walk(outDir).filter((f) => /(?:^|[\\/])(opengraph-image(-\w+)?|apple-icon)$/.test(f))) {
  const input = fs.readFileSync(file);
  const output = await sharp(input)
    .png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 })
    .toBuffer();
  if (output.length < input.length) {
    pngSaved += input.length - output.length;
    fs.writeFileSync(file, output);
  }
}
console.log(`postbuild: share images recompressed (-${kb(pngSaved)})`);

// ---------------------------------------------------------------------------
// 4. Hashed build assets never change: cache them for a year.
// ---------------------------------------------------------------------------
fs.writeFileSync(
  path.join(outDir, "_next", "static", ".htaccess"),
  [
    "<IfModule mod_headers.c>",
    '  Header set Cache-Control "public, max-age=31536000, immutable"',
    "</IfModule>",
    "<IfModule mod_expires.c>",
    "  ExpiresActive On",
    '  ExpiresDefault "access plus 1 year"',
    "</IfModule>",
    "",
  ].join("\n"),
);
