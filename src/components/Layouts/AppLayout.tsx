import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function AppLayout({ children }) {
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return (
    <div className={`flex flex-col min-h-screen ${themeClasses.background}`}>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className={`flex-1 p-4 ${themeClasses.card}`}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}