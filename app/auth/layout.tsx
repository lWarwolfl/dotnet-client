import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="text-foreground flex items-center justify-center gap-1.5">
          <Image alt="logo" src={logo} className="h-9 w-auto" />

          <span className="first-letter:text-primary text-base font-semibold">
            My Next.js Client
          </span>
        </Link>

        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  )
}
