import { describe, expect, it } from 'vitest'

import { checkContact, createRateLimiter, MAX_MESSAGE_LENGTH, MIN_FILL_MS } from './contact'

const valid = { email: 'jane@example.com', message: 'Hello', locale: 'en' }

describe('checkContact', () => {
  it('accepts a valid message and trims it', () => {
    const verdict = checkContact({ ...valid, email: '  jane@example.com ', message: ' Hello ' })
    expect(verdict).toEqual({
      kind: 'ok',
      input: { email: 'jane@example.com', message: 'Hello', locale: 'en' },
    })
  })

  it('defaults an unknown locale to French', () => {
    const verdict = checkContact({ ...valid, locale: 'de' })
    expect(verdict.kind === 'ok' && verdict.input.locale).toBe('fr')
  })

  it('silently drops submissions that fill the honeypot', () => {
    expect(checkContact({ ...valid, website: 'https://spam.example' })).toEqual({ kind: 'drop' })
  })

  it('ignores an empty honeypot', () => {
    expect(checkContact({ ...valid, website: '' }).kind).toBe('ok')
  })

  it.each([undefined, '', 'not-an-email', 'a@b', `${'a'.repeat(250)}@example.com`, 42])(
    'rejects the email %s',
    (email) => {
      expect(checkContact({ ...valid, email })).toEqual({ kind: 'invalid', code: 'invalid_email' })
    },
  )

  it.each([undefined, '', '   ', 'x'.repeat(MAX_MESSAGE_LENGTH + 1)])('rejects a bad message', (message) => {
    expect(checkContact({ ...valid, message })).toEqual({ kind: 'invalid', code: 'invalid_message' })
  })

  it('rejects a form submitted faster than a person can fill it', () => {
    const now = 1_000_000
    expect(checkContact({ ...valid, startedAt: now - (MIN_FILL_MS - 1) }, now)).toEqual({
      kind: 'invalid',
      code: 'too_fast',
    })
    expect(checkContact({ ...valid, startedAt: now - MIN_FILL_MS }, now).kind).toBe('ok')
  })

  it('handles a non-object body', () => {
    expect(checkContact(null)).toEqual({ kind: 'invalid', code: 'invalid_email' })
  })
})

describe('createRateLimiter', () => {
  it('blocks a key once it exceeds the limit within the window', () => {
    const isLimited = createRateLimiter({ max: 2, windowMs: 1000 })
    expect(isLimited('a', 0)).toBe(false)
    expect(isLimited('a', 1)).toBe(false)
    expect(isLimited('a', 2)).toBe(true)
    expect(isLimited('b', 2)).toBe(false)
  })

  it('starts a new window after it expires', () => {
    const isLimited = createRateLimiter({ max: 1, windowMs: 1000 })
    expect(isLimited('a', 0)).toBe(false)
    expect(isLimited('a', 500)).toBe(true)
    expect(isLimited('a', 1000)).toBe(false)
  })
})
