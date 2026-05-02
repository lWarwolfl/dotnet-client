'use client'

import { clientHooks } from '@/features/api/client'

export default function HomeClient() {
  const { isFetching, data } = clientHooks.useQuery('get', '/api/Activities')

  return <div className="">{isFetching ? 'Loading...' : JSON.stringify(data)}</div>
}
