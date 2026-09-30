import type { Block } from 'payload'

import { label, text, textarea } from '../fields/helpers'

/** A list of short points: process steps (numbered) or working principles. */
export const Points: Block = {
  slug: 'points',
  labels: { singular: label('Points', 'Points'), plural: label('Points', 'Points') },
  fields: [
    text('title', 'Heading', 'Titre', { required: true }),
    {
      name: 'numbered',
      type: 'checkbox',
      defaultValue: false,
      label: label('Numbered', 'Numérotés'),
    },
    {
      name: 'wide',
      type: 'checkbox',
      defaultValue: false,
      label: label('Wide layout', 'Mise en page large'),
    },
    {
      name: 'items',
      type: 'array',
      label: label('Points', 'Points'),
      fields: [
        text('title', 'Title', 'Titre', { required: true }),
        textarea('description', 'Description', 'Description', { required: true }),
      ],
    },
  ],
}
