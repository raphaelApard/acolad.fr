import type { APIRoute } from 'astro';
import { getAbsoluteLocaleUrl } from 'astro:i18n';
import { caseStudies, defaultLang, findCaseStudy, getContent, langs } from '../content';
import type { Lang } from '../content/types';

// Every indexable page in every locale, with the same alternates as the hreflang links in
// Base.astro and the date of its last change in the backoffice. One file is enough at this size.
const site = import.meta.env.SITE;

interface Page {
  url: (lang: Lang) => string;
  /** ISO date of the last change of the page in that locale. */
  updatedAt: (lang: Lang) => string;
}

function entries({ url, updatedAt }: Page): string {
  const alternates = [...langs.map((lang) => ({ hreflang: lang, href: url(lang) })), { hreflang: 'x-default', href: url(defaultLang) }]
    .map(({ hreflang, href }) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('');
  return langs
    .map((lang) => `<url><loc>${url(lang)}</loc><lastmod>${updatedAt(lang).slice(0, 10)}</lastmod>${alternates}</url>`)
    .join('');
}

const pages: Page[] = [
  { url: (lang) => getAbsoluteLocaleUrl(lang), updatedAt: (lang) => getContent(lang).meta.updatedAt },
  ...caseStudies(defaultLang).map(({ caseStudy: { slug } }) => ({
    url: (lang: Lang) => new URL(findCaseStudy(lang, slug).caseStudy.path, site).href,
    updatedAt: (lang: Lang) => findCaseStudy(lang, slug).caseStudy.updatedAt,
  })),
  {
    url: (lang) => new URL(getContent(lang).legal.path, site).href,
    updatedAt: (lang) => getContent(lang).legal.updatedAt,
  },
];

export const GET: APIRoute = () =>
  new Response(
    '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
      pages.map(entries).join('') +
      '</urlset>\n',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
