import type { Block } from 'payload'

import { BackgroundSummary } from './BackgroundSummary'
import { Clients } from './Clients'
import { ClosingCta } from './ClosingCta'
import { ContactDetails } from './ContactDetails'
import { ContactForm } from './ContactForm'
import { Experience } from './Experience'
import { Hero } from './Hero'
import { PageHead } from './PageHead'
import { Points } from './Points'
import { Projects } from './Projects'
import { Services } from './Services'
import { StackGroups } from './StackGroups'

/** The building blocks of a page, in the order the editor picks them from. */
export const blocks: Block[] = [
  Hero,
  PageHead,
  Services,
  Projects,
  Clients,
  BackgroundSummary,
  Experience,
  StackGroups,
  Points,
  ContactForm,
  ContactDetails,
  ClosingCta,
]
