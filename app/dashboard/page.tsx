import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { RiHome4Line } from '@remixicon/react'
import Link from 'next/link'

export default async function DashboardPage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiHome4Line className="size-6" />
        </EmptyMedia>

        <EmptyTitle>No activities yet</EmptyTitle>

        <EmptyDescription>You can start adding them right away!</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/games">Go now</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
