'use client'

import LoadingSection from '@/components/common/loading-section'
import { privateClientHooks } from '@/features/api/client'
import ActivityContent from '@/features/landing/components/activity-content'

export default function SingleActivityClient({ id }: { id: string }) {
  const { isFetching, data } = privateClientHooks.useQuery('get', '/api/Activities/{id}', {
    params: { path: { id } },
  })

  return (
    <div className="flex w-full flex-col gap-8">
      <LoadingSection isFetching={isFetching}>
        {data ? <ActivityContent data={data} /> : undefined}
      </LoadingSection>
    </div>
  )
}
