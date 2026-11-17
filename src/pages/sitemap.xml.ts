import { execFileSync } from 'node:child_process';
import type { APIRoute } from 'astro';
import { alternates, defaultLang, getSite, langs, pageIds, type Lang, type PageId } from '../site';

// Every indexable page in every locale, with the same alternates as the hreflang links in
// Base.astro, and the date it last changed. One file is enough at this size.
const site = import.meta.env.SITE;

/**
 * Day the copy of a locale was last committed: every page of a locale is written in one file,
 * so they share that date. The legal notice states its own. Without git (a build from an
 * archive), pages carry no date rather than a wrong one.
 */
function copyDate(lang: Lang): string | undefined {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', `src/site/${lang}.ts`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
  } catch {
    return undefined;
  }
}

const copyDates = Object.fromEntries(langs.map((lang) => [lang, copyDate(lang)])) as Record<Lang, string | undefined>;

function entries(id: PageId): string {
  const url = (lang: Lang) => new URL(alternates(id)[lang], site).href;
  const links = [...langs.map((lang) => ({ hreflang: lang, href: url(lang) })), { hreflang: 'x-default', href: url(defaultLang) }]
    .map(({ hreflang, href }) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)
    .join('');
  return langs
    .map((lang) => {
      const date = id === 'legal' ? getSite(lang).legal.updatedAt : copyDates[lang];
      return `<url><loc>${url(lang)}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}${links}</url>`;
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
