'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ComponentProps } from 'react'

export type StyledLinkProps = ComponentProps<typeof Link>

export function StyledLink({ className, ...props }: StyledLinkProps) {
  return (
    <Link {...props} className={cn(className, 'text-primary underline-offset-2 hover:underline')} />
  )
}
