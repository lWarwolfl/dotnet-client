import { AuthProvider } from '@/components/providers/auth-provider'
import ReactQueryProvider from '@/components/providers/react-query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { privateClient } from '@/features/api/client'
import type { PropsWithChildren } from 'react'

const WrappedProviders = async ({ children }: PropsWithChildren) => {
  const user = (await privateClient.GET('/api/Account/user-info')).data

  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <AuthProvider user={user}>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </ReactQueryProvider>

      <Toaster />
    </ThemeProvider>
  )
}

export default WrappedProviders
