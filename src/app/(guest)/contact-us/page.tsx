'use client'

import { useState } from 'react'
import { toast } from '@/utils/toast'
import apiCall from '@/utils/apiCall'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function ContactUsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await apiCall('contact-us', { name, email, message }, { method: 'POST' })
    const responseData = handleResponse(response)
    if (responseData.status) {
      toast({ message: 'Message sent successfully!' })
      setName('')
      setEmail('')
      setMessage('')
    } else {
      toast({ message: responseData.message || 'Failed to send message' })
    }
  }

  return (
    <div className={`container mx-auto p-4 ${themeClasses.background} ${themeClasses.text}`}>
      <h1 className={`text-2xl ${themeClasses.fontWeight} mb-4`}>Contact Us</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className={`block text-sm ${themeClasses.fontWeight} mb-2`}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border ${themeClasses.buttonBorder} rounded ${themeClasses.text}`}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className={`block text-sm ${themeClasses.fontWeight} mb-2`}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-2 border ${themeClasses.buttonBorder} rounded ${themeClasses.text}`}
            required
          />
        </div>
        <button type="submit" className={`w-full p-2 ${themeClasses.button} rounded`}>
          Send Message
        </button>
      </form>
    </div>
  )
}