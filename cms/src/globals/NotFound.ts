import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/public'
import { image, label, text, textarea } from '../fields/helpers'

export const NotFound: GlobalConfig = {
  slug: 'not-found',
  label: label('404 page', 'Page 404'),
  access: { read: publicRead },
  admin: { group: label('Pages', 'Pages') },
  versions: { max: 50 },
  fields: [
    text('code', 'Code line', 'Ligne du code', { required: true }),
    text('title', 'Title', 'Titre', { required: true }),
    textarea('text', 'Text', 'Texte', { required: true }),
    text('cta', 'Button', 'Bouton', { required: true }),
    image('image', 'Illustration', 'Illustration', {
      required: true,
      localized: true,
      admin: { description: label('One picture per language: it carries the error text.', 'Une image par langue : elle porte le texte de l’erreur.') },
    }),
  ],
}
