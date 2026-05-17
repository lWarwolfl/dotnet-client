import type { Middleware } from 'openapi-fetch'
import createFetchClient from 'openapi-fetch'
import type { paths } from '../types/schema'

let csrfFetchPromise: Promise<unknown> | null = null

const internalCsrfClient = createFetchClient<paths>({
  baseUrl: typeof window === 'undefined' ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
})

async function getAntiforgeryToken(): Promise<string | undefined> {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    try {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      return cookieStore.get('XSRF-TOKEN')?.value
    } catch {
      return undefined
    }
  }

  if (typeof document !== 'undefined') {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1]
  }

  return undefined
}

export const privateMiddleware: Middleware = {
  async onRequest({ request }) {
    const isServer = typeof window === 'undefined'
    let token = await getAntiforgeryToken()

    if (!token && isServer) {
      return request
    }

    if (!token && !isServer) {
      if (!csrfFetchPromise) {
        csrfFetchPromise = internalCsrfClient.GET('/api/Account/csrf-token').finally(() => {
          csrfFetchPromise = null
        })
      }

      await csrfFetchPromise
      token = await getAntiforgeryToken()
    }

    if (token) {
      request.headers.set('X-XSRF-TOKEN', token)
    }

    return request
  },

  async onResponse({ response }) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        response.status === 401
          ? '401 Unauthorized'
          : errorData.message || `${response.status} ${response.statusText}`
      )
    }
    return response
  },
}
