'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/utils/useThemeStore'

export default function ThemeProvider({ children }) {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}