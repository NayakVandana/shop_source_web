import { redirect } from 'next/navigation'
import { isLoggedin } from './isLoggedin'

export default function guest(Component) {
  return async function GuestComponent(props) {
    const isLogin = await isLoggedin()
    if (isLogin) {
      redirect('/user-products')
    }
    return <Component {...props} />
  }
}