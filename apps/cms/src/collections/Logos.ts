import { label } from '../fields/helpers'
import { imageCollection } from './images'

/** Client logos. */
export const Logos = imageCollection('logos', {
  singular: label('Logo', 'Logo'),
  plural: label('Logos', 'Logos'),
})
