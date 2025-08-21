'use client'


import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'
import Navbar from './Navbar'
import Footer from './Footer'

export default function GuestLayout({ children }) {
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return (
    <div className={`flex flex-col min-h-screen ${themeClasses.background}`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}