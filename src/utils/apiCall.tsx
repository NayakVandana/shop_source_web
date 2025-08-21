import api from './api'

export default async function apiCall(endpoint, data = {}, options = {}) {
  const { method = 'GET', showLoader = false } = options
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
    })
    return response.data
  } catch (error) {
    return { status: false, message: error.message }
  }
}