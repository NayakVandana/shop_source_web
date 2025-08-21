'use client'

import { useProductsStore } from './useProductsStore'
import { useThemeStore } from '@/utils/useThemeStore'
import { themeConfig } from '@/utils/themeConfig'

export default function AdminProducts({ products }) {
  const { addProduct } = useProductsStore()
  const { theme } = useThemeStore()
  const themeClasses = themeConfig[theme]

  const handleAddProduct = async () => {
    const newProduct = { name: 'New Product', price: 0 }
    await addProduct(newProduct, {
      success: () => {},
      error: (response) => {}
    })
  }

  return (
    <div>
      <button
        onClick={handleAddProduct}
        className={`p-2 ${themeClasses.button} rounded mb-4`}
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className={`p-4 ${themeClasses.card} rounded shadow`}>
            <h2 className={`text-lg ${themeClasses.fontWeight} ${themeClasses.text}`}>
              {product.name}
            </h2>
            <p className={themeClasses.text}>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}