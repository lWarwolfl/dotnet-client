import { privateMiddleware } from '@/features/api/middlewares/private'
import { publicMiddleware } from '@/features/api/middlewares/public'
import createFetchClient from 'openapi-fetch'
import createQueryClient from 'openapi-react-query'
import type { paths } from './types/schema'

/**
 * Creates a new fetch client for the given base URL.
 * This client is used to make requests to the API v1.
 * @param {{ baseUrl: string }} options - The options for the fetch client.
 * @returns {FetchClient<paths>} - The new fetch client.
 */
const publicClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
})
const privateClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
})

publicClient.use(publicMiddleware)
privateClient.use(privateMiddleware)

/**
 * Creates a new react query client for the given fetch client.
 *
 * The **functionKey** is `[method, path, params]`.
 * @param {FetchClient<paths>} fetchClient - The fetch client to use for the query client.
 * @returns {QueryClient<paths>} - The new query client.
 */
const publicClientHooks = createQueryClient<paths>(publicClient)
const privateClientHooks = createQueryClient<paths>(privateClient)

export { privateClient, privateClientHooks, publicClient, publicClientHooks }
