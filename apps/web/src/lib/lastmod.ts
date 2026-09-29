import { getDocs, getGlobal, type ContentSlug, type GlobalSlug } from './cms'
import type { PageKey } from './routes'

/** What each page is built from: the page changes when any of these documents does. */
const SOURCES: Record<PageKey, { globals: GlobalSlug[]; collections: ContentSlug[] }> = {
  home: {
    globals: ['home', 'site', 'labels'],
    collections: ['services', 'projects', 'clients', 'jobs', 'skill-groups'],
  },
  services: { globals: ['services-page', 'site', 'labels'], collections: ['services'] },
  work: { globals: ['work-page', 'site', 'labels'], collections: ['projects'] },
  clients: { globals: ['clients-page', 'site', 'labels'], collections: ['clients'] },
  background: {
    globals: ['background-page', 'site', 'labels'],
    collections: ['jobs', 'skill-groups'],
  },
  contact: { globals: ['contact-page', 'site', 'labels'], collections: [] },
}

/** The most recent of some ISO timestamps, as YYYY-MM-DD. */
export function latestDate(timestamps: (string | null | undefined)[]): string {
  const latest = timestamps
    .filter((value): value is string => Boolean(value))
    .reduce((max, value) => (value > max ? value : max), '')
  if (!latest) throw new Error('No update date found: cannot compute lastmod.')
  return latest.slice(0, 10)
}

/** Date of the last edit of the content a page is made of. */
export async function lastModified(key: PageKey): Promise<string> {
  const { globals, collections } = SOURCES[key]
  const docs = await Promise.all([
    ...globals.map((slug) => getGlobal(slug, 'fr')),
    ...collections.map((slug) => getDocs(slug, 'fr')),
  ])
  return latestDate(docs.flat().map((doc) => doc.updatedAt))
}
