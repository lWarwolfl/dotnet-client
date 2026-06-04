import { ProfileType } from '@/features/api/types/entities'

export function getUsername(user: ProfileType | null | undefined, characters?: number): string {
  const username = user?.displayName || 'User'

  if (characters) return username.slice(0, characters)

  return username
}
