import SingleActivityClient from '@/app/(main)/activity/[id]/page.client'

export default async function SingleActivity({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-4">
      <SingleActivityClient id={id} />
    </div>
  )
}
