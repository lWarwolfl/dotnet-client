'use client'

import { useUserName } from '@/components/providers/auth-provider'
import { privateClientHooks } from '@/features/api/client'
import ActivityCard from '@/features/landing/components/activity-card'

export default function HomeClient() {
  const { isFetching, data } = privateClientHooks.useQuery('get', '/api/Activities')
  const username = useUserName()

  return (
    <div className="flex flex-col gap-8">
      <span className="text-lg">Welcome dear, {username}</span>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isFetching ? (
          <span className="col-span-full text-center">Loading...</span>
        ) : data ? (
          data.map((item) => <ActivityCard key={item.id} data={item} />)
        ) : (
          <span className="col-span-full text-center">Failed to fetch</span>
        )}
      </div>
    </div>
  )
}
