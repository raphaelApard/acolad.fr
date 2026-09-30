import { label } from '../fields/helpers'
import { imageCollection } from './images'

/** Project screenshots. */
export const ProjectImages = imageCollection('project-images', {
  singular: label('Project image', 'Image projet'),
  plural: label('Project images', 'Images projets'),
})
