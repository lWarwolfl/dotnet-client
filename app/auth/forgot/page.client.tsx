'use client'

import { SubmitButton } from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForgetPasswordForm } from '@/features/auth/hooks/useForgetPasswordForm'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Controller } from 'react-hook-form'

export function ForgotPageClient() {
  const t = useTranslations('auth.forgot')
  const { form, isResetPasswordPending, onSubmit, sent } = useForgetPasswordForm({})

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>

        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>

      <CardContent>
        {sent ? (
          <p className="text-foreground text-center text-sm">
            {t('sent')}{' '}
            <Button size="sm" variant="link" className="px-0 text-sm">
              <Link href="/admin/signin">{t('back')}</Link>
            </Button>
          </p>
        ) : (
          <form id="forgot-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">{t('email')}</FieldLabel>

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

              <Field>
                <SubmitButton type="submit" loading={isResetPasswordPending}>
                  {t('submit')}
                </SubmitButton>

                <FieldDescription className="text-center">
                  {t('subtitle')} <Link href="/admin/signin">{t('subtitle-link')}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
