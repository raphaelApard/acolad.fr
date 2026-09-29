import { closingCtaField, label, pageHeadField, text } from '../../fields/helpers'
import { pageGlobal } from './pageGlobal'

export const ClientsPage = pageGlobal('clients-page', 'Clients page', 'Page clients', [
  pageHeadField,
  text('countLabel', 'Client count label', 'Libellé du nombre de clients', {
    required: true,
    admin: {
      description: label(
        'Use {count} where the number of clients goes.',
        'Utiliser {count} à l’endroit du nombre de clients.',
      ),
    },
  }),
  closingCtaField,
])
