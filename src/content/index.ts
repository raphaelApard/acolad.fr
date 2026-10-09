import type { Content, Lang } from './types';
import frJson from './fr.json';
import enJson from './en.json';

// Typed assignments make the build fail when a content file drifts from `Content`.
const fr: Content = { ...frJson, meta: { ...frJson.meta, lang: 'fr' } };
const en: Content = { ...enJson, meta: { ...enJson.meta, lang: 'en' } };

const contents: Record<Lang, Content> = { fr, en };

export const langs = Object.keys(contents) as Lang[];

// Must match `i18n.defaultLocale` in astro.config.mjs.
export const defaultLang: Lang = 'fr';

export function getContent(lang: Lang): Content {
  return contents[lang];
}
