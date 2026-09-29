import type { Field, GlobalConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, text } from '../fields/helpers'

const group = (name: string, en: string, fr: string, fields: Field[]): Field => ({
  name,
  type: 'group',
  label: label(en, fr),
  fields,
})

const req = { required: true } as const

export const Labels: GlobalConfig = {
  slug: 'labels',
  label: label('Interface labels', 'Textes de l’interface'),
  access: { read: publicRead },
  admin: { group: label('Site', 'Site') },
  fields: [
    group('nav', 'Navigation', 'Navigation', [
      text('services', 'Services', 'Services', req),
      text('work', 'Work', 'Projets', req),
      text('clients', 'Clients', 'Clients', req),
      text('background', 'Background', 'Parcours', req),
      text('contact', 'Contact', 'Contact', req),
      text('home', 'Home (back link and breadcrumb)', 'Accueil (lien de retour et fil d’Ariane)', req),
    ]),
    group('a11y', 'Accessibility', 'Accessibilité', [
      text('skipLink', 'Skip link', 'Lien d’évitement', req),
      text('mainNavigation', 'Main navigation', 'Navigation principale', req),
      text('language', 'Language switcher', 'Sélecteur de langue', req),
      text('menu', 'Menu button', 'Bouton du menu', req),
      text('socials', 'Social links', 'Liens vers les réseaux', req),
    ]),
    group('common', 'Shared texts', 'Textes communs', [
      text('contactButton', 'Contact button', 'Bouton de contact', req),
      text('seeAllServices', 'See all services', 'Voir tous les services', req),
      text('seeAllProjects', 'See all projects', 'Voir tous les projets', req),
      text('seeAllClients', 'See all clients', 'Voir tous les clients', req),
      text('seeFullBackground', 'See full background', 'Voir le parcours complet', req),
      text('stack', 'Stack heading', 'Titre « Stack »', req),
      text('deliverables', 'Deliverables heading', 'Titre « Livrables »', req),
    ]),
    group('work', 'Projects', 'Projets', [
      text('filter', 'Filter heading', 'Titre du filtre', req),
      text('filterAll', 'Filter: all', 'Filtre : tous', req),
      text('filterWeb', 'Filter: web', 'Filtre : web', req),
      text('filterAi', 'Filter: AI', 'Filtre : IA', req),
      text('client', 'Client', 'Client', req),
      text('result', 'Result', 'Résultat', req),
    ]),
    group('notFound', 'Page not found', 'Page introuvable', [
      text('title', 'Title', 'Titre', req),
      text('backHome', 'Back to home link', 'Lien de retour à l’accueil', req),
    ]),
    group('lightbox', 'Image viewer', 'Visionneuse d’image', [
      text('open', 'Enlarge button', 'Bouton agrandir', req),
      text('close', 'Close button', 'Bouton fermer', req),
      text('dialog', 'Dialog name', 'Nom de la fenêtre', req),
    ]),
  ],
}
