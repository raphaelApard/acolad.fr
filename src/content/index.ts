import { findSection, type CaseStudy, type Content, type Lang, type Mission } from './types';

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

/** The missions that have a case study, with it. */
export function caseStudies(lang: Lang): (Mission & { caseStudy: CaseStudy })[] {
  const missions = findSection(getContent(lang), 'missions')?.items ?? [];
  return missions.filter((m): m is Mission & { caseStudy: CaseStudy } => Boolean(m.caseStudy));
}

/** A case study by its address, which is the same in every locale. */
export function findCaseStudy(lang: Lang, slug: string): Mission & { caseStudy: CaseStudy } {
  const mission = caseStudies(lang).find((m) => m.caseStudy.slug === slug);
  if (!mission) throw new Error(`No "${slug}" case study in ${lang}`);
  return mission;
}
