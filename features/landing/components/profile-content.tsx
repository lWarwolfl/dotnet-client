'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfileType } from '@/features/api/types/entities'
import { getUsername } from '@/features/auth/utils'

export type ProfileContentProps = React.ComponentProps<'div'> & {
  data: ProfileType
}

export default function ProfileContent({ data }: ProfileContentProps) {
  const userName = getUsername(data)
  const userNameFallback = getUsername(data, 2)

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Avatar size="3xl">
        <AvatarImage src={data.imageUrl || ''} alt={userName} />
        <AvatarFallback>{userNameFallback}</AvatarFallback>
      </Avatar>

      <p>{data.displayName}</p>

      <p>{data.bio}</p>
    </div>
  )
}
