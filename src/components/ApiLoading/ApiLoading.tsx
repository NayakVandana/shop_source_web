'use client'

import { memo } from 'react'
import { useApiLoadingStore } from './ApiLoadingStore'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

interface LoaderProps {
  isLoading: boolean
  loadingText?: string
}

const _Loader = ({ isLoading, loadingText }: LoaderProps) => {
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return isLoading ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10000000 }}>
      <div className={`p-4 rounded-xl flex flex-col justify-center items-center ${themeClasses.card}`}>
        <span className={`animate-spin h-8 w-8 border-4 border-t-transparent border-${themeClasses.primary} rounded-full m-3`}></span>
        <span className={`font-semibold text-sm ${themeClasses.text}`}>
          {loadingText || 'Please wait...'}
        </span>
      </div>
    </div>
  ) : null
}

const Loader = memo(_Loader)

const ApiLoading = () => {
  const { isLoading, loadingText } = useApiLoadingStore()
  return <Loader isLoading={isLoading} loadingText={loadingText} />
}

export default ApiLoading