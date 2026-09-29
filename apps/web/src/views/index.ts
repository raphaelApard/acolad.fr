import type { PageKey } from '../lib/routes'
import BackgroundView from './BackgroundView.astro'
import ClientsView from './ClientsView.astro'
import ContactView from './ContactView.astro'
import HomeView from './HomeView.astro'
import ServicesView from './ServicesView.astro'
import WorkView from './WorkView.astro'

/** One view per page: it loads its own content and renders it in the requested language. */
export const VIEWS: Record<PageKey, typeof HomeView> = {
  home: HomeView,
  services: ServicesView,
  work: WorkView,
  clients: ClientsView,
  background: BackgroundView,
  contact: ContactView,
}
