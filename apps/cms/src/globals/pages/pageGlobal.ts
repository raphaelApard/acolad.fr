import type { Field, GlobalConfig } from 'payload'

import { publicRead } from '../../access/public'
import { label, seoField } from '../../fields/helpers'

/** A site page: public read, grouped under "Pages", SEO fields first. */
export const pageGlobal = (
  slug: string,
  en: string,
  fr: string,
  fields: Field[],
): GlobalConfig => ({
  slug,
  label: label(en, fr),
  access: { read: publicRead },
  admin: { group: label('Pages', 'Pages') },
  fields: [seoField, ...fields],
})
