'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { privateClientHooks } from '@/features/api/client'
import {
  activityCreateSchema,
  ActivityCreateSchemaProps,
} from '@/features/panel/schemas/activity-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RiAddLine } from '@remixicon/react'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ActivityCreateDrawer() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<ActivityCreateSchemaProps>({
    mode: 'onSubmit',
    resolver: zodResolver(activityCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      city: '',
      date: new Date(),
      venue: '',
    },
  })

  const { mutate: mutateCreateActivity, isPending: isPendingCreateActivity } =
    privateClientHooks.useMutation('post', '/api/Activities')

  function onSubmit(values: ActivityCreateSchemaProps) {
    const { date, ...rest } = values

    mutateCreateActivity(
      { body: { date: date.toISOString(), ...rest } },
      {
        onSuccess: () => {
          toast.success('Activity created successfully.')

          setOpen(false)
          form.reset(form.formState.defaultValues)
          queryClient.invalidateQueries({
            refetchType: 'all',
            ...privateClientHooks.queryOptions('get', '/api/Activities'),
          })
        },
      }
    )
  }

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Button>
          Create activity <RiAddLine className="size-4.5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new activity</DrawerTitle>
          <DrawerDescription>All fields are mandatory</DrawerDescription>
        </DrawerHeader>

        <form
          id="activity-create-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-h-60dvh mx-auto w-full max-w-3xl overflow-x-visible overflow-y-auto pe-2"
        >
          <FieldGroup className="max-h-[75vh] overflow-y-auto px-3 py-1.5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>

                  <Input
                    {...field}
                    id="title"
                    type="text"
                    placeholder="The great plan"
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field: { ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {['travel', 'music', 'food', 'film', 'drinks', 'culture'].map((item) => (
                        <SelectItem key={item} value={item} className="capitalize">
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>

                  <Textarea
                    {...field}
                    id="description"
                    autoComplete="off"
                    placeholder="So here goes the details..."
                    required
                    rows={5}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="city">City</FieldLabel>

                  <Input
                    {...field}
                    id="city"
                    type="text"
                    placeholder="London"
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="venue"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="venue">Venue</FieldLabel>

                  <Input
                    {...field}
                    id="venue"
                    type="text"
                    placeholder="Pink Cafe"
                    required
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="date">Date</FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        {...field}
                        value={field.value ? format(field.value, 'dd MMM, yyyy') : undefined}
                        id="date"
                        type="text"
                        placeholder="Choose a date"
                        required
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        readOnly
                      />
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DrawerFooter className="mx-auto max-w-3xl max-sm:w-full sm:flex-row">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>

          <SubmitButton onClick={form.handleSubmit(onSubmit)} loading={isPendingCreateActivity}>
            Create now
          </SubmitButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
