import { authHooks } from '@/features/auth/hooks/auth.hook'
import { forgetPasswordSchema, type TForgetPassword } from '@/features/auth/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TUseForgetPasswordFormProps = { onSuccess?: () => void }

export const useForgetPasswordForm = ({ onSuccess }: TUseForgetPasswordFormProps) => {
  const [sent, setSent] = useState(false)
  const { resetPasswordForEmail, isPending: isResetPasswordPending } =
    authHooks.useResetPasswordForEmail()

  const form = useForm<TForgetPassword>({
    mode: 'onSubmit',
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: TForgetPassword) {
    resetPasswordForEmail(data.email, {
      onSuccess: ({ data }) => {
        if (data) {
          setSent(true)
          onSuccess?.()
        }
      },
    })
  }

  return { form, isResetPasswordPending, onSubmit, sent }
}
