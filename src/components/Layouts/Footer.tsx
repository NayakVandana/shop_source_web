import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function Footer() {
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return (
    <footer className={`p-4 ${themeClasses.button}`}>
      <div className={`container mx-auto text-center ${themeClasses.text}`}>
        <p>&copy; 2025 ShopSource. All rights reserved.</p>
      </div>
    </footer>
  )
}