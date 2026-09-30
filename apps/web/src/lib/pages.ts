import { getPages } from './cms'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './routes'
import type { Page } from './types'

export type PageSection = Page['sections'][number]
export type BlockType = PageSection['blockType']
/** One kind of section, e.g. `Block<'hero'>`. */
export type Block<T extends BlockType> = Extract<PageSection, { blockType: T }>

/** What the rest of the site needs to know about a page, in every language. */
export type SitePage = {
  id: number
  isHome: boolean
  schemaType: 'WebPage' | 'ContactPage'
  showInNav: boolean
  order: number
  /** Id of the home page section that summarises this page (in-page link of the mobile menu). */
  homeAnchor: string | null
  paths: Record<Locale, string>
  navLabel: Record<Locale, string>
}

const prefix = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)

/** URL of a page: `/` and `/en/` for the home page, `/projets/` and `/en/work/` for the others. */
export function pagePath(page: { isHome?: boolean | null; slug?: string | null }, locale: Locale): string {
  if (page.isHome) return `${prefix(locale)}/`
  if (!page.slug) throw new Error(`A page has no ${locale} slug.`)
  return `${prefix(locale)}/${page.slug}/`
}

/**
 * Pairs the French and English versions of every page. Fails loudly on what would produce a broken site:
 * no home page, several home pages, or two pages with the same URL.
 */
export function buildSitePages(byLocale: Record<Locale, Page[]>): SitePage[] {
  const pages = byLocale[DEFAULT_LOCALE].map((page): SitePage => {
    const versions = Object.fromEntries(
      LOCALES.map((locale) => [locale, byLocale[locale].find((other) => other.id === page.id) ?? page]),
    ) as Record<Locale, Page>

    return {
      id: page.id,
      isHome: Boolean(page.isHome),
      schemaType: page.schemaType,
      showInNav: page.showInNav !== false,
      order: page.order,
      homeAnchor: page.homeAnchor || null,
      paths: Object.fromEntries(LOCALES.map((locale) => [locale, pagePath(versions[locale], locale)])) as Record<
        Locale,
        string
      >,
      navLabel: Object.fromEntries(LOCALES.map((locale) => [locale, versions[locale].navLabel])) as Record<
        Locale,
        string
      >,
    }
  })

  const homes = pages.filter((page) => page.isHome)
  if (homes.length !== 1) throw new Error(`Exactly one page must be the home page, found ${homes.length}.`)

  const seen = new Map<string, number>()
  for (const page of pages) {
    for (const path of Object.values(page.paths)) {
      if (seen.has(path)) throw new Error(`Pages ${seen.get(path)} and ${page.id} share the URL ${path}.`)
      seen.set(path, page.id)
    }
  }

  return pages.sort((a, b) => a.order - b.order)
}

/** Every page of the site, both languages, read from the CMS. */
export async function loadSitePages(): Promise<SitePage[]> {
  const versions = await Promise.all(LOCALES.map((locale) => getPages(locale)))
  return buildSitePages(Object.fromEntries(LOCALES.map((locale, i) => [locale, versions[i]])) as Record<Locale, Page[]>)
}

export const homeOf = (pages: SitePage[]) => pages.find((page) => page.isHome)!

/** Pages listed in the main menu, in order. */
export const navPagesOf = (pages: SitePage[]) => pages.filter((page) => page.showInNav && !page.isHome)

/** hreflang alternates of a page; x-default is the French version. */
export const alternatesOf = (page: SitePage) => [
  ...LOCALES.map((locale) => ({ hreflang: locale as string, path: page.paths[locale] })),
  { hreflang: 'x-default', path: page.paths[DEFAULT_LOCALE] },
]

/** A relationship field holds an id, or the document when it was populated. */
export const relationId = (value: number | { id: number } | null | undefined) =>
  value && typeof value === 'object' ? value.id : (value ?? null)

/** Path of the page a relationship field points to. */
export function pathOfRelation(
  pages: SitePage[],
  value: number | { id: number } | null | undefined,
  locale: Locale,
): string {
  const id = relationId(value)
  const page = pages.find((candidate) => candidate.id === id)
  if (!page) throw new Error(`A section links to page ${id}, which does not exist.`)
  return page.paths[locale]
}

/** The collections whose content a page displays: it changes when they do. */
export function collectionsOf(page: Page): ('services' | 'projects' | 'clients' | 'jobs' | 'skill-groups')[] {
  const used = new Set<'services' | 'projects' | 'clients' | 'jobs' | 'skill-groups'>()
  for (const section of page.sections) {
    if (section.blockType === 'services') used.add('services')
    if (section.blockType === 'projects') used.add('projects')
    if (section.blockType === 'clients') used.add('clients')
    if (section.blockType === 'backgroundSummary') ['jobs', 'skill-groups'].forEach((c) => used.add(c as 'jobs'))
    if (section.blockType === 'experience') used.add('jobs')
    if (section.blockType === 'stackGroups') used.add('skill-groups')
  }
  return [...used]
}
