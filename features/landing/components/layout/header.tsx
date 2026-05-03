'use client'

import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import { useLinks } from '@/lib/hooks/useLinks.hook'
import { cn } from '@/lib/utils'
import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const { mainItems } = useLinks()

  return (
    <>
      <header className="flex w-full items-center gap-4 md:gap-6">
        <div className="text-foreground flex items-center gap-2">
          <Image alt="logo" src={logo} className="h-10 w-auto" />
          <span className="text-xl font-semibold first-letter:text-indigo-600">MNC</span>
        </div>

        <div className="flex items-center gap-3">
          {mainItems.map((item) => (
            <Button
              key={item.name}
              variant={item.isActive ? 'default' : 'secondary'}
              className={cn({ 'pointer-events-none': item.isActive })}
              asChild
            >
              <Link href={item.path}>{item.name}</Link>
            </Button>
          ))}
        </div>

        <div className="ms-auto flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}
