'use client'

import { Badge } from '@/components/ui/badge'
import { ActivityType } from '@/features/api/types/entities'
import { cn } from '@/lib/utils'
import { RiBuildingLine, RiStoreLine } from '@remixicon/react'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export type ActivityCardProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  data: ActivityType
  href?: string
}

export default function ActivityCard({ data, className, href, ...props }: ActivityCardProps) {
  const image_url = `/categories/${data.category}.jpg`
  const link = href ? href : `/activity/${data.id}`

  return (
    <Link
      href={link}
      className={cn(
        'bg-card group ring-border hover:bg-muted flex w-full flex-col items-start gap-4 rounded-lg p-4 ring transition-colors ring-inset',
        className
      )}
      {...props}
    >
      <Image
        alt={data.title || 'Activity Image'}
        width={600}
        height={600}
        src={image_url}
        className="h-50 w-auto rounded-md object-cover object-center"
      />

      <div className="flex flex-col gap-3 underline-offset-2">
        <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-lg font-medium">
          <span className="group-hover:underline">
            {data.title}{' '}
            {data.date ? (
              <span className="text-muted-foreground text-sm">
                {format(data.date, 'dd MMM, yyyy')}
              </span>
            ) : null}
          </span>

          <Badge>
            {data.city}

            <RiBuildingLine className="size-7 shrink-0" />
          </Badge>

          <Badge className="h-fit whitespace-break-spaces" variant="outline">
            {data.venue}

            <RiStoreLine className="size-7 shrink-0" />
          </Badge>
        </h3>

        <p className="line-clamp-2 text-sm">{data.description}</p>
      </div>
    </Link>
  )
}
