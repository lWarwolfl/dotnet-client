'use client'

import DataPagination from '@/components/common/data-pagination'
import LoadingSection from '@/components/common/loading-section'
import { useUserName } from '@/components/providers/auth-provider'
import { privateClientHooks } from '@/features/api/client'
import ActivityCard from '@/features/landing/components/activity-card'
import { useState } from 'react'

export default function HomeClient() {
  const username = useUserName()

  const [after, setAfter] = useState<string | null>(null)
  const [before, setBefore] = useState<string | null>(null)

  const { isFetching, data } = privateClientHooks.useQuery('get', '/api/Activities', {
    params: {
      query: {
        after: after ?? undefined,
        before: before ?? undefined,
      },
    },
  })

  const handlePagination = (targetCursor: string | null, action: 'next' | 'back') => {
    if (action === 'next') {
      setAfter(targetCursor)
      setBefore(null)
    } else {
      setAfter(null)
      setBefore(targetCursor)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <span className="text-lg">Welcome dear, {username}</span>

      <LoadingSection
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        isFetching={isFetching}
      >
        {data?.items
          ? data.items.map((item) => <ActivityCard key={item.id} data={item} />)
          : undefined}
      </LoadingSection>

      <DataPagination
        nextCursor={data?.nextCursor}
        prevCursor={data?.prevCursor}
        isFetching={isFetching}
        onNavigate={handlePagination}
      />
    </div>
  )
}
