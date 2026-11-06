import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { label } from '../fields/helpers'

// git-ignored by default; MEDIA_DIR puts it next to the production database.
const mediaDir =
  process.env.MEDIA_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../media')

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: label('Image', 'Image'), plural: label('Images', 'Images') },
  access: { read: publicRead },
  admin: {
    useAsTitle: 'filename',
    group: label('Library', 'Bibliothèque'),
    description: label(
      'The site build resizes and converts every image: upload the best quality available.',
      'Le build du site redimensionne et convertit chaque image : envoyer la meilleure qualité disponible.',
    ),
  },
  upload: {
    staticDir: mediaDir,
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      label: label('Alternative text', 'Texte alternatif'),
      admin: {
        description: label(
          'Describes the image for screen readers. Logos use the company name instead.',
          'Décrit l’image pour les lecteurs d’écran. Les logos utilisent le nom de l’entreprise.',
        ),
      },
    },
  ],
}
