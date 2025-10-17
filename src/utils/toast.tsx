import { toast as reactToast } from 'react-toastify'

export default function toast({ message, type = 'error' }) {
  reactToast(message, {
    type,
    position: 'top-right',
    autoClose: 3000,
  })
}