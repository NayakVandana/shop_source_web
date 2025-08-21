'use client'

import { useState,useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'
import { toast } from '@/utils/toast'
import { useAuthStore } from "./authStore";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

   const  logout = useAuthStore(state => state.logout);

    useEffect(() => { 
            logout(); 
    }, [logout])



  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      toast({ message: result.error })
    } else {
      router.push('/user-products')
    }
  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
      <div className={`w-full max-w-md p-8 ${themeClasses.card} rounded shadow`}>
        <h2 className={`text-2xl ${themeClasses.fontWeight} mb-6 text-center`}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm ${themeClasses.fontWeight} mb-2`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border ${themeClasses.buttonBorder} rounded ${themeClasses.text}`}
              required
            />
          </div>
          <div className="mb-6">
            <label className={`block text-sm ${themeClasses.fontWeight} mb-2`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border ${themeClasses.buttonBorder} rounded ${themeClasses.text}`}
              required
            />
          </div>
          <button type="submit" className={`w-full p-2 ${themeClasses.button} rounded`}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}