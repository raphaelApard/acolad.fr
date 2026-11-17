import { en } from './en';
import { fr } from './fr';
import type { Lang } from './routes';
import type { Meta, SiteContent } from './types';

const sites: Record<Lang, SiteContent> = { fr, en };

export function getSite(lang: Lang): SiteContent {
  return sites[lang];
}

/** `<title>` of a page: its own title followed by the site name. */
export function pageTitle(site: SiteContent, meta: Meta): string {
  return `${meta.title} | ${site.siteName}`;
}

export * from './routes';
export type * from './types';
