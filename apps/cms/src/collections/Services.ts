import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { chips, label, orderField, text, textarea } from '../fields/helpers'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: label('Service', 'Service'),
    plural: label('Services', 'Services'),
  },
  access: { read: publicRead },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'anchor', 'order'],
    group: label('Content', 'Contenu'),
  },
  fields: [
    text('title', 'Title', 'Titre', { required: true }),
    textarea('shortDesc', 'Short description (home page)', 'Description courte (accueil)', {
      required: true,
    }),
    textarea('longDesc', 'Description (services page)', 'Description (page services)', {
      required: true,
    }),
    {
      name: 'deliverables',
      type: 'array',
      label: label('Deliverables', 'Livrables'),
      fields: [text('text', 'Deliverable', 'Livrable', { required: true })],
    },
    chips('stack', 'Stack', 'Stack'),
    {
      name: 'anchor',
      type: 'select',
      required: true,
      unique: true,
      label: label('Anchor', 'Ancre'),
      options: ['web', 'agents', 'rag', 'audit'],
      admin: {
        position: 'sidebar',
        description: label('Id of the block on the services page.', 'Identifiant du bloc sur la page services.'),
      },
    },
    orderField,
  ],
}
