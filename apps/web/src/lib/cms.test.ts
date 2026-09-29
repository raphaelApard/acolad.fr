import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { clearCache, getDocs, getGlobal, mediaUrl, resolveMedia } from './cms'

const ok = (body: unknown) => Promise.resolve(new Response(JSON.stringify(body), { status: 200 }))

describe('cms client', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    process.env.PAYLOAD_URL = 'http://cms.test/'
    clearCache()
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    delete process.env.PAYLOAD_URL
  })

  it('reads a global in the requested language', async () => {
    fetchMock.mockReturnValue(ok({ email: 'a@b.c' }))
    await expect(getGlobal('site', 'en')).resolves.toEqual({ email: 'a@b.c' })
    expect(fetchMock).toHaveBeenCalledWith('http://cms.test/api/globals/site?locale=en&depth=0')
  })

  it('lists a collection sorted by order, without a page limit', async () => {
    fetchMock.mockReturnValue(ok({ docs: [{ id: 1 }, { id: 2 }] }))
    await expect(getDocs('services', 'fr')).resolves.toEqual([{ id: 1 }, { id: 2 }])
    expect(fetchMock).toHaveBeenCalledWith(
      'http://cms.test/api/services?locale=fr&limit=0&sort=order&depth=0',
    )
  })

  it('fetches the same request only once per build', async () => {
    fetchMock.mockImplementation(() => ok({ docs: [] }))
    await Promise.all([getDocs('clients', 'fr', 1), getDocs('clients', 'fr', 1)])
    await getDocs('clients', 'fr', 1)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    await getDocs('clients', 'en', 1)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('explains how to start the CMS when it is unreachable, and retries later', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('fetch failed'))
    await expect(getGlobal('site', 'fr')).rejects.toThrow(/Could not reach the CMS at http:\/\/cms\.test.*pnpm dev:cms/)
    fetchMock.mockReturnValue(ok({ name: 'x' }))
    await expect(getGlobal('site', 'fr')).resolves.toEqual({ name: 'x' })
  })

  it('reports an error status', async () => {
    fetchMock.mockReturnValue(Promise.resolve(new Response('nope', { status: 500 })))
    await expect(getGlobal('labels', 'fr')).rejects.toThrow('The CMS answered 500')
  })

  it('resolves populated media and rejects bare ids', () => {
    const media = { id: 1, url: '/api/media/file/a.webp' } as never
    expect(resolveMedia(media)).toBe(media)
    expect(() => resolveMedia(3)).toThrow(/not populated/)
    expect(mediaUrl(media)).toBe('http://cms.test/api/media/file/a.webp')
  })
})
