import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { image, label, text } from '../fields/helpers'

/** Clients and employers: their name and logo, shared by the logo band, missions and experience. */
export const Companies: CollectionConfig = {
  slug: 'companies',
  labels: { singular: label('Company', 'Entreprise'), plural: label('Companies', 'Entreprises') },
  access: { read: publicRead },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'logo', 'logoHeight'],
    group: label('Library', 'Bibliothèque'),
  },
  versions: { maxPerDoc: 20 },
  fields: [
    text('name', 'Name', 'Nom', { required: true }),
    image('logo', 'Logo', 'Logo', {
      admin: {
        description: label(
          'Opaque background (no transparency): the logo sits on a white tile.',
          'Fond opaque (pas de transparence) : le logo est posé sur une tuile blanche.',
        ),
      },
    }),
    {
      name: 'logoHeight',
      type: 'number',
      min: 16,
      max: 120,
      defaultValue: 48,
      label: label('Logo height in the band (px)', 'Hauteur du logo dans le bandeau (px)'),
      admin: {
        description: label(
          'Desktop height, tuned per logo to balance their visual weight (mobile uses ×0.77).',
          'Hauteur sur desktop, ajustée par logo pour équilibrer leur poids visuel (×0,77 sur mobile).',
        ),
      },
    },
  ],
}
