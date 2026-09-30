import type { Block } from 'payload'

import { label, text, textarea } from '../fields/helpers'

const req = { required: true } as const

/** Email, profiles, location and languages, taken from the site settings. */
export const ContactDetails: Block = {
  slug: 'contactDetails',
  labels: { singular: label('Contact details', 'Coordonnées'), plural: label('Contact details', 'Coordonnées') },
  fields: [
    text('title', 'Section heading', 'Titre de la section', req),
    text('emailLabel', 'Email label', 'Libellé de l’e-mail', req),
    text('profilesLabel', 'Profiles label', 'Libellé des profils', req),
    text('locationLabel', 'Location label', 'Libellé de la localisation', req),
    text('languagesLabel', 'Languages label', 'Libellé des langues', req),
    textarea('brief', 'Brief hint', 'Conseil pour le brief', req),
  ],
}
