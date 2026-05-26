import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export type LoadingSectionProps = ComponentProps<'div'> & { isFetching?: boolean }

export default function LoadingSection({
  children,
  isFetching,
  className,
  ...props
}: LoadingSectionProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      {isFetching ? (
        <div className="w-full text-center">Loading...</div>
      ) : children ? (
        children
      ) : (
        <div className="w-full text-center">Failed to fetch</div>
      )}
    </div>
  )
}
