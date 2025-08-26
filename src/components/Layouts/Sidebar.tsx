'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function Sidebar() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return (
    <aside className={`w-64 p-4 ${themeClasses.card}`}>
      <ul className="space-y-2">
        {isAdmin && (
          <li>
            <Link
              href="/admin-products"
              className={`block p-2 hover:${themeClasses.button} rounded ${themeClasses.text}`}
            >
              Manage Products
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/user-products"
            className={`block p-2 hover:${themeClasses.button} rounded ${themeClasses.text}`}
          >
            My Products
          </Link>
        </li>
      </ul>
    </aside>
  )
}