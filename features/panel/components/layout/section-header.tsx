import { cn } from '@/lib/utils'
import React from 'react'

export type SectionHeaderProps = React.ComponentProps<'div'> & {
  section: string
  action: React.ReactNode
}

export default function SectionHeader({
  className,
  section,
  action,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between gap-4', className)} {...props}>
      <h2 className="text-lg font-medium">{section}</h2>

      <div className="flex items-center gap-3">{action}</div>
    </div>
  )
}
