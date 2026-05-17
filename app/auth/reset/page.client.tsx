'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useResetPasswordForm } from '@/features/auth/hooks/useResetPasswordForm'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'
import { toast } from 'sonner'

export function ResetPageClient() {
  const t = useTranslations('auth.reset')

  const router = useRouter()
  const { form, onSubmit, isChangePasswordPending } = useResetPasswordForm({
    onSuccess: () => {
      toast.success(t('set'))

      router.push('/admin/dashboard')
    },
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>

        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="reset-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">{t('password')}</FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••"
                    required
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password_confirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password_confirm">{t('confirm-password')}</FieldLabel>

                  <Input
                    {...field}
                    id="password_confirm"
                    type="password"
                    placeholder="••••••"
                    required
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Field>
              <SubmitButton type="submit" loading={isChangePasswordPending}>
                {t('submit')}
              </SubmitButton>

              <FieldDescription className="text-center">
                {t('subtitle')} <Link href="/admin/signin">{t('subtitle-link')}</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
