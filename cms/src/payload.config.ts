import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import fs from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Companies } from './collections/Companies'
import { Experiences } from './collections/Experiences'
import { Media } from './collections/Media'
import { Missions } from './collections/Missions'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { publishEndpoints } from './deploy/endpoints'
import { Home } from './globals/Home'
import { Legal } from './globals/Legal'
import { NotFound } from './globals/NotFound'
import { Site } from './globals/Site'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const cmsRoot = path.resolve(dirname, '..')

// The default SQLite file lives in a git-ignored folder that has to exist.
fs.mkdirSync(path.join(cmsRoot, 'data'), { recursive: true })

const cmsOrigin = process.env.CMS_URL ?? 'http://localhost:3000'

// Without SMTP settings Payload only logs outgoing e-mails (fine for development).
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.MAIL_FROM ?? 'no-reply@acolad.fr',
      defaultFromName: 'acolad.fr',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  serverURL: cmsOrigin,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      beforeDashboard: ['/deploy/PublishPanel#PublishPanel'],
    },
    meta: { titleSuffix: ' – acolad.fr' },
  },
  collections: [Missions, Experiences, Projects, Companies, Media, Users],
  globals: [Home, Site, Legal, NotFound],
  // The site is bilingual; French is the default language (served at /).
  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { fr, en },
    fallbackLanguage: 'fr',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  csrf: [cmsOrigin],
  email,
  endpoints: publishEndpoints,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    // The site imports these types without having the payload package installed.
    declare: false,
  },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./data/cms.db' },
  }),
  sharp,
})
