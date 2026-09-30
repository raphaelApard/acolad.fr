import type { CollectionConfig } from 'payload'

import { label } from '../fields/helpers'

const readOnly = { readOnly: true } as const

/**
 * Contact form submissions. Only the contact endpoint creates them (Local API, which bypasses access):
 * through the REST API every operation requires a logged-in user.
 */
export const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: label('Message', 'Message'),
    plural: label('Messages', 'Messages'),
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt', 'locale'],
    group: label('Inbox', 'Boîte de réception'),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: label('Email', 'E-mail'),
      admin: readOnly,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: label('Message', 'Message'),
      admin: readOnly,
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      label: label('Site language', 'Langue du site'),
      options: ['fr', 'en'],
      admin: { ...readOnly, position: 'sidebar' },
    },
    {
      name: 'ipHash',
      type: 'text',
      label: label('Sender fingerprint', 'Empreinte de l’expéditeur'),
      admin: {
        ...readOnly,
        position: 'sidebar',
        description: label(
          'Salted hash of the IP address, only used to spot repeated senders.',
          'Hash salé de l’adresse IP, utilisé uniquement pour repérer les envois répétés.',
        ),
      },
    },
  ],
}
