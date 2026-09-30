import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'

// git-ignored folder next to the database; the site build downloads images from the API.
const mediaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../media')

/** An image library that keeps its files in its own folder, `media/<slug>/`. */
export const imageCollection = (
  slug: string,
  labels: NonNullable<CollectionConfig['labels']>,
): CollectionConfig => ({
  slug,
  labels,
  access: { read: publicRead },
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    staticDir: path.join(mediaDir, slug),
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
})
