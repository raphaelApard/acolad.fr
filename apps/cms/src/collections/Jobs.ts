import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, orderField, showOnHomeField, text, textarea } from '../fields/helpers'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: label('Job', 'Expérience'),
    plural: label('Jobs', 'Expériences'),
  },
  access: { read: publicRead },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'years', 'order'],
    group: label('Content', 'Contenu'),
  },
  fields: [
    text('years', 'Years', 'Années', {
      required: true,
      admin: { description: label('Shown as is, e.g. “2014 — now”.', 'Affichées telles quelles, ex. « 2014 — auj. ».') },
    }),
    text('role', 'Role', 'Poste', { required: true }),
    text('org', 'Organisation', 'Organisation', { required: true }),
    textarea('description', 'Description (background page)', 'Description (page parcours)', {
      required: true,
    }),
    orderField,
    showOnHomeField,
  ],
}
