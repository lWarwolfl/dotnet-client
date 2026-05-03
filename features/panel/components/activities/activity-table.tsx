'use client'

import { TableSkeleton } from '@/components/common/table-skeleton'
import { DataTable } from '@/components/ui/data-table'
import { clientHooks } from '@/features/api/client'
import { ActivityType } from '@/features/api/types/entities'
import ActivityDelete from '@/features/panel/components/activities/activity-delete'
import ActivityUpdateDrawer from '@/features/panel/components/activities/activity-update-drawer'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Image from 'next/image'

export default function ActivityTable() {
  // const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isLoading } = clientHooks.useQuery('get', '/api/Activities')

  // function onPageChange(page: number) {
  //   setCurrentPage(page)
  // }

  const columns: ColumnDef<ActivityType>[] = [
    {
      accessorKey: 'title',
      header: () => 'Title',
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: 'city',
      header: () => 'City',
      cell: ({ row }) => row.original.city,
    },
    {
      accessorKey: 'venue',
      header: () => 'Venue',
      cell: ({ row }) => {
        return <div className="max-w-120 truncate">{row.original.venue}</div>
      },
    },
    {
      accessorKey: 'category',
      header: () => 'Category',
      cell: ({ row }) => {
        return (
          <div className="flex w-40 shrink-0 items-center gap-2">
            <Image
              alt={row.original.title}
              width={50}
              height={50}
              className="size-8 rounded-sm object-cover object-center"
              src={`/categories/${row.original.category}.jpg`}
            />

            <span className="max-w-5/6 truncate capitalize">{row.original.category}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'date',
      header: () => 'Date',
      cell: ({ row }) => {
        return format(row.original.date ? row.original.date : new Date(), 'dd MMM, yyyy')
      },
    },
    {
      accessorKey: 'actions',
      header: () => 'Actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <ActivityUpdateDrawer data={row.original} />

            <ActivityDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isLoading ? (
    <TableSkeleton columns={8} />
  ) : (
    <>
      <DataTable data={data ? data : []} columns={columns} />

      {/* {data?.pagination && data.pagination.totalPages > 1 ? (
        <DataPagination pagination={data.pagination} onPageChange={onPageChange} />
      ) : null} */}
    </>
  )
}
