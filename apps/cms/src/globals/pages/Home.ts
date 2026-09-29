import { closingCtaField, label, text, textarea } from '../../fields/helpers'
import { pageGlobal } from './pageGlobal'

export const Home = pageGlobal('home', 'Home page', 'Page d’accueil', [
  {
    name: 'hero',
    type: 'group',
    label: label('Hero', 'Bandeau d’accueil'),
    fields: [
      text('title', 'Title (h1)', 'Titre (h1)', { required: true }),
      textarea('subtitle', 'Introduction', 'Introduction', { required: true }),
      text('primaryCta', 'Main button', 'Bouton principal', { required: true }),
      text('secondaryCta', 'Secondary button', 'Bouton secondaire', { required: true }),
      {
        name: 'aside',
        type: 'array',
        label: label('Side lines', 'Lignes latérales'),
        fields: [text('text', 'Line', 'Ligne', { required: true })],
      },
    ],
  },
  {
    name: 'sections',
    type: 'group',
    label: label('Section headings', 'Titres des sections'),
    fields: [
      text('services', 'Services', 'Services', { required: true }),
      text('projects', 'Projects', 'Projets', { required: true }),
      text('clients', 'Clients (label)', 'Clients (étiquette)', { required: true }),
      text('clientsHeading', 'Clients (heading)', 'Clients (titre)', { required: true }),
      text('background', 'Background', 'Parcours', { required: true }),
    ],
  },
  closingCtaField,
])
