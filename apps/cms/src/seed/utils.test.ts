import { describe, expect, it } from 'vitest'

import { merge, withRowIds } from './utils'

describe('merge', () => {
  it('merges plain objects deeply', () => {
    expect(merge({ a: 1, g: { x: 1 } }, { b: 2, g: { y: 2 } })).toEqual({ a: 1, b: 2, g: { x: 1, y: 2 } })
  })

  it('merges arrays row by row', () => {
    expect(merge({ rows: [{ url: 'a' }, { url: 'b' }] }, { rows: [{ label: 'A' }, { label: 'B' }] })).toEqual({
      rows: [
        { url: 'a', label: 'A' },
        { url: 'b', label: 'B' },
      ],
    })
  })

  it('keeps extra rows and lets later scalars win', () => {
    expect(merge({ n: 1, rows: [1, 2, 3] }, { n: 2, rows: [9] })).toEqual({ n: 2, rows: [9, 2, 3] })
  })

  it('ignores undefined parts', () => {
    expect(merge(undefined, { a: 1 }, undefined)).toEqual({ a: 1 })
  })
})

describe('withRowIds', () => {
  it('copies row ids from the saved document, at any depth', () => {
    const saved = { hero: { aside: [{ id: 'r1', text: 'fr 1' }, { id: 'r2', text: 'fr 2' }] }, tags: ['x'] }
    const next = { hero: { aside: [{ text: 'en 1' }, { text: 'en 2' }] }, tags: ['y'] }
    expect(withRowIds(saved, next)).toEqual({
      hero: { aside: [{ id: 'r1', text: 'en 1' }, { id: 'r2', text: 'en 2' }] },
      tags: ['y'],
    })
  })

  it('leaves rows without a saved counterpart untouched', () => {
    expect(withRowIds({ rows: [{ id: 'r1' }] }, { rows: [{ a: 1 }, { a: 2 }] })).toEqual({
      rows: [{ id: 'r1', a: 1 }, { a: 2 }],
    })
  })
})
