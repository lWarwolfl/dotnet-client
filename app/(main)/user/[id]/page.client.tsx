'use client'

import LoadingSection from '@/components/common/loading-section'
import { privateClientHooks } from '@/features/api/client'
import ProfileContent from '@/features/landing/components/profile-content'

export default function UserProfileClient({ id }: { id: string }) {
  const { isFetching, data } = privateClientHooks.useQuery('get', '/api/Profiles/{id}', {
    params: { path: { id } },
  })

  return (
    <div className="flex w-full flex-col gap-8">
      <LoadingSection isFetching={isFetching}>
        {data ? <ProfileContent data={data} /> : undefined}
      </LoadingSection>
    </div>
  )
}
