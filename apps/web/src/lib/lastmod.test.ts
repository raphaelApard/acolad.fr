import { describe, expect, it } from 'vitest'

import { latestDate } from './lastmod'

describe('latestDate', () => {
  it('returns the most recent day', () => {
    expect(latestDate(['2026-03-01T10:00:00.000Z', '2026-09-30T00:10:00.000Z', '2026-05-02T00:00:00.000Z'])).toBe(
      '2026-09-30',
    )
  })

  it('ignores missing dates', () => {
    expect(latestDate([undefined, null, '2026-01-02T00:00:00.000Z'])).toBe('2026-01-02')
  })

  it('refuses to invent a date', () => {
    expect(() => latestDate([undefined, null])).toThrow(/lastmod/)
  })
})
