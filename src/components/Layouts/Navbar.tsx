

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'
import { isLoggedin } from "@/utils/isLoggedin";

export default async function Navbar() {

  const { theme, toggleTheme } = useThemeStore()
  const themeClasses = themeConfig[theme];
const isLogin = await isLoggedin();
  return (
    <nav className={`p-4 ${themeClasses.background}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className={`text-xl ${themeClasses.fontWeight} ${themeClasses.text}`}>ShopSource</Link>
        <div className="space-x-4 flex items-center">
          <Link href="/guest-products" className={themeClasses.text}>Products</Link>
          <Link href="/contact-us" className={themeClasses.text}>Contact Us</Link>
          {isLogin ? (
            <>
              <Link href="/user-products" className={themeClasses.text}>My Products</Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`p-2 ${themeClasses.button} rounded`}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={`p-2 ${themeClasses.button} rounded`}>Login</Link>
          )}
          <button
            onClick={toggleTheme}
            className={`p-2 ${themeClasses.button} rounded`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </nav>
  )
}