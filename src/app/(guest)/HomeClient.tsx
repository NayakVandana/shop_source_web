'use client'

import { useEffect } from 'react'
import GuestProducts from '@/ui/guest/products/products'
import { useProductsStore } from '@/ui/guest/products/useProductsStore'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function HomeClient() {
  const { products, getProducts } = useProductsStore()
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  useEffect(() => {
    getProducts({}, {
      success: () => {},
      error: (response) => {}
    })
  }, [getProducts])

  return (
    <div className={`container mx-auto p-4 ${themeClasses.background} ${themeClasses.text}`}>
      <h1 className={`text-3xl ${themeClasses.fontWeight} mb-4`}>Welcome to ShopSource</h1>
      <GuestProducts products={products} />
    </div>
  )
}