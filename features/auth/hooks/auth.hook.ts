import { publicClientHooks } from '@/features/api/client'

function useSignIn() {
  const { mutate: signIn, ...rest } = publicClientHooks.useMutation('post', '/api/login')

  return { signIn, ...rest }
}

function useSignOut() {
  const { mutate: signOut, ...rest } = publicClientHooks.useMutation('post', '/api/Account/logout')

  return { signOut, ...rest }
}

function useForgotPassword() {
  const { mutate: resetPasswordForEmail, ...rest } = publicClientHooks.useMutation(
    'post',
    '/api/forgotPassword'
  )

  return { resetPasswordForEmail, ...rest }
}

function useResetPassword() {
  const { mutate: resetPassword, ...rest } = publicClientHooks.useMutation(
    'post',
    '/api/resetPassword'
  )

  return { resetPassword, ...rest }
}

export const authHooks = {
  useSignIn,
  useSignOut,
  useForgotPassword,
  useResetPassword,
}
