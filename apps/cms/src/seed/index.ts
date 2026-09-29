import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'

import config from '../payload.config'
import { clients } from './data/clients'
import { jobs } from './data/jobs'
import { labels } from './data/labels'
import {
  backgroundPage,
  clientsPage,
  contactPage,
  home,
  servicesPage,
  workPage,
} from './data/pages'
import { projects } from './data/projects'
import { services } from './data/services'
import { site } from './data/site'
import { skillGroups } from './data/skill-groups'
import type { SeedDoc } from './types'
import { merge, withRowIds } from './utils'

/**
 * Fills the CMS with the content of the legacy site (French and English).
 *
 *   pnpm seed                 seeds an empty CMS, refuses to touch one that already has content
 *   pnpm seed -- --reset      wipes services, projects, clients, jobs, skill groups and media first
 *
 * With SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD set, it also creates the first admin user if there is none.
 * Messages and users are never deleted.
 */
const mediaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'media')
const reset = process.argv.includes('--reset') || process.env.SEED_RESET === '1'

const RESET_COLLECTIONS: CollectionSlug[] = [
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
for (const [slug, page] of [
  ['home', home],
  ['services-page', servicesPage],
  ['work-page', workPage],
  ['clients-page', clientsPage],
  ['background-page', backgroundPage],
  ['contact-page', contactPage],
] as const) {
  await seedGlobal(slug, page)
}
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
log(
  `Collections written: ${services.length} services, ${projects.length} projects, ${clients.length} clients, ` +
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
