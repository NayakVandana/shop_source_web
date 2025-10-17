export function handleResponse(response) {
  if (!response) return { status: false, message: 'No response from server' }
  return response
}