'use client'
import Navbar from './Navbar'
import Footer from './Footer'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function UserLayout({ children }) {
  const { theme } = useThemeStore();
  const themeClasses = themeConfig[theme]

  return (
    <div className={`flex flex-col min-h-screen ${themeClasses.background}`}>
      <Navbar />
      <main className={`flex-1 p-4 ${themeClasses.card}`}>{children}</main>
      <Footer />
    </div>
  )
}