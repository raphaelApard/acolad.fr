import { describe, expect, it } from 'vitest'

import { logoSizes, srcsetWidths } from './images'

describe('srcsetWidths', () => {
  it('keeps the usual steps below 90% of the source width and adds the source width', () => {
    expect(srcsetWidths(2956)).toEqual([120, 180, 240, 320, 480, 640, 960, 1280, 1920, 2956])
    expect(srcsetWidths(400)).toEqual([120, 180, 240, 320, 400])
    expect(srcsetWidths(296)).toEqual([120, 180, 240, 296])
  })
})

describe('logoSizes', () => {
  // Values written by hand on the legacy home page.
  it.each([
    ['square logo', 296, 296, 'default', '(max-width: 720px) 104px, 148px'],
    ['wide logo', 250, 110, 'default', '(max-width: 720px) calc(50vw - 54px), 200px'],
    ['very wide logo', 400, 109, 'default', '(max-width: 720px) calc(50vw - 54px), 200px'],
    ['small wide logo', 260, 127, 'small', '(max-width: 720px) calc((50vw - 54px) * 0.64), 124px'],
    ['small square logo', 194, 190, 'small', '(max-width: 720px) 68px, 94px'],
    ['small tall logo', 176, 190, 'small', '(max-width: 720px) 62px, 85px'],
    ['mid square logo', 221, 228, 'mid', '(max-width: 720px) 83px, 115px'],
    ['mid wide logo', 224, 64, 'mid', '(max-width: 720px) calc((50vw - 54px) * 0.82), 160px'],
  ] as const)('matches the legacy home value for a %s', (_name, width, height, size, expected) => {
    expect(logoSizes({ width, height, size, context: 'home' })).toBe(expected)
  })

  // Values written by hand on the legacy clients page.
  it.each([
    ['square logo', 296, 296, 'default', '124px'],
    ['wide logo', 250, 110, 'default', '(max-width: 720px) calc(100vw - 84px), 200px'],
    ['small wide logo', 260, 127, 'small', '(max-width: 720px) calc((100vw - 84px) * 0.62), 124px'],
    ['small square logo', 194, 190, 'small', '78px'],
    ['mid square logo', 221, 228, 'mid', '96px'],
    ['mid wide logo', 224, 64, 'mid', '(max-width: 720px) calc((100vw - 84px) * 0.8), 160px'],
  ] as const)('matches the legacy clients value for a %s', (_name, width, height, size, expected) => {
    expect(logoSizes({ width, height, size, context: 'clients' })).toBe(expected)
  })
})
