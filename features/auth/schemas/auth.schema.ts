import { z } from 'zod'

const emailValidation = z.email({ message: 'Please enter a valid email address' })

const passwordValidation = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' })

export const signInSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, { message: 'Password is required' }),
})
export type TSignIn = z.infer<typeof signInSchema>

export const registerSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
})
export type TRegister = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: emailValidation,
})
export type TForgotPassword = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    password_confirm: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Passwords do not match',
    path: ['password_confirm'],
  })

export type TResetPassword = z.infer<typeof resetPasswordSchema>
