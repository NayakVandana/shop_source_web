'use client'

import { useEffect } from 'react'
import { useProductsStore } from '@/ui/admin/products/useProductsStore'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'
import AdminProducts from '@/ui/admin/products/products'

export default function AdminProductsPage() {
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
      <h1 className={`text-2xl ${themeClasses.fontWeight} mb-4`}>Admin Products</h1>
      <AdminProducts products={products} />
    </div>
  )
}