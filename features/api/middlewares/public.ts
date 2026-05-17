import type { Middleware } from 'openapi-fetch'

export const publicMiddleware: Middleware = {
  async onRequest({ request }) {
    return request
  },
  async onResponse({ response }) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log(response)
      throw new Error(
        response.status === 401
          ? '401 Unauthorized'
          : errorData.message || `${response.status} ${response.statusText}`
      )
    }
    return response
  },
}
