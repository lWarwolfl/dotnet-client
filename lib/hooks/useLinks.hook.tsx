import { usePathHelper } from '@/lib/hooks/usePathHelper.hook'
import { RiBeerLine, RiHome4Line } from '@remixicon/react'
import { useMemo } from 'react'

export function useLinks() {
  const { isCurrentPath } = usePathHelper()

  // Memoize the menu items to avoid unnecessary re-renders.
  const items = useMemo(() => {
    const mainItems = [
      {
        type: 'link',
        name: 'Home',
        path: '/',
        get isActive() {
          return isCurrentPath(this.path)
        },
      },
      {
        type: 'link',
        name: 'Dashboard',
        path: '/dashboard',
        get isActive() {
          return isCurrentPath(this.path)
        },
      },
    ] as const

    const panelItems = [
      {
        type: 'main',
        name: 'Dashboard',
        icon: <RiHome4Line />,
        path: '/dashboard',
        breadcrumb: [],
      },
      {
        type: 'main',
        name: 'Activities',
        icon: <RiBeerLine />,
        path: '/dashboard/activities',
        breadcrumb: [
          {
            name: 'Activities',
            path: '/dashboard/activities',
          },
        ],
      },
    ] as const

    return {
      mainItems,
      panelItems,
    }
  }, [isCurrentPath])

  return items
}

export type TMainLinkItem = ReturnType<typeof useLinks>['mainItems'][number]
export type TPanelLinkItem = ReturnType<typeof useLinks>['panelItems'][number]
