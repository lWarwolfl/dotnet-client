'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { useUser } from '@/components/providers/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { privateClientHooks } from '@/features/api/client'
import { ProfileType } from '@/features/api/types/entities'
import { getUsername } from '@/features/auth/utils'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export type ProfileContentProps = React.ComponentProps<'div'> & {
  data: ProfileType
}

export default function ProfileContent({ data }: ProfileContentProps) {
  const currentUser = useUser()

  const userName = getUsername(data)
  const userNameFallback = getUsername(data, 2)

  const { mutate, isPending } = privateClientHooks.useMutation(
    'post',
    '/api/Profiles/{userId}/follow'
  )
  const queryClient = useQueryClient()

  function onSubmit() {
    mutate(
      { params: { path: { userId: data.id } } },
      {
        onSuccess: () => {
          if (data.following) {
            toast.success('Unfollowed user successfully')
          } else {
            toast.success('Followed user successfully')
          }

          queryClient.invalidateQueries({
            queryKey: privateClientHooks.queryOptions('get', '/api/Profiles/{id}', {
              params: { path: { id: data.id } },
            }).queryKey,
          })
        },
      }
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Avatar size="3xl">
        <AvatarImage src={data.imageUrl || ''} alt={userName} />
        <AvatarFallback>{userNameFallback}</AvatarFallback>
      </Avatar>

      <p>{data.displayName}</p>

      <p>{data.bio}</p>

      <p>Followers: {data.followerCount}</p>

      <p>Followings: {data.followingCount}</p>

      {currentUser?.id !== data.id ? (
        <SubmitButton onClick={() => onSubmit()} loading={isPending}>
          {data.following ? 'Unfollow' : 'Follow'}
        </SubmitButton>
      ) : null}
    </div>
  )
}
