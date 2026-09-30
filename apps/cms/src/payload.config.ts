import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
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
import { Logos } from './collections/Logos'
import { Messages } from './collections/Messages'
import { Pages } from './collections/Pages'
import { ProjectImages } from './collections/ProjectImages'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { SkillGroups } from './collections/SkillGroups'
import { Users } from './collections/Users'
import { contactEndpoint } from './endpoints/contact'
import { Labels } from './globals/Labels'
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

// Without SMTP settings Payload only logs outgoing emails to the console (fine for development).
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.CONTACT_FROM ?? 'no-reply@acolad.fr',
      defaultFromName: 'acolad.fr',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Pages,
    Logos,
    ProjectImages,
    Services,
    Projects,
    Clients,
    Jobs,
    SkillGroups,
    Messages,
  ],
  globals: [Site, Labels],
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
  email,
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
