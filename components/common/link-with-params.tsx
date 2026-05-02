'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { ComponentProps } from 'react'

export type LinkWithParamsProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export function LinkWithParams({ href, ...props }: LinkWithParamsProps) {
  const searchParams = useSearchParams()

  const getHrefWithParams = () => {
    if (!searchParams.toString()) {
      return href
    }

    const [pathname, existingSearch] = href.split('?')
    const newParams = new URLSearchParams(existingSearch)

    searchParams.forEach((value, key) => {
      if (!newParams.has(key)) {
        newParams.set(key, value)
      }
    })

    const queryString = newParams.toString()
    return queryString ? `${pathname}?${queryString}` : pathname
  }

  return <Link href={getHrefWithParams()} {...props} />
}
