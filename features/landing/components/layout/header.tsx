'use client'

import { ThemeToggle } from '@/components/common/theme-toggle'
import logo from '@/public/logo.png'
import Image from 'next/image'

export default function Header() {
  return (
    <>
      <header className="flex w-full items-center justify-between gap-4 md:gap-6">
        <div className="text-foreground flex items-center gap-2">
          <Image alt="logo" src={logo} className="h-10 w-auto" />
          <span className="text-xl font-semibold first-letter:text-indigo-600">MNC</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}
