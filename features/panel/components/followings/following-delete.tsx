'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { privateClientHooks } from '@/features/api/client'
import { ProfileType } from '@/features/api/types/entities'
import { RiUserUnfollowLine } from '@remixicon/react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export type FollowingDeleteProps = { data: ProfileType }

export default function FollowingDelete({ data }: FollowingDeleteProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutate: mutateDeleteFollowing, isPending: isPendingDeleteFollowing } =
    privateClientHooks.useMutation('post', '/api/Profiles/{userId}/follow')

  function onSubmit() {
    mutateDeleteFollowing(
      { params: { path: { userId: data.id! } } },
      {
        onSuccess: () => {
          toast.success('User unfollowed successfully')
          setOpen(false)
          queryClient.invalidateQueries({
            refetchType: 'all',
            ...privateClientHooks.queryOptions('get', '/api/Activities'),
          })
        },
      }
    )
  }

  return (
    <ResponsiveDialog
      title="Unfollow this user"
      description="you can come back to them any time"
      trigger={
        <Button variant="destructive" size="sm">
          Unfollow
          <RiUserUnfollowLine className="size-4" />
        </Button>
      }
      action={
        <SubmitButton
          onClick={() => onSubmit()}
          loading={isPendingDeleteFollowing}
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
