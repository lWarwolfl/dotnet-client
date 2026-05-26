import { UserType } from '@/features/api/types/entities'

export function getUsername(user: UserType | null | undefined, characters?: number): string {
  const username = user?.displayName || user?.email.split('@')[0] || 'User'

  if (characters) return username.slice(0, characters)

  return username
}
