import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, orderField, showOnHomeField, text } from '../fields/helpers'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: label('Client', 'Client'),
    plural: label('Clients', 'Clients'),
  },
  access: { read: publicRead },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'order'],
    group: label('Content', 'Contenu'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: label('Name', 'Nom'),
      admin: { description: label('Not translated.', 'Non traduit.') },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'logos',
      required: true,
      label: label('Logo', 'Logo'),
    },
    {
      name: 'logoSize',
      type: 'select',
      required: true,
      defaultValue: 'default',
      label: label('Logo size', 'Taille du logo'),
      options: [
        { label: label('Default', 'Par défaut'), value: 'default' },
        { label: label('Medium', 'Moyenne'), value: 'mid' },
        { label: label('Small', 'Petite'), value: 'small' },
      ],
      admin: {
        position: 'sidebar',
        description: label(
          'Square or compact logos look too big at the default size.',
          'Les logos carrés ou compacts paraissent trop grands à la taille par défaut.',
        ),
      },
    },
    text('sector', 'Sector', 'Secteur', { required: true }),
    text('work', 'Work done', 'Réalisation', { required: true }),
    orderField,
    showOnHomeField,
  ],
}
