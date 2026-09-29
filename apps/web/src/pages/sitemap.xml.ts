import type { APIRoute } from 'astro'

import { lastModified } from '../lib/lastmod'
import { allRoutes } from '../lib/routes'
import { buildSitemap } from '../lib/sitemap'

export const GET: APIRoute = async ({ site }) => {
  const entries = await Promise.all(
    allRoutes().map(async ({ key, path }) => ({ key, path, lastmod: await lastModified(key) })),
  )

  return new Response(buildSitemap(entries, site!), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
