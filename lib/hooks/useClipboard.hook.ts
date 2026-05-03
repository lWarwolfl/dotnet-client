import { toast } from 'sonner'

export function useCopyToClipboard() {
  function copy(value: string) {
    navigator.clipboard.writeText(value)

    toast.success("Copied to your clipboard!")
  }

  return { copy }
}
