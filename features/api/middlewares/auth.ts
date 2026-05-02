import type { Middleware } from 'openapi-fetch'

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    return request
  },
}
