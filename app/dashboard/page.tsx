import ProfileImage from '@/features/panel/components/dashboard/ProfileImage'

export default async function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <ProfileImage />
    </div>
  )
}
