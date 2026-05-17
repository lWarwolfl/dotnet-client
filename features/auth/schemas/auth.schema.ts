import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email({ message: 'invalid-email' }),
  password: z
    .string()
    .min(6, { message: 'password-least-6' })
    .regex(/[a-z]/, { message: 'password-least-lowercase' }),
})
export type TSignIn = z.infer<typeof signInSchema>

export const forgetPasswordSchema = z.object({
  email: z.email({ message: 'invalid-email' }),
})
export type TForgetPassword = z.infer<typeof forgetPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'password-least-6' })
      .regex(/[a-z]/, { message: 'password-least-lowercase' }),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'password-match',
    path: ['password_confirm'],
  })

export type TResetPassword = z.infer<typeof resetPasswordSchema>
