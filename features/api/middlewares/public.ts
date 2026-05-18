import type { Middleware } from 'openapi-fetch'

export const publicMiddleware: Middleware = {
  async onRequest({ request }) {
    return request
  },
  async onResponse({ response }) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      throw new Error(errorData.title || `${response.status} Error`)
    }
    return response
  },
}
