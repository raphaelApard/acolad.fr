import type { Block } from 'payload'

import { label } from '../fields/helpers'
import { sectionFields } from './fields'

/** Home page block: the jobs timeline next to the flat list of skills. */
export const BackgroundSummary: Block = {
  slug: 'backgroundSummary',
  labels: {
    singular: label('Background summary', 'Résumé du parcours'),
    plural: label('Background summaries', 'Résumés du parcours'),
  },
  fields: sectionFields(),
}
