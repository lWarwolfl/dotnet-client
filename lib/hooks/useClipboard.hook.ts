import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function useCopyToClipboard() {
  const t = useTranslations('global.toast')

  function copy(value: string) {
    navigator.clipboard.writeText(value)

    toast.success(t('copied'))
  }

  return { copy }
}
