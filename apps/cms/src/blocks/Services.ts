import type { Block } from 'payload'

import { label } from '../fields/helpers'
import { summaryFields, variantField } from './fields'

export const Services: Block = {
  slug: 'services',
  labels: { singular: label('Services', 'Services'), plural: label('Services', 'Services') },
  fields: [
    variantField(
      [
        { value: 'summary', en: 'Summary (home page)', fr: 'Résumé (accueil)' },
        { value: 'detailed', en: 'Detailed offers', fr: 'Offres détaillées' },
      ],
      'detailed',
    ),
    ...summaryFields(),
  ],
}
