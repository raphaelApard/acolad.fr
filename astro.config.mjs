// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Production URL, used for canonical, hreflang and sitemap URLs.
  site: 'https://acolad.fr',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // `/` is only a redirect to `/fr/`.
      filter: (page) => new URL(page).pathname !== '/',
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-GB' },
      },
    }),
  ],
});
