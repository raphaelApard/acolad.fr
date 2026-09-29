import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import fs from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Clients } from './collections/Clients'
import { Jobs } from './collections/Jobs'
import { Media } from './collections/Media'
import { Messages } from './collections/Messages'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { SkillGroups } from './collections/SkillGroups'
import { Users } from './collections/Users'
import { contactEndpoint } from './endpoints/contact'
import { Labels } from './globals/Labels'
import { BackgroundPage } from './globals/pages/BackgroundPage'
import { ClientsPage } from './globals/pages/ClientsPage'
import { ContactPage } from './globals/pages/ContactPage'
import { Home } from './globals/pages/Home'
import { ServicesPage } from './globals/pages/ServicesPage'
import { WorkPage } from './globals/pages/WorkPage'
import { Site } from './globals/Site'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const cmsRoot = path.resolve(dirname, '..')

// The SQLite file lives in a git-ignored folder that has to exist.
fs.mkdirSync(path.join(cmsRoot, 'data'), { recursive: true })

// Origins of the public site (comma-separated) that may call the API from a browser.
const siteOrigins = (process.env.SITE_URL ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const cmsOrigin = process.env.CMS_URL ?? 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Projects, Clients, Jobs, SkillGroups, Messages],
  globals: [
    Site,
    Labels,
    Home,
    ServicesPage,
    WorkPage,
    ClientsPage,
    BackgroundPage,
    ContactPage,
  ],
  editor: lexicalEditor(),
  // The site is bilingual: French is the default (unprefixed) language.
  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en, fr },
  },
  secret: process.env.PAYLOAD_SECRET || '',
  cors: siteOrigins,
  csrf: [cmsOrigin, ...siteOrigins],
  endpoints: [contactEndpoint],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./data/cms.db',
    },
  }),
  sharp,
})
