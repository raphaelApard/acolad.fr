'use client'

import { useRowLabel } from '@payloadcms/ui'

// Array rows show their title or name instead of "Row 01".

export const TitleRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  return <span>{data?.title || `#${(rowNumber ?? 0) + 1}`}</span>
}

export const NameRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string }>()
  return <span>{data?.name || `#${(rowNumber ?? 0) + 1}`}</span>
}
