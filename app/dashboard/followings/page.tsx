import FollowingTable from '@/features/panel/components/followings/following-table'
import SectionHeader from '@/features/panel/components/layout/section-header'

export default async function FollowingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader section="Followings" />

      <FollowingTable />
    </div>
  )
}
