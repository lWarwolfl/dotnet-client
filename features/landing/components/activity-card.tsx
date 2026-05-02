'use client'

import { Badge } from '@/components/ui/badge'
import { ActivityType } from '@/features/api/types/entities'
import { cn } from '@/lib/utils'
import { RiBuildingLine, RiStoreLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

export type ActivityCardProps = React.ComponentProps<'div'> & {
  data: ActivityType
  body?: boolean
}

export default function ActivityCard({ data, className, body, ...props }: ActivityCardProps) {
  const image_url = `/categories/${data.category}.jpg`

  return (
    <div
      className={cn(
        'bg-card ring-border hover:bg-muted flex w-full flex-wrap items-start gap-4 rounded-lg p-4 ring transition-colors ring-inset',
        className
      )}
      {...props}
    >
      {body ? (
        <>
          <div className="group flex items-start gap-4 pe-3 underline-offset-2 md:items-center">
            <Image
              alt={data.title}
              width={200}
              height={200}
              src={image_url}
              className="size-16 rounded-md object-cover object-center"
            />

            <ActivityCard.Content data={data} />
          </div>

          <div
            className="prose max-h-[46dvh] basis-full overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: data.description || '' }}
          />
        </>
      ) : (
        <>
          <Image
            alt={data.title}
            width={200}
            height={200}
            src={image_url}
            className="size-16 rounded-md object-cover object-center"
          />

          <Link
            href={`/activity/${data.id}`}
            className="group flex flex-col gap-1 underline-offset-2"
          >
            <ActivityCard.Content data={data} />

            <p className="line-clamp-2 text-sm group-hover:underline">{data.description}</p>
          </Link>
        </>
      )}
    </div>
  )
}

ActivityCard.Content = function Content({ data }: { data: ActivityType }) {
  return (
    <h3 className="flex flex-wrap items-center gap-3 text-lg font-medium">
      <span className="group-hover:underline">{data.title}</span>

      <Badge>
        {data.city}

        <RiBuildingLine />
      </Badge>

      <Badge variant="outline">
        {data.venue}

        <RiStoreLine />
      </Badge>
    </h3>
  )
}
