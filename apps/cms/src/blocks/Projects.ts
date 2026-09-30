import type { Block } from 'payload'

import { label } from '../fields/helpers'
import { summaryFields, variantField } from './fields'

export const Projects: Block = {
  slug: 'projects',
  labels: { singular: label('Projects', 'Projets'), plural: label('Projects', 'Projets') },
  fields: [
    variantField(
      [
        { value: 'summary', en: 'Cards (home page)', fr: 'Cartes (accueil)' },
        { value: 'cases', en: 'Case studies with filter', fr: 'Études de cas avec filtre' },
      ],
      'cases',
    ),
    ...summaryFields(),
  ],
}
