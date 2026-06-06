import UserProfileClient from '@/app/(main)/user/[id]/page.client'

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-4">
      <UserProfileClient id={id} />
    </div>
  )
}
