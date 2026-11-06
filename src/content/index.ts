import type { Content, Lang } from './types';

// Written by `pnpm content:pull` (from the CMS) or `pnpm content:fixture` (test data), git-ignored.
const files = import.meta.glob<Content>('./data/*.json', { eager: true, import: 'default' });

export const langs: Lang[] = ['fr', 'en'];

// Must match `i18n.defaultLocale` in astro.config.mjs.
export const defaultLang: Lang = 'fr';

export function getContent(lang: Lang): Content {
  const content = files[`./data/${lang}.json`];
  if (!content) {
    throw new Error(
      `src/content/data/${lang}.json is missing: run \`pnpm content:pull\` (from the CMS) or \`pnpm content:fixture\` (test data).`,
    );
  }
  return content;
}
