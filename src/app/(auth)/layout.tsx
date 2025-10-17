import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import Provider from '../Providers/ClientProvider'
import ThemeProvider from '../Providers/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import authOptions from '../api/auth/[...nextauth]/authOptions'
import Head from 'next/head'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShopSource Auth',
  description: 'Authentication for ShopSource',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <SpeedInsights />
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>
        <Provider session={session}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  )
}