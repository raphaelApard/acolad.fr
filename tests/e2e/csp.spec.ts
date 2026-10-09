import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { inlineScriptHashes, PLACEHOLDER } from '../../integrations/csp-script-hashes.mjs';

// Reads the build the web server was started from (Apache headers are not served by astro preview).
test('allows every inline script in the .htaccess CSP', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'checks files, once is enough');
  const dist = join(process.cwd(), 'dist');
  const csp = (await readFile(join(dist, '.htaccess'), 'utf8')).match(/Content-Security-Policy "([^"]+)"/)![1]!;
  expect(csp).not.toContain(PLACEHOLDER);
  const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src'))!;
  expect(scriptSrc).not.toContain("'unsafe-inline'");

  const pages = (await readdir(dist, { recursive: true })).filter((file) => file.endsWith('.html'));
  for (const page of pages) {
    for (const hash of inlineScriptHashes(await readFile(join(dist, page), 'utf8'))) {
      expect(scriptSrc, page).toContain(hash);
    }
  }
});
