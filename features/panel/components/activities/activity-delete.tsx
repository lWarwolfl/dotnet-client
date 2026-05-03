'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { clientHooks } from '@/features/api/client'
import { ActivityType } from '@/features/api/types/entities'
import { RiDeleteBinLine } from '@remixicon/react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export type ActivityDeleteProps = { data: ActivityType }

export default function ActivityDelete({ data }: ActivityDeleteProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate: mutateDeleteActivity, isPending: isPendingDeleteActivity } =
    clientHooks.useMutation('delete', '/api/Activities/{id}')

  function onSubmit() {
    mutateDeleteActivity(
      { params: { path: { id: data.id! } } },
      {
        onSuccess: () => {
          toast.success('Activity deleted successfully')
          setOpen(false)
          queryClient.invalidateQueries({
            refetchType: 'all',
            ...clientHooks.queryOptions('get', '/api/Activities'),
          })
        },
      }
    )
  }

  return (
    <ResponsiveDialog
      title="Delete an activity"
      description="this action is irreversible"
      trigger={
        <Button variant="destructive" size="sm">
          Delete
          <RiDeleteBinLine className="size-4" />
        </Button>
      }
      action={
        <SubmitButton
          onClick={() => onSubmit()}
          loading={isPendingDeleteActivity}
          variant="destructive"
        >
          Confirm
        </SubmitButton>
      }
      open={open}
      setOpen={setOpen}
    />
  )
}
