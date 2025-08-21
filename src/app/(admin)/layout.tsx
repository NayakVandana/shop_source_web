import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import Provider from '../Providers/ClientProvider'
import ThemeProvider from '../Providers/ThemeProvider'
import { isLoggedin } from '@/utils/isLoggedin'
import { ToastContainer } from 'react-toastify'
import { redirect } from 'next/navigation'
import authOptions from '../api/auth/[...nextauth]/authOptions'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import AdminLayout from '@/components/Layouts/AdminLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShopSource Admin',
  description: 'Admin Dashboard for ShopSource',
}

export default async function RootLayout({ children }) {
  let isLogin = await isLoggedin()
  if (!isLogin) {
    return redirect('/login')
  }

  const cookieStore = cookies()
  const adminAuth = cookieStore.get('admin-auth')
  if (!adminAuth) {
    return redirect('/login')
  }

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <ThemeProvider>
            <AdminLayout>
              {children}
            </AdminLayout>
          </ThemeProvider>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  )
}