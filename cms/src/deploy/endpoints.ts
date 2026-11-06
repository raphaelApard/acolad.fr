import type { Endpoint } from 'payload'

import { getPublishStatus, startPublish } from './runner'

// GET /api/publish: state and log of the last run. POST /api/publish: start a run.
// Both need a logged-in admin user.
export const publishEndpoints: Endpoint[] = [
  {
    path: '/publish',
    method: 'get',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
      return Response.json(getPublishStatus())
    },
  },
  {
    path: '/publish',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
      const before = getPublishStatus()
      if (before.state === 'running') return Response.json(before, { status: 409 })
      return Response.json(startPublish(String(req.user.email ?? req.user.id)), { status: 202 })
    },
  },
]
