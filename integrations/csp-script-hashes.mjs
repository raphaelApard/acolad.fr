// @ts-check
// Fills the Content-Security-Policy of dist/.htaccess with the SHA-256 of every inline
// <script> in the built pages, so script-src needs no 'unsafe-inline'. The placeholder
// lives in public/.htaccess; any script change is picked up on the next build.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PLACEHOLDER = '{{CSP_SCRIPT_HASHES}}';

// Inline scripts only: external ones are covered by their origin, and data blocks
// (JSON-LD) are never executed.
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;

/** @param {string} html */
export function inlineScriptHashes(html) {
  return [...html.matchAll(INLINE_SCRIPT)].map(
    ([, body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`,
  );
}

/** @returns {import('astro').AstroIntegration} */
export default function cspScriptHashes() {
  return {
    name: 'csp-script-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const pages = (await readdir(root, { recursive: true })).filter((file) => file.endsWith('.html'));
        const hashes = new Set();
        for (const page of pages) {
          for (const hash of inlineScriptHashes(await readFile(join(root, page), 'utf8'))) hashes.add(hash);
        }

        const htaccess = join(root, '.htaccess');
        const config = await readFile(htaccess, 'utf8');
        if (!config.includes(PLACEHOLDER)) throw new Error(`${PLACEHOLDER} not found in .htaccess`);
        await writeFile(htaccess, config.replace(PLACEHOLDER, [...hashes].sort().join(' ')));
        logger.info(`${hashes.size} inline script hashes written to the .htaccess CSP`);
      },
    },
  };
}
