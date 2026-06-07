'use client'

import { TableSkeleton } from '@/components/common/table-skeleton'
import { useUser } from '@/components/providers/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable } from '@/components/ui/data-table'
import { privateClientHooks } from '@/features/api/client'
import { ProfileType } from '@/features/api/types/entities'
import { getUsername } from '@/features/auth/utils'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export default function FollowerTable() {
  // const [currentPage, setCurrentPage] = useState<number>(1)
  const currentUser = useUser()
  const { data, isLoading } = privateClientHooks.useQuery(
    'get',
    '/api/Profiles/{userId}/follow-list',
    { params: { path: { userId: currentUser!.id }, query: { predicate: 0 } } }
  )

  // function onPageChange(page: number) {
  //   setCurrentPage(page)
  // }

  const columns: ColumnDef<ProfileType>[] = [
    {
      accessorKey: 'name',
      header: () => 'Name',
      cell: ({ row }) => {
        const userName = getUsername(row.original)
        const userNameFallback = getUsername(row.original, 2)

        return (
          <Link
            href={`/user/${row.original.id}`}
            target="_blank"
            className="flex w-80 shrink-0 items-center gap-2"
          >
            <Avatar>
              <AvatarImage src={row.original.imageUrl || ''} alt={userName} />
              <AvatarFallback>{userNameFallback}</AvatarFallback>
            </Avatar>

            <span className="max-w-2/3 truncate">{row.original.displayName}</span>
          </Link>
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
