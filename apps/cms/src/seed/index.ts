import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'

import config from '../payload.config'
import { clients } from './data/clients'
import { jobs } from './data/jobs'
import { labels } from './data/labels'
import { projects } from './data/projects'
import { services } from './data/services'
import { sitePages } from './data/site-pages'
import { site } from './data/site'
import { skillGroups } from './data/skill-groups'
import type { SeedDoc } from './types'
import { merge, withRowIds } from './utils'

/**
 * Fills the CMS with the content of the legacy site (French and English).
 *
 *   pnpm seed                 seeds an empty CMS, refuses to touch one that already has content
 *   pnpm seed -- --reset      wipes pages, services, projects, clients, jobs, skill groups and media first
 *
 * With SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD set, it also creates the first admin user if there is none.
 * Messages and users are never deleted.
 */
const mediaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'media')
const reset = process.argv.includes('--reset') || process.env.SEED_RESET === '1'

const RESET_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'services',
  'projects',
  'clients',
  'jobs',
  'skill-groups',
  'media',
]

const payload = await getPayload({ config })
const log = (message: string) => payload.logger.info(`[seed] ${message}`)

/** Writes a document in French, then adds the English text on top of the same rows. */
async function seedDoc(collection: CollectionSlug, doc: SeedDoc) {
  const created = await payload.create({
    collection,
    locale: 'fr',
    data: merge(doc.shared, doc.fr) as never,
  })
  await payload.update({
    collection,
    id: created.id,
    locale: 'en',
    data: withRowIds(created, merge(doc.shared, doc.en)) as never,
  })
  return created
}

async function seedGlobal(slug: GlobalSlug, doc: SeedDoc) {
  const saved = await payload.updateGlobal({
    slug,
    locale: 'fr',
    data: merge(doc.shared, doc.fr) as never,
  })
  await payload.updateGlobal({
    slug,
    locale: 'en',
    data: withRowIds(saved, merge(doc.shared, doc.en)) as never,
  })
}

async function uploadMedia(folder: 'projects' | 'clients', file: string, alt: { fr: string; en: string }) {
  const media = await payload.create({
    collection: 'media',
    locale: 'fr',
    data: { alt: alt.fr },
    filePath: path.join(mediaDir, folder, file),
  })
  await payload.update({ collection: 'media', id: media.id, locale: 'en', data: { alt: alt.en } })
  return media.id
}

const already = await payload.count({ collection: 'services' })
if (already.totalDocs > 0 && !reset) {
  log('The CMS already has content. Use `pnpm seed -- --reset` to replace it.')
  process.exit(0)
}

if (reset) {
  for (const collection of RESET_COLLECTIONS) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }
  log('Existing content removed.')
}

await seedGlobal('site', site)
await seedGlobal('labels', labels)
log('Globals written.')

for (const service of services) await seedDoc('services', service)
for (const skillGroup of skillGroups) await seedDoc('skill-groups', skillGroup)
for (const job of jobs) await seedDoc('jobs', job)

for (const project of projects) {
  const { imageFile, imageWidth: _w, imageHeight: _h, ...shared } = project.shared
  const { imageAlt: altFr, ...fr } = project.fr
  const { imageAlt: altEn, ...en } = project.en
  const image = await uploadMedia('projects', imageFile as string, {
    fr: altFr as string,
    en: altEn as string,
  })
  await seedDoc('projects', { shared: { ...shared, image }, fr, en })
}

for (const client of clients) {
  const { logoFile, logoWidth: _w, logoHeight: _h, ...shared } = client.shared
  const name = shared.name as string
  const logo = await uploadMedia('clients', logoFile as string, { fr: name, en: name })
  await seedDoc('clients', { shared: { ...shared, logo }, fr: client.fr, en: client.en })
}
// Pages come last: their sections refer to the pages created before them (see data/site-pages.ts).
const pageIds = new Map<string, number | string>()
const resolvePageRefs = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(resolvePageRefs)
  if (value && typeof value === 'object') {
    const object = value as Record<string, unknown>
    if (typeof object.$page === 'string') {
      const id = pageIds.get(object.$page)
      if (id === undefined) throw new Error(`Page "${object.$page}" is referenced before it is created.`)
      return id
    }
    return Object.fromEntries(Object.entries(object).map(([key, item]) => [key, resolvePageRefs(item)]))
  }
  return value
}
for (const { key, ...page } of sitePages) {
  const created = await seedDoc('pages', resolvePageRefs(page) as SeedDoc)
  pageIds.set(key, created.id)
}

log(
  `Collections written: ${sitePages.length} pages, ${services.length} services, ${projects.length} projects, ${clients.length} clients, ` +
    `${jobs.length} jobs, ${skillGroups.length} skill groups.`,
)

const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password } = process.env
if (email && password) {
  const users = await payload.count({ collection: 'users' })
  if (users.totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email, password } })
    log(`Admin user ${email} created.`)
  }
}

process.exit(0)
