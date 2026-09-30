import type { Block } from 'payload'

import { label, text } from '../fields/helpers'

/** Contact block at the bottom of a page; its button texts come from the interface labels. */
export const ClosingCta: Block = {
  slug: 'closingCta',
  labels: { singular: label('Closing call to action', 'Appel à l’action final'), plural: label('Closing calls to action', 'Appels à l’action finaux') },
  fields: [
    text('title', 'Title', 'Titre', { required: true }),
    {
      name: 'target',
      type: 'select',
      required: true,
      defaultValue: 'page',
      label: label('Button leads to', 'Le bouton mène vers'),
      options: [
        { label: label('A page of the site', 'Une page du site'), value: 'page' },
        { label: label('An email (mailto:)', 'Un e-mail (mailto:)'), value: 'mailto' },
      ],
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      label: label('Page', 'Page'),
      admin: {
        condition: (_data: unknown, siblingData: { target?: string }) => siblingData?.target === 'page',
      },
    },
  ],
}
