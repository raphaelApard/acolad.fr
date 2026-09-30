import type { CollectionConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, orderField, text } from '../fields/helpers'

export const SkillGroups: CollectionConfig = {
  slug: 'skill-groups',
  labels: {
    singular: label('Skill group', 'Groupe de compétences'),
    plural: label('Skill groups', 'Groupes de compétences'),
  },
  access: { read: publicRead },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    group: label('Content', 'Contenu'),
  },
  fields: [
    text('title', 'Title', 'Titre', { required: true }),
    {
      name: 'skills',
      type: 'text',
      hasMany: true,
      required: true,
      label: label('Skills', 'Compétences'),
      admin: {
        description: label(
          'Names are not translated. The home page lists every group as a single flat list.',
          'Les noms ne sont pas traduits. La page d’accueil réunit tous les groupes en une seule liste.',
        ),
      },
    },
    orderField,
  ],
}
