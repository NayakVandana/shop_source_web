import { create } from 'zustand'
import apiCall from '@/utils/apiCall'
import { handleResponse } from '@/utils/common'
import toast from '@/utils/toast'

export const useProductsStore = create((set) => ({
  products: [],
  isLoading: false,
  getProducts: (data, callback) => {
    set((state) => ({ ...state, isLoading: true }))
    apiCall('products', data, { showLoader: true }).then((response) => {
      let responseData = handleResponse(response)
      if (responseData) {
        if (responseData.status === true) {
          set((state) => ({
            ...state,
            products: responseData.data || [], // Ensure products is always an array
            isLoading: false,
          }))
          callback?.success()
        } else {
          callback?.error(responseData)
          toast({ message: responseData.message })
          set((state) => ({ ...state, isLoading: false }))
        }
      }
    })
  },
}))