import type { BlockType } from '../../lib/pages'
import BackgroundSummary from './BackgroundSummary.astro'
import Clients from './Clients.astro'
import ClosingCta from './ClosingCta.astro'
import ContactDetails from './ContactDetails.astro'
import ContactForm from './ContactForm.astro'
import Experience from './Experience.astro'
import Hero from './Hero.astro'
import PageHead from './PageHead.astro'
import Points from './Points.astro'
import Projects from './Projects.astro'
import Services from './Services.astro'
import StackGroups from './StackGroups.astro'

/**
 * The component that renders each kind of section. Every one takes `{ block, ctx, index }`; their props
 * differ by block type, so the registry is loosely typed and the block type is what ties them together.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BLOCKS: Record<BlockType, any> = {
  hero: Hero,
  pageHead: PageHead,
  services: Services,
  projects: Projects,
  clients: Clients,
  backgroundSummary: BackgroundSummary,
  experience: Experience,
  stackGroups: StackGroups,
  points: Points,
  contactForm: ContactForm,
  contactDetails: ContactDetails,
  closingCta: ClosingCta,
}
