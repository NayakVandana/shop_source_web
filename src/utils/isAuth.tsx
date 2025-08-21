import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'

export async function isAuth() {
  const session = await getServerSession(authOptions)
  return !!session
}