import ActivityCreateDrawer from '@/features/panel/components/activities/activity-create-drawer'
import ActivityTable from '@/features/panel/components/activities/activity-table'
import SectionHeader from '@/features/panel/components/layout/section-header'

export default async function GamesPage() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader section="Activities" action={<ActivityCreateDrawer />} />

      <ActivityTable />
    </div>
  )
}
