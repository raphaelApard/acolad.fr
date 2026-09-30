import type { APIRoute } from 'astro'

import { getPages } from '../lib/cms'
import { lastModified } from '../lib/lastmod'
import { loadSitePages } from '../lib/pages'
import { buildSitemap } from '../lib/sitemap'

export const GET: APIRoute = async ({ site }) => {
  const [pages, docs] = await Promise.all([loadSitePages(), getPages('fr')])
  const entries = await Promise.all(
    pages.map(async (page) => ({ page, lastmod: await lastModified(docs.find((doc) => doc.id === page.id)!) })),
  )

  return new Response(buildSitemap(entries, site!), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
