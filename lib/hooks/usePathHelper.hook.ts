import { usePathname } from 'next/navigation'

export const usePathHelper = () => {
  const pathname = usePathname()

  const isCurrentPath = (path: string) => pathname === path

  const doseIncludePath = (path: string) => pathname.includes(path)

  return { isCurrentPath, doseIncludePath, pathname }
}
