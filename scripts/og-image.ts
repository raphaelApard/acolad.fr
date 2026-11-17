// Draws the preview image pages show when they are shared: public/og-<lang>.png, 1200 × 630,
// with the company logo (public/logo.png) and the home page heading of that locale.
//
//   node scripts/og-image.ts        (or `pnpm og:image`)
//
// Run it again when the home heading or the visual identity changes, and commit the files.
// The addresses stay the same, so previews already cached by social networks are replaced on
// their next fetch. Needs Node 22.18+ and the Chromium of Playwright (`pnpm exec playwright install chromium`).

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const langs = ['fr', 'en'];
const size = { width: 1200, height: 630 };

const font = (file: string) => pathToFileURL(path.join(root, 'node_modules', file)).href;

/** The home page heading: the first `h1` of the copy, split after its muted opening words. */
async function heading(lang: string): Promise<{ muted: string; rest: string }> {
  const copy = await readFile(path.join(root, 'src/site', `${lang}.ts`), 'utf8');
  const h1 = copy.match(/\bh1: (['"])(.+)\1,/)?.[2];
  const muted = copy.match(/\bh1Muted: (['"])(.+)\1,/)?.[2];
  if (!h1 || !muted || !h1.startsWith(muted)) throw new Error(`Home heading not found in src/site/${lang}.ts`);
  return { muted, rest: h1.slice(muted.length) };
}

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Colors and fonts of src/styles/tokens.css; the logo is the company's own file.
function html({ muted, rest }: { muted: string; rest: string }): string {
  return `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face { font-family: 'Space Grotesk'; font-weight: 500 700;
    src: url('${font('@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2')}'); }
  @font-face { font-family: 'JetBrains Mono'; font-weight: 500;
    src: url('${font('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2')}'); }
  * { margin: 0; box-sizing: border-box; }
  body { width: ${size.width}px; height: ${size.height}px; padding: 0 80px 0 72px; background: #fff; color: #0b1220;
    font-family: 'Space Grotesk'; display: flex; align-items: center; gap: 72px; border-bottom: 12px solid #2247e6; }
  img { height: 440px; flex: none; }
  h1 { font-size: 62px; line-height: 1.1; font-weight: 600; letter-spacing: -0.03em; }
  h1 span { color: #5a6472; }
  .url { margin-top: 36px; font-family: 'JetBrains Mono'; font-weight: 500; font-size: 26px; color: #2247e6; }
</style>
<img src="${pathToFileURL(path.join(root, 'public/logo.png')).href}" alt="">
<div>
  <h1><span>${escape(muted)}</span>${escape(rest)}</h1>
  <div class="url">www.acolad.fr</div>
</div>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
for (const lang of langs) {
  // Loaded from a file URL so the page may read the font files of node_modules.
  await page.goto(pathToFileURL(path.join(root, 'package.json')).href);
  await page.setContent(html(await heading(lang)));
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluate((img: HTMLImageElement) => img.decode());
  const file = path.join(root, 'public', `og-${lang}.png`);
  await page.screenshot({ path: file });
  console.log(`Wrote ${path.relative(root, file)}`);
}
await browser.close();
