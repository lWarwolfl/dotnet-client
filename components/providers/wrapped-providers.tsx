import ReactQueryProvider from '@/components/providers/react-query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { PropsWithChildren } from 'react'

const WrappedProviders = async ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>

      <Toaster />
    </ThemeProvider>
  )
}

export default WrappedProviders
