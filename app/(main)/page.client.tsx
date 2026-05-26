'use client'

import LoadingSection from '@/components/common/loading-section'
import { useUserName } from '@/components/providers/auth-provider'
import { privateClientHooks } from '@/features/api/client'
import ActivityCard from '@/features/landing/components/activity-card'

export default function HomeClient() {
  const { isFetching, data } = privateClientHooks.useQuery('get', '/api/Activities')
  const username = useUserName()

  return (
    <div className="flex flex-col gap-8">
      <span className="text-lg">Welcome dear, {username}</span>

      <LoadingSection
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        isFetching={isFetching}
      >
        {data ? data.map((item) => <ActivityCard key={item.id} data={item} />) : undefined}
      </LoadingSection>
    </div>
  )
}
