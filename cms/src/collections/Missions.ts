import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { chips, displayName, image, label, lines, period, place, text, textarea, listTitle } from '../fields/helpers'

export const Missions: CollectionConfig = {
  slug: 'missions',
  labels: { singular: label('Mission', 'Mission'), plural: label('Missions', 'Missions') },
  access: { read: publicRead },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'period', 'role'],
    group: label('Résumé', 'CV'),
    description: label(
      'Freelance missions. The “Missions” section of the home page picks which ones are shown, and their order.',
      'Missions freelance. La section « Missions » de l’accueil choisit lesquelles sont affichées, et leur ordre.',
    ),
  },
  versions: { maxPerDoc: 20 },
  fields: [
    listTitle,
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'relationship', relationTo: 'companies', required: true, label: label('Client', 'Client') },
        displayName,
      ],
    },
    { type: 'row', fields: [period, place] },
    text('role', 'Role', 'Rôle', { required: true }),
    textarea('hook', 'Summary', 'Résumé', { required: true }),
    lines('achievements', 'Achievements', 'Réalisations'),
    chips('stack', 'Tech stack', 'Stack technique', { localized: false }),
    image('image', 'Screenshot', 'Capture d’écran'),
  ],
}
