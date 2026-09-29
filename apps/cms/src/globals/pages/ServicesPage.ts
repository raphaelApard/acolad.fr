import { closingCtaField, label, pageHeadField, text, textarea } from '../../fields/helpers'
import { pageGlobal } from './pageGlobal'

export const ServicesPage = pageGlobal('services-page', 'Services page', 'Page services', [
  pageHeadField,
  text('methodTitle', 'Process heading', 'Titre de la méthode', { required: true }),
  {
    name: 'process',
    type: 'array',
    label: label('Process steps', 'Étapes de la méthode'),
    fields: [
      text('title', 'Title', 'Titre', { required: true }),
      textarea('description', 'Description', 'Description', { required: true }),
    ],
  },
  closingCtaField,
])
