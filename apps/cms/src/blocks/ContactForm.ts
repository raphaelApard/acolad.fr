import type { Block } from 'payload'

import { label, text } from '../fields/helpers'

const req = { required: true } as const

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: { singular: label('Contact form', 'Formulaire de contact'), plural: label('Contact forms', 'Formulaires de contact') },
  fields: [
    text('title', 'Section heading', 'Titre de la section', req),
    text('emailLabel', 'Email field label', 'Libellé du champ e-mail', req),
    text('messageLabel', 'Message field label', 'Libellé du champ message', req),
    text('messagePlaceholder', 'Message placeholder', 'Texte indicatif du message', req),
    text('submitLabel', 'Submit button', 'Bouton d’envoi', req),
    text('privacyNote', 'Privacy note', 'Note de confidentialité', req),
    text('subjectPrefix', 'Email subject prefix', 'Préfixe de l’objet du mail', {
      required: true,
      admin: {
        description: label(
          'Start of the subject when the visitor’s mail client is used as a fallback.',
          'Début de l’objet quand le client mail du visiteur sert de repli.',
        ),
      },
    }),
    text('sentTitle', 'Confirmation title', 'Titre de la confirmation', req),
    text('sentText', 'Confirmation text', 'Texte de la confirmation', req),
    text('errorText', 'Error text', 'Texte d’erreur', req),
  ],
}
