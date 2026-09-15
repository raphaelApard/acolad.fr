// Builds the deployable site into `dist/`.
//
// - Inlines the minified stylesheet in every page (no render-blocking request).
// - Turns every `<img sizes="…">` pointing to a raster image in /assets/ into a
//   responsive `<picture>`: WebP `srcset` plus a PNG (transparent images) or
//   JPEG fallback, at widths capped by the source image.
// - Copies the other site files as they are.
//
// The source files remain a working site on their own (local preview without
// building); `dist/` is what gets uploaded.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");

const SITE_FILES = ["index.html", "en", "404.html", "robots.txt", "sitemap.xml", ".htaccess", "js", "assets"];
const STYLESHEET = "css/style.css";
const WIDTHS = [120, 180, 240, 320, 480, 640, 960, 1280, 1920];
const RASTER = /\.(png|jpe?g|webp|avif)$/i;

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

/** Conservative minifier for hand-written CSS (keeps `calc()` operators intact). */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();
}

// ---------------------------------------------------------------------------
// 1. Copy site files
// ---------------------------------------------------------------------------
fs.rmSync(dist, { recursive: true, force: true });
for (const entry of SITE_FILES) {
  fs.cpSync(path.join(root, entry), path.join(dist, entry), { recursive: true });
}

// ---------------------------------------------------------------------------
// 2. Responsive images
// ---------------------------------------------------------------------------
const responsive = new Map(); // source URL -> { widths, fallback, url }
let imageBytes = 0;

async function buildResponsiveImage(src) {
  if (responsive.has(src)) return responsive.get(src);

  const master = path.join(root, src);
  const { width: masterWidth, hasAlpha } = await sharp(master).metadata();
  const widths = [...WIDTHS.filter((w) => w < masterWidth * 0.9), masterWidth];
  const fallback = hasAlpha ? "png" : "jpg";
  const { dir, name } = path.parse(src);
  const url = (width, ext) => `${dir}/${name}-${width}.${ext}`;

  await Promise.all(
    widths.flatMap((width) => {
      const resized = () => sharp(master).resize({ width, withoutEnlargement: true });
      const webp = resized()
        .webp({ quality: 80, alphaQuality: 100, effort: 6 })
        .toFile(path.join(dist, url(width, "webp")));
      const legacy = hasAlpha
        ? resized()
            .png({ palette: true, quality: 85, compressionLevel: 9, effort: 10 })
            .toFile(path.join(dist, url(width, "png")))
        : resized()
            .flatten({ background: "#ffffff" })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(path.join(dist, url(width, "jpg")));
      return [webp, legacy].map((job) => job.then((info) => (imageBytes += info.size)));
    }),
  );

  const result = { widths, fallback, url };
  responsive.set(src, result);
  return result;
}

// ---------------------------------------------------------------------------
// 3. Rewrite HTML: inline CSS, <img sizes> -> <picture>
// ---------------------------------------------------------------------------
const css = minifyCss(fs.readFileSync(path.join(root, STYLESHEET), "utf8"));
const stylesheetLink = /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="\/css\/style\.css[^"]*"[^>]*>/g;
const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8").replace(stylesheetLink, `<style>${css}</style>`);
  if (html.includes("/css/style.css")) {
    throw new Error(`Stylesheet link not inlined in ${path.relative(dist, file)}`);
  }

  for (const tag of new Set(html.match(/<img\b[^>]*>/g) ?? [])) {
    const src = attribute(tag, "src");
    const sizes = attribute(tag, "sizes");
    if (!src || !sizes || !src.startsWith("/assets/") || !RASTER.test(src)) continue;

    const { widths, fallback, url } = await buildResponsiveImage(src);
    const srcset = (ext) => widths.map((w) => `${url(w, ext)} ${w}w`).join(", ");
    const img = tag.replace(
      /\ssrc="[^"]*"/,
      ` src="${url(widths.at(-1), fallback)}" srcset="${srcset(fallback)}"`,
    );
    const picture = `<picture><source type="image/webp" srcset="${srcset("webp")}" sizes="${sizes}" />${img}</picture>`;
    html = html.split(tag).join(picture);
  }

  fs.writeFileSync(file, html);
}

// Source images replaced by generated variants are not uploaded.
const allHtml = htmlFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const src of responsive.keys()) {
  if (!allHtml.includes(`"${src}"`)) fs.rmSync(path.join(dist, src));
}

console.log(`build: CSS inlined (${kb(css.length)} minified) in ${htmlFiles.length} pages`);
console.log(`build: ${responsive.size} responsive images, ${kb(imageBytes)} of WebP + fallback variants`);
console.log(`build: done -> ${path.relative(root, dist)}/`);
