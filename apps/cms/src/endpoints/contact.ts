import { createHash } from 'crypto'
import type { Endpoint, PayloadRequest } from 'payload'

import { buildNotification, checkContact, createRateLimiter, RATE_LIMIT } from '../lib/contact'

const isLimited = createRateLimiter(RATE_LIMIT)

const reply = (body: { ok: boolean; code?: string }, status = 200) => Response.json(body, { status })

const clientIp = (req: PayloadRequest) =>
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'

/**
 * POST /api/contact — receives the contact form of the static site.
 * Answers `{ ok: true }` once the message is stored, `{ ok: false, code }` otherwise; the site falls back to
 * the visitor's mail client on any failure.
 */
export const contactEndpoint: Endpoint = {
  path: '/contact',
  method: 'post',
  handler: async (req) => {
    const ip = clientIp(req)
    if (isLimited(ip)) return reply({ ok: false, code: 'rate_limited' }, 429)

    let body: unknown
    try {
      body = await req.json?.()
    } catch {
      return reply({ ok: false, code: 'invalid_json' }, 400)
    }

    const verdict = checkContact(body)
    if (verdict.kind === 'drop') return reply({ ok: true })
    if (verdict.kind === 'invalid') return reply({ ok: false, code: verdict.code }, 400)

    const ipHash = createHash('sha256')
      .update(`${process.env.PAYLOAD_SECRET}:${ip}`)
      .digest('hex')
      .slice(0, 16)

    try {
      await req.payload.create({
        collection: 'messages',
        data: { ...verdict.input, ipHash },
        overrideAccess: true,
      })
    } catch (error) {
      req.payload.logger.error({ err: error, msg: 'Could not store a contact message' })
      return reply({ ok: false, code: 'server_error' }, 500)
    }

    // The message is safe in the database: a failing mail server must not fail the request.
    try {
      const site = await req.payload.findGlobal({ slug: 'site', depth: 0 })
      const to = process.env.CONTACT_TO || site.email
      const cmsUrl = process.env.CMS_URL
      const { subject, text } = buildNotification(
        verdict.input,
        cmsUrl ? `${cmsUrl}/admin/collections/messages` : undefined,
      )
      await req.payload.sendEmail({ to, replyTo: verdict.input.email, subject, text })
    } catch (error) {
      req.payload.logger.error({ err: error, msg: 'Could not send the contact notification email' })
    }

    return reply({ ok: true })
  },
}
