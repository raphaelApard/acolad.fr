import type { APIRoute } from 'astro';
import { getAbsoluteLocaleUrl } from 'astro:i18n';
import { caseStudies, defaultLang, findCaseStudy, langs } from '../content';
import type { Lang } from '../content/types';

// Every indexable page in every locale, with the same alternates as the hreflang links in
// Base.astro. One file is enough at this size.
const site = import.meta.env.SITE;

/** A page in every locale, as absolute URLs. */
function page(url: (lang: Lang) => string): string {
  const alternates = [...langs.map((lang) => ({ hreflang: lang, href: url(lang) })), { hreflang: 'x-default', href: url(defaultLang) }]
    .map(({ hreflang, href }) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('');
  return langs.map((lang) => `<url><loc>${url(lang)}</loc>${alternates}</url>`).join('');
}

const urls = [
  page((lang) => getAbsoluteLocaleUrl(lang)),
  ...caseStudies(defaultLang).map(({ caseStudy: { slug } }) =>
    page((lang) => new URL(findCaseStudy(lang, slug).caseStudy.path, site).href),
  ),
].join('');

export const GET: APIRoute = () =>
  new Response(
    '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
      urls +
      '</urlset>\n',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
