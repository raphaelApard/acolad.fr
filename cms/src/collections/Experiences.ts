import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { displayName, label, lines, period, place, text, textarea, listTitle } from '../fields/helpers'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: label('Experience', 'Expérience'), plural: label('Experience', 'Expériences') },
  access: { read: publicRead },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'period', 'role'],
    group: label('Résumé', 'CV'),
    description: label(
      'Jobs before and alongside freelancing, picked by the “Other experience” section.',
      'Postes avant et en parallèle du freelance, choisis par la section « Autres expériences ».',
    ),
  },
  versions: { maxPerDoc: 20 },
  fields: [
    listTitle,
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'relationship', relationTo: 'companies', required: true, label: label('Company', 'Entreprise') },
        displayName,
      ],
    },
    { type: 'row', fields: [period, place] },
    text('role', 'Role', 'Poste', { required: true }),
    textarea('text', 'Description', 'Description', { required: true }),
    lines('achievements', 'Achievements', 'Réalisations'),
    {
      name: 'projects',
      type: 'array',
      localized: true,
      label: label('Projects', 'Projets'),
      labels: { singular: label('Project', 'Projet'), plural: label('Projects', 'Projets') },
      fields: [
        { name: 'name', type: 'text', required: true, label: label('Name', 'Nom') },
        { name: 'text', type: 'textarea', required: true, label: label('Description', 'Description') },
      ],
    },
  ],
}
