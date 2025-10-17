import { create } from 'zustand'

interface ApiLoadingState {
  isLoading: boolean
  loadingText: string
  showLoader: (loadingText?: string) => void
  hideLoader: () => void
}

export const useApiLoadingStore = create<ApiLoadingState>((set) => ({
  isLoading: false,
  loadingText: '',
  showLoader: (loadingText = '') => {
    set({
      isLoading: true,
      loadingText,
    })
  },
  hideLoader: () => {
    set({
      isLoading: false,
      loadingText: '',
    })
  },
}))