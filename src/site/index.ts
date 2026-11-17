import { en } from './en';
import { fr } from './fr';
import type { Lang } from './routes';
import type { Meta, SiteContent } from './types';

const sites: Record<Lang, SiteContent> = { fr, en };

export function getSite(lang: Lang): SiteContent {
  return sites[lang];
}

/** Longest `<title>` search results show in full, give or take a few characters. */
export const maxTitleLength = 65;

/** Longest meta description search results show in full. */
export const maxDescriptionLength = 160;

/**
 * `<title>` of a page: its own title, followed by the site name when both fit in a search
 * result. A long title stands alone rather than being cut; `og:site_name` still names the site.
 */
export function pageTitle(site: SiteContent, meta: Meta): string {
  const full = `${meta.title} | ${site.siteName}`;
  return full.length <= maxTitleLength ? full : meta.title;
}

export * from './routes';
export type * from './types';
