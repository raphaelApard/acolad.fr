import type { APIRoute } from 'astro';
import { alternates, defaultLang, getSite, langs, pageIds, type Lang, type PageId } from '../site';

// Every indexable page in every locale, with the same alternates as the hreflang links in
// Base.astro. Only the legal notice carries a date: the other pages have no edit date of
// their own. One file is enough at this size.
const site = import.meta.env.SITE;

function entries(id: PageId): string {
  const url = (lang: Lang) => new URL(alternates(id)[lang], site).href;
  const links = [...langs.map((lang) => ({ hreflang: lang, href: url(lang) })), { hreflang: 'x-default', href: url(defaultLang) }]
    .map(({ hreflang, href }) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('');
  return langs
    .map((lang) => {
      const lastmod = id === 'legal' ? `<lastmod>${getSite(lang).legal.updatedAt}</lastmod>` : '';
      return `<url><loc>${url(lang)}</loc>${lastmod}${links}</url>`;
    })
    .join('');
}

export const GET: APIRoute = () =>
  new Response(
    '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
      pageIds.map(entries).join('') +
      '</urlset>\n',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
