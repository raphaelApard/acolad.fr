import type { Block } from 'payload'

import { label, text, textarea } from '../fields/helpers'

export const PageHead: Block = {
  slug: 'pageHead',
  labels: { singular: label('Page heading', 'En-tête de page'), plural: label('Page headings', 'En-têtes de page') },
  fields: [
    text('title', 'Title (h1)', 'Titre (h1)', { required: true }),
    textarea('subtitle', 'Introduction', 'Introduction'),
    {
      name: 'wide',
      type: 'checkbox',
      defaultValue: false,
      label: label('Wide introduction', 'Introduction large'),
    },
  ],
}
