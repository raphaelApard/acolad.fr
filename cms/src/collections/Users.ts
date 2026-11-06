import type { CollectionConfig } from 'payload'

import { label } from '../fields/helpers'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: label('User', 'Utilisateur'), plural: label('Users', 'Utilisateurs') },
  admin: { useAsTitle: 'email', group: label('Settings', 'Réglages') },
  auth: true,
  fields: [],
}
