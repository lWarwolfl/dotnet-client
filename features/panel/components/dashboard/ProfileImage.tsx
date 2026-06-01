'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { useUpdateUser, useUser, useUserName } from '@/components/providers/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FieldError, FieldLabel } from '@/components/ui/field'
import { privateClientHooks } from '@/features/api/client'
import {
  profileImageSchema,
  ProfileImageSchemaProps,
} from '@/features/panel/schemas/profile-schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ProfileImage() {
  const user = useUser()
  const updateUser = useUpdateUser()
  const userName = useUserName()
  const userNameFallback = useUserName(2)

  const form = useForm<ProfileImageSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(profileImageSchema),
    defaultValues: {
      image: undefined,
    },
  })

  const { mutate, isPending } = privateClientHooks.useMutation('post', '/api/Profiles/update-image')

  function onSubmit({ image }: ProfileImageSchemaProps) {
    if (image) {
      const formData = new FormData()
      formData.append('File', image)

      mutate(
        { body: formData },
        {
          onSuccess: (res) => {
            toast.success('Your avatar is updated successfully')
            if (user) {
              const tempUser = { ...user }
              tempUser.imageUrl = res.url

              updateUser(tempUser)
            }
          },
          onSettled: () => {
            form.reset({ image: undefined })
          },
        }
      )
    } else {
      toast.error('Invalid image')
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar size="3xl">
        <AvatarImage src={user?.imageUrl || ''} alt={userName} />
        <AvatarFallback>{userNameFallback}</AvatarFallback>
      </Avatar>

      <Controller
        name="image"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col items-center">
            <FieldLabel
              htmlFor="image"
              className={cn('cursor-pointer', { 'pointer-events-none': isPending })}
            >
              <SubmitButton className="pointer-events-none" loading={isPending}>
                Update
              </SubmitButton>
            </FieldLabel>

            <input
              className="size-0"
              id="image"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              onChange={(event) => {
                field.onChange(event.target.files![0])
                form.handleSubmit(onSubmit)()
              }}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />
    </div>
  )
}
