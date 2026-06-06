'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { useUser } from '@/components/providers/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { privateClientHooks } from '@/features/api/client'
import { ActivityType, CommentType, ProfileType } from '@/features/api/types/entities'
import { getUsername } from '@/features/auth/utils'
import { commentSchema, CommentSchemaProps } from '@/features/landing/schemas/comment-schema'
import { useSignalR } from '@/features/signalr/useSignalR'
import { getErrorMessage } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { RiBuildingLine, RiStoreLine } from '@remixicon/react'
import { useQueryClient } from '@tanstack/react-query'
import { format, formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export type ActivityContentProps = React.ComponentProps<'div'> & {
  data: ActivityType
}

export default function ActivityContent({ data }: ActivityContentProps) {
  const image_url = `/categories/${data.category}.jpg`
  const userId = useUser()?.id
  const host = data.attendees?.find((item) => item.id === data.hostId)
  const isHost = userId === data.hostId
  const isCancelled = data.isCancelled
  const isAttending = data.attendees?.findIndex((item) => item.id === userId) !== -1
  const buttonText = isHost
    ? isCancelled
      ? 'Activate'
      : 'Cancel'
    : isAttending
      ? 'Leave'
      : 'Attend'

  const { mutate, isPending } = privateClientHooks.useMutation(
    'post',
    '/api/Activities/{id}/attend'
  )
  const queryClient = useQueryClient()

  function onSubmit() {
    mutate(
      { params: { path: { id: data.id } } },
      {
        onSuccess: () => {
          if (isHost) {
            if (isCancelled) toast.success('Activity is now available again')
            else toast.success('Activity is now cancelled')
          } else {
            if (isAttending) toast.success('Opted out of this activity')
            else toast.success('Successfully attended this activity')
          }

          queryClient.invalidateQueries({
            queryKey: privateClientHooks.queryOptions('get', '/api/Activities/{id}', {
              params: { path: { id: data.id } },
            }).queryKey,
          })
        },
      }
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Image
        alt={data.title || 'Activity Image'}
        width={600}
        height={600}
        src={image_url}
        className="h-70 w-full max-w-3xl object-cover object-center"
      />

      <p>{data.title}</p>

      {data.date ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-muted-foreground text-sm">{format(data.date, 'dd MMM, yyyy')}</span>
          <span className="text-muted-foreground text-sm">
            , {formatDistanceToNow(data.date, { addSuffix: true })}
          </span>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-3">
          <RiBuildingLine className="size-5 shrink-0" />

          {data.city}
        </div>

        <div className="flex items-center gap-3">
          <RiStoreLine className="size-5 shrink-0" />

          {data.venue}
        </div>
      </div>

      <p>{data.description}</p>

      <span>Host</span>

      {host ? <ActivityContent.Attendee data={host} /> : null}

      <span>Attendee List</span>

      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {data.attendees?.map((item) => {
          return <ActivityContent.Attendee key={item.id} data={item} />
        })}
      </div>

      <SubmitButton loading={isPending} onClick={() => onSubmit()}>
        {buttonText}
      </SubmitButton>

      <span>Comments</span>

      {data.id ? <ActivityContent.Comments activityId={data.id} /> : null}
    </div>
  )
}

ActivityContent.Attendee = function Attendee({ data }: { data: ProfileType }) {
  const userName = getUsername(data)
  const userNameFallback = getUsername(data, 2)

  return (
    <Link
      href={`/user/${data.id}`}
      target="_blank"
      className="flex cursor-pointer items-center gap-2"
    >
      <Avatar>
        <AvatarImage src={data.imageUrl || ''} alt={userName} />
        <AvatarFallback>{userNameFallback}</AvatarFallback>
      </Avatar>

      {userName}
    </Link>
  )
}

ActivityContent.Comments = function Comments({ activityId }: { activityId: string }) {
  const [comments, setComments] = useState<CommentType[]>([])

  const connection = useSignalR(activityId, {
    LoadComments: (loadedComments: CommentType[]) => {
      setComments(loadedComments)
    },
    ReceiveComment: (comment: CommentType) => {
      setComments((prev) => [comment, ...prev])
    },
  })

  const form = useForm<CommentSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: '',
    },
  })

  const sendCommentToServer = async (values: CommentSchemaProps) => {
    if (connection && connection.state === 'Connected') {
      try {
        await connection.invoke('SendComment', {
          createCommentDto: {
            activityId,
            body: values.body,
          },
        })
        form.reset()
      } catch (err) {
        toast.error(`Error sending message: ${getErrorMessage(err)}`)
      }
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-4">
      <form
        id="comment-form"
        className="flex w-full flex-col items-center gap-4"
        onSubmit={form.handleSubmit(sendCommentToServer)}
      >
        <FieldGroup className="flex w-full flex-col items-center gap-4">
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="body">Comment</FieldLabel>

                <Textarea
                  {...field}
                  id="body"
                  placeholder="Your message..."
                  required
                  autoComplete="off"
                  rows={7}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <SubmitButton>Send</SubmitButton>
        </FieldGroup>
      </form>

      <div className="flex w-full flex-col gap-4">
        {comments.map((comment) => (
          <ActivityContent.Comment key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  )
}

ActivityContent.Comment = function Comment({ data }: { data: CommentType }) {
  return (
    <div className="bg-muted text-muted-foreground flex w-full flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ActivityContent.Attendee data={data} />

        <span className="text-muted-foreground text-sm">
          {data.createdAt ? formatDistanceToNow(data.createdAt, { addSuffix: true }) : null}
        </span>
      </div>

      {data.body}
    </div>
  )
}
