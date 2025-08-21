import { redirect } from 'next/navigation'
import { isLoggedin } from '@/utils/isLoggedin'
import HomeClient from './HomeClient'

export default async function Home() {
  const isLogin = await isLoggedin()
  if (isLogin) {
    redirect('/user-products')
  }

  return <HomeClient />
}