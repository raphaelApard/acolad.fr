export const MIN_FILL_MS = 1500
export const MAX_MESSAGE_LENGTH = 5000
export const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }

export type ContactInput = {
  email: string
  message: string
  locale: 'fr' | 'en'
}

export type ContactVerdict =
  | { kind: 'ok'; input: ContactInput }
  /** Looks like a bot: answer success but store and send nothing. */
  | { kind: 'drop' }
  | { kind: 'invalid'; code: 'invalid_email' | 'invalid_message' | 'too_fast' }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Checks a contact form payload.
 * `website` is a honeypot field hidden from people; `startedAt` is when the form was shown (ms epoch).
 */
export function checkContact(body: unknown, now = Date.now()): ContactVerdict {
  const data = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>

  if (typeof data.website === 'string' && data.website.trim() !== '') return { kind: 'drop' }

  const email = typeof data.email === 'string' ? data.email.trim() : ''
  if (email.length > 254 || !EMAIL.test(email)) return { kind: 'invalid', code: 'invalid_email' }

  const message = typeof data.message === 'string' ? data.message.trim() : ''
  if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
    return { kind: 'invalid', code: 'invalid_message' }
  }

  if (typeof data.startedAt === 'number' && now - data.startedAt < MIN_FILL_MS) {
    return { kind: 'invalid', code: 'too_fast' }
  }

  return { kind: 'ok', input: { email, message, locale: data.locale === 'en' ? 'en' : 'fr' } }
}

/** Fixed-window counter per key, kept in memory (enough for a single low-traffic instance). */
export function createRateLimiter({ max, windowMs }: { max: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>()

  return function isLimited(key: string, now = Date.now()): boolean {
    const entry = hits.get(key)
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      // Forget expired keys so the map cannot grow forever.
      if (hits.size > 1000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k)
      return false
    }
    entry.count += 1
    return entry.count > max
  }
}

/** Email sent to the site owner for each stored message. */
export function buildNotification(input: ContactInput, adminUrl?: string) {
  const lines = [
    `E-mail : ${input.email}`,
    `Langue du site : ${input.locale}`,
    '',
    input.message,
  ]
  if (adminUrl) lines.push('', `Boîte de réception : ${adminUrl}`)
  return {
    subject: `Nouveau message sur acolad.fr de ${input.email}`,
    text: lines.join('\n'),
  }
}
