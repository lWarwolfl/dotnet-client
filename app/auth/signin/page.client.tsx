'use client'

import { StyledLink } from '@/components/common/styled-link'
import { SubmitButton } from '@/components/common/submit-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useSignInForm } from '@/features/auth/hooks/useSignInForm'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'
import { toast } from 'sonner'

export function SignInPageClient() {
  const router = useRouter()

  const { form, isAuthPending, onSubmit } = useSignInForm({
    onSuccess: () => {
      toast.success('Welcome dear user! redirecting now')

      router.push('/')
    },
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Sign in</CardTitle>

        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Field>
              <SubmitButton type="submit" loading={isAuthPending}>
                Sign in
              </SubmitButton>

              <FieldDescription className="flex flex-col items-center gap-3">
                <span>
                  Forgot your password? <StyledLink href="/auth/forgot">Reset here</StyledLink>
                </span>

                <span>
                  Haven&apos;t created an account yet?{' '}
                  <StyledLink href="/auth/register">Register now</StyledLink>
                </span>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
