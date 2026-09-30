import type { Logo, ProjectImage } from '@cms-types'

// Content types come from the CMS: importing them here keeps the site and the schema in step.
export type {
  Client,
  Job,
  Label as Labels,
  Logo,
  Page,
  Project,
  ProjectImage,
  Service,
  Site,
  SkillGroup,
} from '@cms-types'

/** An image from any of the CMS image libraries. */
export type Media = Logo | ProjectImage
