'use client'

import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function GuestProducts({ products }) {
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={`p-4 ${themeClasses.card} rounded shadow`}>
            <h2 className={`text-lg ${themeClasses.fontWeight} ${themeClasses.text}`}>
              {product.name}
            </h2>
            <p className={themeClasses.text}>Price: ${product.price}</p>
            <button className={`p-2 ${themeClasses.button} rounded`}>View Details</button>
          </div>
        ))
      ) : (
        <p className={themeClasses.text}>No products available</p>
      )}
    </div>
  )
}