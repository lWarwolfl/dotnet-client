'use client'

import { ThemeToggle } from '@/components/common/theme-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavMain } from '@/features/panel/components/layout/nav-main'
import { NavUser } from '@/features/panel/components/layout/nav-user'
import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:h-9">
                <Link href="/" className="text-foreground flex items-center">
                  <Image alt="logo" src={logo} className="h-7 w-auto object-contain" />

                  <span className="first-letter:text-primary text-[15px] font-medium">
                    My Next.js Client
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {state === 'expanded' || isMobile ? <ThemeToggle variant="secondary" /> : null}
        </div>
      </SidebarHeader>

      {state === 'collapsed' && !isMobile ? (
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeToggle size="icon-sm" variant="ghost" className="mx-2 [&>svg]:size-4!" />
          </SidebarMenuItem>
        </SidebarMenu>
      ) : null}

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
