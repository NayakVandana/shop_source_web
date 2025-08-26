'use client'

import { useEffect } from 'react'
import { useProductsStore } from '@/ui/user/products/useProductsStore'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'
import UserProducts from '@/ui/user/products/products'

export default function UserProductsPage() {
  const { products, getProducts } = useProductsStore()
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  useEffect(() => {
    getProducts({}, {
      success: () => {},
      error: (response) => {}
    })
  }, [getProducts]);
  console.log("getProducts",products);

  return (
    <div className={`container mx-auto p-4 ${themeClasses.background} ${themeClasses.text}`}>
      <h1 className={`text-2xl ${themeClasses.fontWeight} mb-4`}>User Products</h1>
      <UserProducts products={products} />
    </div>
  )
}