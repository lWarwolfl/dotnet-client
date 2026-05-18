'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { SubmitButton } from '@/components/common/submit-button'
import { authHooks } from '@/features/auth/hooks/auth.hook'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import { toast } from 'sonner'

export default function Logout({ children }: PropsWithChildren) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { logout, isPending } = authHooks.useLogout()

  function onSubmit() {
    logout(
      {},
      {
        onSuccess: () => {
          toast.success('Successfully logged out! redirecting')

          router.push('/auth/signin')
        },
      }
    )
  }

  return (
    <ResponsiveDialog
      title="Logout"
      description="Are you sure?"
      trigger={children}
      action={
        <SubmitButton onClick={() => onSubmit()} loading={isPending} variant="destructive">
          Logout now
        </SubmitButton>
      }
      open={open}
      setOpen={setOpen}
    />
  )
}
