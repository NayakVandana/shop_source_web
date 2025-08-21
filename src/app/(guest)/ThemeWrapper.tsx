'use client'

import { useThemeStore } from '@/utils/useThemeStore'

export default function ThemeWrapper({ children }) {
  const { theme } = useThemeStore()

  return (
    <div data-theme={theme}>
      {children}
    </div>
  )
}