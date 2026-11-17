// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cspScriptHashes from './integrations/csp-script-hashes.mjs';

export default defineConfig({
  // Production URL, used for canonical, hreflang and sitemap URLs.
  site: 'https://www.acolad.fr',
  trailingSlash: 'always',
  integrations: [cspScriptHashes()],
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
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            weight: '400 600',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'],
            weight: '500 700',
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
