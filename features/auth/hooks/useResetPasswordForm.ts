import { authHooks } from '@/features/auth/hooks/auth.hook'
import { resetPasswordSchema, type TResetPassword } from '@/features/auth/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type TUseResetPasswordFormProps = { onSuccess?: () => void }

export const useResetPasswordForm = ({ onSuccess }: TUseResetPasswordFormProps) => {
  const { updateUser, isPending: isChangePasswordPending } = authHooks.useUpdateUser()

  const form = useForm<TResetPassword>({
    mode: 'onSubmit',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      password_confirm: '',
    },
  })

  function onSubmit(data: TResetPassword) {
    updateUser(data, {
      onSuccess: ({ data }) => {
        if (data) {
          onSuccess?.()
        }
      },
    })
  }

  return { form, isChangePasswordPending, onSubmit }
}
