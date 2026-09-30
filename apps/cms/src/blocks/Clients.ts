import type { Block } from 'payload'

import { label, text } from '../fields/helpers'
import { summaryFields, variantField, whenSummary } from './fields'

export const Clients: Block = {
  slug: 'clients',
  labels: { singular: label('Clients', 'Clients'), plural: label('Clients', 'Clients') },
  fields: [
    variantField(
      [
        { value: 'summary', en: 'Logos (home page)', fr: 'Logos (accueil)' },
        { value: 'cards', en: 'Detailed cards', fr: 'Fiches détaillées' },
      ],
      'cards',
    ),
    ...summaryFields(),
    whenSummary(text('heading', 'Sub-heading', 'Sous-titre', { required: true })),
    {
      ...text('countLabel', 'Client count wording', 'Formulation du nombre de clients', {
        admin: {
          description: label(
            'Use {count} where the number of clients goes.',
            'Utiliser {count} à l’endroit du nombre de clients.',
          ),
          condition: (_data: unknown, siblingData: { variant?: string }) => siblingData?.variant === 'cards',
        },
      }),
    },
  ],
}
