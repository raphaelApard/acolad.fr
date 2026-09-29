import type { PageKey } from '../lib/routes'
import HomeView from './HomeView.astro'

/** One view per page: it loads its own content and renders it in the requested language. */
export const VIEWS: Partial<Record<PageKey, typeof HomeView>> = {
  home: HomeView,
}
