import { Inter } from 'next/font/google'
import '../globals.css'
import Provider from '../Providers/ClientProvider'
import ThemeProvider from '../Providers/ThemeProvider'
import { getServerSession } from 'next-auth'
import authOptions from '../api/auth/[...nextauth]/authOptions'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShopSource Not Found',
  description: 'Page not found in ShopSource',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}