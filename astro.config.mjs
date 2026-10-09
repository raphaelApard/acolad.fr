// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cspScriptHashes from './integrations/csp-script-hashes.mjs';

export default defineConfig({
  // Production URL, used for canonical, hreflang and sitemap URLs.
  site: 'https://www.acolad.fr',
  trailingSlash: 'always',
  integrations: [cspScriptHashes()],
  // One page per locale: inlining the CSS (~5 KB gzipped) saves a render-blocking request.
  build: {
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    // French at the root (/), English under /en/.
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Self-hosted fonts, Latin subset only (the copy has no other script).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-schibsted',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2'],
            weight: '400 800',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2'],
            weight: 500,
            style: 'normal',
          },
        ],
      },
    },
  ],
});
