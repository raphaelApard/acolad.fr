import type { Block } from 'payload'

import { label, text } from '../fields/helpers'

/** Detailed list of the jobs, with their description. */
export const Experience: Block = {
  slug: 'experience',
  labels: { singular: label('Experience', 'Expérience'), plural: label('Experience', 'Expérience') },
  fields: [text('title', 'Heading', 'Titre', { required: true })],
}
