import FollowerTable from '@/features/panel/components/followers/follower-table'
import SectionHeader from '@/features/panel/components/layout/section-header'

export default async function FollowersPage() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader section="Followers" />

      <FollowerTable />
    </div>
  )
}
