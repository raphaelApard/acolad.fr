import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { displayName, image, label, place, textarea, listTitle } from '../fields/helpers'

/** Shorter entries shown under the missions ("Other projects"). */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: label('Other project', 'Autre projet'), plural: label('Other projects', 'Autres projets') },
  access: { read: publicRead },
  admin: {
    useAsTitle: 'title',
    group: label('Résumé', 'CV'),
    description: label(
      'Picked by the “Missions” section, under the missions.',
      'Choisis par la section « Missions », sous les missions.',
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
    place,
    textarea('text', 'Description', 'Description', { required: true }),
    image('image', 'Screenshot', 'Capture d’écran'),
  ],
}
