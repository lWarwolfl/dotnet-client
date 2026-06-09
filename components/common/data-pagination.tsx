'use client'

import { Button } from '@/components/ui/button'
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

interface DataPaginationProps {
  nextCursor?: string | null
  prevCursor?: string | null
  isFetching: boolean
  onNavigate: (cursor: string | null, action: 'next' | 'back') => void
}

export default function DataPagination({ nextCursor, prevCursor, isFetching, onNavigate }: DataPaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-between border-t pt-4">
      <Button
        variant="outline"
        onClick={() => onNavigate(prevCursor ?? null, 'back')}
        disabled={!prevCursor || isFetching}
        className="gap-2"
      >
        <RiArrowLeftLine className="size-4" />
        Back
      </Button>
      <Button
        variant="outline"
        onClick={() => onNavigate(nextCursor ?? null, 'next')}
        disabled={!nextCursor || isFetching}
        className="gap-2"
      >
        Next
        <RiArrowRightLine className="size-4" />
      </Button>
    </div>
  )
}
