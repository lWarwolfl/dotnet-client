'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useLinks } from '@/lib/hooks/useLinks.hook'
import { usePathHelper } from '@/lib/hooks/usePathHelper.hook'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function NavMain() {
  const { panelItems } = useLinks()
  const { doseIncludePath, isCurrentPath } = usePathHelper()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>My Data</SidebarGroupLabel>

      <SidebarMenu>
        {panelItems
          .filter((item) => item.type === 'main')
          .map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                tooltip={item.name}
                className={cn({ 'pointer-events-none': isCurrentPath(item.path) })}
                isActive={
                  item.path === '/dashboard' ? isCurrentPath(item.path) : doseIncludePath(item.path)
                }
                asChild
              >
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
