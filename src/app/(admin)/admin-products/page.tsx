'use client';

import { useEffect } from 'react';
import { useProductsStore } from '@/ui/guest/products/useProductsStore';
import { useThemeStore } from '@/utils/useThemeStore';
import { themeConfig } from '@/utils/themeConfig';
import GuestProducts from '@/ui/guest/products/products';

export default function AdminProductsPage() {
  const { products, getProducts } = useProductsStore();
  const { theme } = useThemeStore();
  const themeClasses = themeConfig[theme];

  useEffect(() => {
    getProducts({}, {
      success: () => {},
      error: (response) => {}
    });
  }, [getProducts]);

  return (
    <div className={`${themeClasses.background} ${themeClasses.text}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Product Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage all products in the system
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                All Products ({products.length})
              </h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add New Product
              </button>
            </div>
          </div>
          
          <GuestProducts products={products} />
        </div>
      </div>
    </div>
  );
}
