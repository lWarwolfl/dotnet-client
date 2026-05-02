'use client'

import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-4 max-sm:flex-col">
      <Image alt="logo" src={logo} className="h-8 w-auto" />

      <div className="text-foreground flex items-center">
        <Link
          href="https://github.com/lWarwolfl/dotnet-client"
          target="_blank"
          className="hover:text-muted-foreground underline underline-offset-4 first-letter:text-indigo-600"
        >
          My Next.js Client
        </Link>

        <span className="ml-1.5"> © 2025</span>
      </div>

      <div className="text-foreground">+</div>

      <div className="text-foreground flex items-center">
        <Link
          href="https://github.com/lWarwolfl/dotnet"
          target="_blank"
          className="hover:text-muted-foreground underline underline-offset-4 first-letter:text-indigo-600"
        >
          My DotNet API
        </Link>
      </div>
    </footer>
  )
}
