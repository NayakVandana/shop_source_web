import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'

export async function isLoggedin() {
  const session = await getServerSession(authOptions)
  return !!session
}