'use client'

import { useEffect } from 'react'
import { useProductsStore } from '@/ui/guest/products/useProductsStore'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'
import GuestProducts from '@/ui/guest/products/products'

export default function GuestProductsPage() {
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
      <h1 className={`text-2xl ${themeClasses.fontWeight} mb-4`}>Browse Products</h1>
      <GuestProducts products={products} />
    </div>
  )
}