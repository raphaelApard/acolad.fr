import type { CollectionConfig, PayloadRequest } from 'payload'

import { publicRead } from '../access/public'
import { blocks } from '../blocks'
import { label, orderField, seoField, text } from '../fields/helpers'

/** Segments the site already uses for something else. */
export const RESERVED_SLUGS = ['en', 'assets', '_astro', 'api', 'admin', '404']
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Validation messages follow the language of the admin panel. */
const say = (req: PayloadRequest, en: string, fr: string) => (req.i18n?.language === 'fr' ? fr : en)

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: label('Page', 'Page'),
    plural: label('Pages', 'Pages'),
  },
  access: { read: publicRead },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'navLabel',
    defaultColumns: ['navLabel', 'slug', 'showInNav', 'order'],
    group: label('Site', 'Site'),
  },
  hooks: {
    // The home page owns "/" and "/en/": without it the site has no entry point.
    beforeDelete: [
      async ({ id, req }) => {
        const page = await req.payload.findByID({ collection: 'pages', id, depth: 0, req })
        if (page.isHome) {
          throw new Error(say(req, 'The home page cannot be deleted.', 'La page d’accueil ne peut pas être supprimée.'))
        }
      },
    ],
  },
  fields: [
    text('navLabel', 'Name', 'Nom', {
      required: true,
      admin: {
        description: label(
          'Menu label and breadcrumb name. Also how the page is called in the admin.',
          'Libellé du menu et nom dans le fil d’Ariane. C’est aussi le nom de la page dans l’admin.',
        ),
      },
    }),
    text('slug', 'URL slug', 'Fragment d’URL', {
      admin: {
        description: label(
          'Last part of the URL, per language: “work” gives /en/work/. Changing it breaks links and search results that point to the old URL.',
          'Dernière partie de l’URL, par langue : « work » donne /en/work/. La modifier casse les liens et résultats de recherche qui pointent vers l’ancienne URL.',
        ),
        condition: (data) => !data?.isHome,
      },
      validate: async (value: string | null | undefined, { data, id, req }: { data: { isHome?: boolean }; id?: number | string; req: PayloadRequest }) => {
        if (data?.isHome) return true
        if (!value) return say(req, 'The URL slug is required.', 'Le fragment d’URL est obligatoire.')
        if (!SLUG_PATTERN.test(value)) {
          return say(
            req,
            'Use lowercase letters, digits and single hyphens only.',
            'Uniquement des minuscules, des chiffres et des tirets simples.',
          )
        }
        if (RESERVED_SLUGS.includes(value)) {
          return say(req, `“${value}” is reserved by the site.`, `« ${value} » est réservé par le site.`)
        }
        const same = await req.payload.find({
          collection: 'pages',
          where: { and: [{ slug: { equals: value } }, ...(id ? [{ id: { not_equals: id } }] : [])] },
          locale: (req.locale ?? undefined) as 'fr' | 'en' | undefined,
          limit: 1,
          depth: 0,
          req,
        })
        return same.docs.length
          ? say(req, 'Another page already uses this slug.', 'Une autre page utilise déjà ce fragment d’URL.')
          : true
      },
    }),
    seoField,
    {
      name: 'sections',
      type: 'blocks',
      required: true,
      minRows: 1,
      label: label('Sections', 'Sections'),
      admin: {
        description: label(
          'The page is made of these sections, from top to bottom. The same sections appear in both languages.',
          'La page est composée de ces sections, de haut en bas. Les mêmes sections apparaissent dans les deux langues.',
        ),
      },
      blocks,
    },
    {
      name: 'isHome',
      type: 'checkbox',
      defaultValue: false,
      label: label('Home page', 'Page d’accueil'),
      admin: {
        position: 'sidebar',
        description: label('Served at / and /en/. Only one page can be the home page.', 'Servie sur / et /en/. Une seule page peut être l’accueil.'),
      },
      validate: async (value: boolean | null | undefined, { id, req }: { id?: number | string; req: PayloadRequest }) => {
        if (!value) return true
        const others = await req.payload.find({
          collection: 'pages',
          where: { and: [{ isHome: { equals: true } }, ...(id ? [{ id: { not_equals: id } }] : [])] },
          limit: 1,
          depth: 0,
          req,
        })
        return others.docs.length
          ? say(req, 'Another page is already the home page.', 'Une autre page est déjà la page d’accueil.')
          : true
      },
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: true,
      label: label('Show in the menu', 'Afficher dans le menu'),
      admin: { position: 'sidebar' },
    },
    orderField,
    {
      name: 'homeAnchor',
      type: 'text',
      label: label('Home page anchor', 'Ancre sur l’accueil'),
      admin: {
        position: 'sidebar',
        description: label(
          'Id of the section of the home page that summarises this page. The mobile menu of the home page scrolls there instead of opening the page.',
          'Identifiant de la section de l’accueil qui résume cette page. Sur l’accueil, le menu mobile y fait défiler la page au lieu d’ouvrir la page.',
        ),
      },
    },
    {
      name: 'schemaType',
      type: 'select',
      required: true,
      defaultValue: 'WebPage',
      label: label('Structured data type', 'Type de données structurées'),
      options: [
        { label: label('Web page', 'Page web'), value: 'WebPage' },
        { label: label('Contact page', 'Page de contact'), value: 'ContactPage' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
