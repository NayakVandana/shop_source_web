import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import Provider from '../Providers/ClientProvider'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { ToastContainer } from 'react-toastify'
import authOptions from '../api/auth/[...nextauth]/authOptions'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ThemeWrapper from './ThemeWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s | ShopSource',
    default: 'ShopSource Home',
  },
  description: 'Welcome to ShopSource: Browse our products.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={inter.className}>
        <Provider session={session}>
          <ThemeWrapper>
            <GuestLayout>
              {children}
            </GuestLayout>
          </ThemeWrapper>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  )
}