// Every page of the site and its address in each locale. French lives at the root, English
// under /en/ (see `i18n` in astro.config.mjs). Paths have no leading or trailing slash here.
export type Lang = 'fr' | 'en';

export const langs: Lang[] = ['fr', 'en'];

// Must match `i18n.defaultLocale` in astro.config.mjs.
export const defaultLang: Lang = 'fr';

export const serviceIds = ['audit', 'apps', 'ai', 'tma', 'drupal', 'hosting'] as const;
export type ServiceId = (typeof serviceIds)[number];

export type PageId = 'home' | ServiceId | 'work' | 'caseStudy' | 'about' | 'contact' | 'legal';

const paths: Record<PageId, Record<Lang, string>> = {
  home: { fr: '', en: '' },
  apps: { fr: 'applications-metier', en: 'business-applications' },
  tma: { fr: 'tma', en: 'application-maintenance' },
  drupal: { fr: 'maintenance-drupal', en: 'drupal-maintenance' },
  hosting: { fr: 'hebergement', en: 'hosting' },
  audit: { fr: 'audit-conseil', en: 'audit-consulting' },
  ai: { fr: 'integration-ia', en: 'ai-integration' },
  work: { fr: 'realisations', en: 'work' },
  // Same address as the case study of the former one-page site.
  caseStudy: { fr: 'missions/ovhcloud', en: 'missions/ovhcloud' },
  about: { fr: 'a-propos', en: 'about' },
  contact: { fr: 'contact', en: 'contact' },
  // Same addresses as the former legal pages.
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
};

export const pageIds = Object.keys(paths) as PageId[];

export function isServiceId(id: PageId): id is ServiceId {
  return (serviceIds as readonly string[]).includes(id);
}

/** The page path as Astro's rest parameter expects it; `undefined` for the French home page. */
export function routeParam(id: PageId, lang: Lang): string | undefined {
  const path = [lang === defaultLang ? '' : lang, paths[id][lang]].filter(Boolean).join('/');
  return path || undefined;
}

/** Root-relative URL of a page, with its trailing slash. */
export function href(id: PageId, lang: Lang): string {
  const param = routeParam(id, lang);
  return param ? `/${param}/` : '/';
}

/**
 * Preview image of every page of a locale when it is shared (Open Graph, structured data).
 * The files are in public/, drawn by scripts/og-image.ts; their address never changes, so
 * previews already cached by social networks stay valid.
 */
export const shareImage = { width: 1200, height: 630 };

export function shareImagePath(lang: Lang): string {
  return `/og-${lang}.png`;
}

/** The same page in every locale, for hreflang links, the sitemap and the language switch. */
export function alternates(id: PageId): Record<Lang, string> {
  return Object.fromEntries(langs.map((lang) => [lang, href(id, lang)])) as Record<Lang, string>;
}
