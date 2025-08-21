import Login from '@/ui/guest/Login/Login'
import guestauth from '@/utils/guestauth'

const login = () => {
    return (<>
        <Login />
    </>
    )
}

export default guestauth(login) 