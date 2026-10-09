import type { APIRoute } from 'astro';
import { getAbsoluteLocaleUrl } from 'astro:i18n';
import { defaultLang, langs } from '../content';

// One file is enough for one page per locale; alternates mirror the hreflang links in Base.astro.
const alternates = [
  ...langs.map((lang) => ({ hreflang: lang, href: getAbsoluteLocaleUrl(lang) })),
  { hreflang: 'x-default', href: getAbsoluteLocaleUrl(defaultLang) },
]
  .map(({ hreflang, href }) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
  .join('');

const urls = langs.map((lang) => `<url><loc>${getAbsoluteLocaleUrl(lang)}</loc>${alternates}</url>`).join('');

export const GET: APIRoute = () =>
  new Response(
    '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
      urls +
      '</urlset>\n',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
