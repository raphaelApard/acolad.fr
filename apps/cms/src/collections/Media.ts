import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', fr: 'Média' },
    plural: { en: 'Media', fr: 'Médias' },
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    // git-ignored folder next to the database; the site build downloads images from the API.
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      label: { en: 'Alternative text', fr: 'Texte alternatif' },
      admin: {
        description: {
          en: 'Describes the image for screen readers. Leave empty for decorative images.',
          fr: 'Décrit l’image pour les lecteurs d’écran. Laisser vide pour une image décorative.',
        },
      },
    },
  ],
}
