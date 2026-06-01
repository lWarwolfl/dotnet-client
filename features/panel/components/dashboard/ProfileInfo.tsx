'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { useUpdateUser, useUser } from '@/components/providers/auth-provider'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { privateClientHooks } from '@/features/api/client'
import { profileInfoSchema, ProfileInfoSchemaProps } from '@/features/panel/schemas/profile-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ProfileInfo() {
  const user = useUser()
  const updateUser = useUpdateUser()

  const form = useForm<ProfileInfoSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      name: user?.displayName || undefined,
      bio: user?.bio || undefined,
    },
  })

  const { mutate, isPending } = privateClientHooks.useMutation('put', '/api/Profiles')

  function onSubmit(values: ProfileInfoSchemaProps) {
    mutate(
      { body: { displayName: values.name, bio: values.bio } },
      {
        onSuccess: () => {
          toast.success('Profile info updated successfully')

          if (user) {
            const tempUser = { ...user }
            tempUser.displayName = values.name
            tempUser.bio = values.bio

            updateUser(tempUser)
          }
        },
      }
    )
  }

  return (
    <form
      id="activity-update-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col items-center gap-4"
    >
      <FieldGroup className="px-3 py-1.5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>

              <Input
                {...field}
                id="name"
                type="text"
                placeholder="ex. John"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Bio</FieldLabel>

              <Textarea
                {...field}
                id="bio"
                placeholder="ex. Art lover ..."
                rows={7}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPending}>
          Save
        </SubmitButton>
      </FieldGroup>
    </form>
  )
}
