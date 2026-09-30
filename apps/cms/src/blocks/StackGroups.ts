import type { Block } from 'payload'

import { label, text } from '../fields/helpers'

/** The skills, grouped (front, back, AI…). */
export const StackGroups: Block = {
  slug: 'stackGroups',
  labels: { singular: label('Grouped stack', 'Stack groupée'), plural: label('Grouped stacks', 'Stacks groupées') },
  fields: [text('title', 'Heading', 'Titre', { required: true })],
}
