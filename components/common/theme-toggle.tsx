'use client'

import { LineMdMoonToSunnyOutlineLoopTransition } from '@/components/icon/LineMdMoonToSunnyOutlineLoopTransition'
import { LineMdSunnyOutlineToMoonAltLoopTransition } from '@/components/icon/LineMdSunnyOutlineToMoonAltLoopTransition'
import { Button } from '@/components/ui/button'
import { useTheme } from '@teispace/next-themes'

export type ThemeToggleProps = React.ComponentProps<typeof Button>

export function ThemeToggle({ ...props }: ThemeToggleProps) {
  const { setTheme, systemTheme, theme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  function switchTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button variant="outline" size="icon" onClick={() => switchTheme()} {...props}>
      {currentTheme === 'dark' ? (
        <LineMdSunnyOutlineToMoonAltLoopTransition key={currentTheme} className="size-5" />
      ) : (
        <LineMdMoonToSunnyOutlineLoopTransition key={currentTheme} className="size-5" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
