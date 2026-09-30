import { getDocs, getGlobal } from './cms'
import { collectionsOf } from './pages'
import type { Page } from './types'

/** The most recent of some ISO timestamps, as YYYY-MM-DD. */
export function latestDate(timestamps: (string | null | undefined)[]): string {
  const latest = timestamps
    .filter((value): value is string => Boolean(value))
    .reduce((max, value) => (value > max ? value : max), '')
  if (!latest) throw new Error('No update date found: cannot compute lastmod.')
  return latest.slice(0, 10)
}

/**
 * Date of the last edit of what a page is made of: the page itself, the site settings and labels, and the
 * collections its sections list. (Renaming another page in the menu does not count.)
 */
export async function lastModified(page: Page): Promise<string> {
  const docs = await Promise.all([
    getGlobal('site', 'fr'),
    getGlobal('labels', 'fr'),
    ...collectionsOf(page).map((slug) => getDocs(slug, 'fr')),
  ])
  return latestDate([page.updatedAt, ...docs.flat().map((doc) => doc.updatedAt)])
}
