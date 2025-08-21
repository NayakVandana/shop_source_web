import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function Header() {
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return (
    <header className={`p-4 ${themeClasses.button}`}>
      <div className="container mx-auto">
        <h1 className={`text-xl ${themeClasses.fontWeight} ${themeClasses.text}`}>ShopSource</h1>
      </div>
    </header>
  )
}