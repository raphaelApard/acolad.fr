import type { Config, Media } from '@cms-types'

import type { Locale } from './routes'

export type GlobalSlug = keyof Config['globals']
export type ContentSlug = 'services' | 'projects' | 'clients' | 'jobs' | 'skill-groups'

const cache = new Map<string, Promise<unknown>>()

/** Base URL of the CMS, without a trailing slash. */
export const cmsUrl = () =>
  (process.env.PAYLOAD_URL ?? import.meta.env.PAYLOAD_URL ?? 'http://localhost:3000').replace(/\/+$/, '')

/** Forgets what was fetched (tests). */
export const clearCache = () => cache.clear()

async function fetchJson<T>(pathname: string, params: Record<string, string | number>): Promise<T> {
  const url = `${cmsUrl()}${pathname}?${new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  )}`

  let request = cache.get(url) as Promise<T> | undefined
  if (!request) {
    request = (async () => {
      let response: Response
      try {
        response = await fetch(url)
      } catch (cause) {
        throw new Error(
          `Could not reach the CMS at ${cmsUrl()}. Start it with "pnpm dev:cms" or set PAYLOAD_URL.`,
          { cause },
        )
      }
      if (!response.ok) throw new Error(`The CMS answered ${response.status} for ${url}`)
      return (await response.json()) as T
    })()
    cache.set(url, request)
    // Do not remember failures: a later call may succeed.
    request.catch(() => cache.delete(url))
  }
  return request
}

/** A global (site settings, labels, page content) in one language. */
export function getGlobal<K extends GlobalSlug>(slug: K, locale: Locale): Promise<Config['globals'][K]> {
  return fetchJson(`/api/globals/${slug}`, { locale, depth: 0 })
}

/** The pages of the site in one language. Relationships stay ids: pages are resolved through the page list. */
export async function getPages(locale: Locale): Promise<Config['collections']['pages'][]> {
  const { docs } = await fetchJson<{ docs: Config['collections']['pages'][] }>('/api/pages', {
    locale,
    limit: 0,
    sort: 'order',
    depth: 0,
  })
  return docs
}

/** Every document of a collection in one language, sorted by their `order` field. */
export async function getDocs<K extends ContentSlug>(
  slug: K,
  locale: Locale,
  depth = 0,
): Promise<Config['collections'][K][]> {
  const { docs } = await fetchJson<{ docs: Config['collections'][K][] }>(`/api/${slug}`, {
    locale,
    limit: 0,
    sort: 'order',
    depth,
  })
  return docs
}

/** An upload field only holds an id unless the query populated it (`depth >= 1`). */
export function resolveMedia(value: number | Media): Media {
  if (typeof value !== 'object') throw new Error(`Media ${value} was not populated: query with depth 1.`)
  return value
}

/** Absolute URL of an uploaded file. */
export const mediaUrl = (media: Media) => `${cmsUrl()}${media.url}`
