import type { Locale } from './routes'
import type { PageSection, SitePage } from './pages'
import type { Labels, Site } from './types'

/** What a section needs to render itself: the language, shared content and the site's pages. */
export type PageContext = {
  locale: Locale
  site: Site
  labels: Labels
  /** Every page of the site (links, menu). */
  pages: SitePage[]
  /** The page being rendered. */
  current: SitePage
  /** Its sections, in order: a section may adapt to its neighbours. */
  sections: PageSection[]
}

/** Id of the heading that labels a section for screen readers. */
export const headingId = (block: { blockType: string; anchor?: string | null }, index: number) =>
  block.anchor ? `${block.anchor}-title` : `${block.blockType}-${index}-title`
