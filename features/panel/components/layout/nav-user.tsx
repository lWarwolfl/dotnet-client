'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Logout from '@/features/panel/components/layout/logout'

import { cn } from '@/lib/utils'
import { RiExpandUpDownLine, RiLogoutBoxLine } from '@remixicon/react'

export function NavUser() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <NavUser.Identity />

              <RiExpandUpDownLine className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <NavUser.Identity />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <Logout>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-start font-normal"
              >
                <RiLogoutBoxLine className="size-5" />
                Logout
              </Button>
            </Logout>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

NavUser.Identity = function Identity() {
  const { state } = useSidebar()

  return (
    <>
      <Avatar className={cn('size-9 rounded-full', { 'size-8': state === 'collapsed' })}>
        <AvatarFallback className="rounded-full">A</AvatarFallback>
      </Avatar>

      <div className="grid flex-1 gap-0.5 text-left text-[13px] leading-tight">
        <span className="text-muted-foreground truncate font-medium">Admin</span>

        <span className="truncate text-xs">test@gmail.com</span>
      </div>
    </>
  )
}
