'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { PropsWithChildren, useState } from 'react'

export default function Logout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  function onSubmit() {}

  return (
    <ResponsiveDialog
      title="Logout"
      description="Are you sure?"
      trigger={children}
      action={
        <SubmitButton onClick={() => onSubmit()} variant="destructive">
          Logout now
        </SubmitButton>
      }
      open={open}
      setOpen={setOpen}
    />
  )
}
