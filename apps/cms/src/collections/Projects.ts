import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, orderField, showOnHomeField, text, textarea } from '../fields/helpers'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: label('Project', 'Projet'),
    plural: label('Projects', 'Projets'),
  },
  access: { read: publicRead },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
    group: label('Content', 'Contenu'),
  },
  fields: [
    text('title', 'Title', 'Titre', { required: true }),
    text('tag', 'Tag', 'Étiquette', { required: true }),
    textarea('shortDesc', 'Short description (home page)', 'Description courte (accueil)', {
      required: true,
    }),
    textarea('longDesc', 'Description (projects page)', 'Description (page projets)', {
      required: true,
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: label('Screenshot', 'Capture d’écran'),
      admin: {
        description: label(
          'The alternative text is set on the media itself.',
          'Le texte alternatif se règle sur le média lui-même.',
        ),
      },
    },
    text('client', 'Client', 'Client'),
    text('result', 'Result', 'Résultat'),
    {
      name: 'stack',
      type: 'text',
      label: label('Stack', 'Stack'),
      admin: {
        description: label('Comma-separated, shown as is.', 'Séparée par des virgules, affichée telle quelle.'),
      },
    },
    {
      name: 'year',
      type: 'text',
      label: label('Year', 'Année'),
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'web',
      label: label('Filter category', 'Catégorie du filtre'),
      options: [
        { label: label('Web', 'Web'), value: 'web' },
        { label: label('AI', 'IA'), value: 'ia' },
      ],
      admin: { position: 'sidebar' },
    },
    orderField,
    showOnHomeField,
  ],
}
