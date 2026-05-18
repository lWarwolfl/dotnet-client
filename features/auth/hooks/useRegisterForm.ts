import { authHooks } from '@/features/auth/hooks/auth.hook'
import { type TRegister, registerSchema } from '@/features/auth/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type TUseRegisterFormProps = { defaultEmail?: string; onSuccess?: () => void }
export const useRegisterForm = (props?: TUseRegisterFormProps) => {
  const { defaultEmail, onSuccess } = props || {}
  const [authorized, setAuthorized] = useState(false)
  const { register, isPending: isPendingRegister } = authHooks.useRegister()

  const form = useForm<TRegister>({
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: defaultEmail || '',
      password: '',
    },
  })

  function onSubmit(data: TRegister) {
    register(
      {
        body: { email: data.email, password: data.password },
      },
      {
        onSuccess: () => {
          setAuthorized(true)
          onSuccess?.()
        },
      }
    )
  }

  const isAuthPending = isPendingRegister || authorized

  return {
    form,
    onSubmit,
    isAuthPending,
  }
}
