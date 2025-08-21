

import { isLoggedin } from "./isLoggedin";
import { redirect } from "next/navigation";
export default function guestauth(Component: any) {
    return async function guestauth(props: any) {
        let isLogin = await isLoggedin();
        if (isLogin) {
            return redirect("/user-products");
        }
        return <Component {...props} />
    };
}