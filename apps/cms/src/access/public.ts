import type { Access } from 'payload'

/** Content is public: the site build reads it without a token. Writes keep Payload's default (logged-in users). */
export const publicRead: Access = () => true
