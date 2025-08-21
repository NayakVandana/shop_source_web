'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

const AppLayout = dynamic(() => import('@/components/Layouts/AppLayout'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
})

const GuestLayout = dynamic(() => import('@/components/Layouts/GuestLayout'), {
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
  ssr: false
})

const NotFound = memo(() => {
  const { status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  const Container = useMemo(() => {
    return isLoggedIn ? AppLayout : GuestLayout
  }, [isLoggedIn])

  const linkHref = useMemo(() => {
    return isLoggedIn ? '/user-products' : '/'
  }, [isLoggedIn])

  const linkText = useMemo(() => {
    return `Go back to ${isLoggedIn ? 'Dashboard' : 'Home'}`
  }, [isLoggedIn])

  console.log(themeClasses,"themeClasses");
  return (
    <Container>
      <div className={isLoggedIn ? 'h-4/5' : 'h-screen'}>
        <div className={`flex flex-col items-center justify-center w-full h-full ${themeClasses.background} ${themeClasses.text}`}>
          <h1 className={`text-9xl text-blue-500 ${themeClasses.fontWeight}`}>404</h1>
          <h1 className={`text-3xl ${themeClasses.fontWeight}`}>Oops! Page Not Found!</h1>
          <h2 className="mt-5">The page you are looking for does not exist.</h2>
          <Link
            className={`mt-5 p-2 ${themeClasses.button} rounded`}
            href={linkHref}
            prefetch={false}
          >
            {linkText}
          </Link>
        </div>
      </div>
    </Container>
  )
})

NotFound.displayName = 'NotFound'

export default NotFound