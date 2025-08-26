import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {

    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,

    providers: [
        CredentialsProvider({
            id: "login",
            async authorize(credentials: any) {
                const headers = new Headers({
                    "Content-Type": "application/json",
                })

                credentials.login_type = 'web';

                const options = {
                    method: "POST",
                    headers,
                    body: JSON.stringify(credentials),
                }
                const response = await fetch(process.env.API_URL + "/user/login", options)

                // console.log("response for login", process.env.API_URL)

                if (response.ok) {
                    const res = await response.json()

                    if (res.status === false) {
                        throw new Error(JSON.stringify(res))
                    } else {
                        return res
                    }
                } else {
                    console.log("HTTP error! Status:", response.status)
                    // Handle non-successful response here, return an appropriate JSON response.
                    // return { error: "Authentication failed" }
                    throw new Error(JSON.stringify({ error: "Authentication failed" }))
                }

            },
            credentials: {
                email: {
                    label: "Email Address",
                    type: "email",
                    placeholder: "Enter your email",
                    className: 'input input-bordered ',
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
                login_with: {
                    label: "Login with",
                    type: "hidden",
                    name: "login_with",
                    value: "PASSWORD",
                },
            }
        }),
        CredentialsProvider({
            id: "custom-signup",
            name: 'custom-signup',

            async authorize(credentials, req) {


                const headers = new Headers({
                    "Content-Type": "application/json",
                })

                const options = {
                    method: "POST",
                    headers,
                    body: JSON.stringify(credentials),
                }
                const response = await fetch(process.env.API_URL + "/user/register", options)

                if (response.ok) {
                    const res = await response.json()

                    if (res.status === false) {
                        // console.log(res)
                        // return res
                        throw new Error(JSON.stringify(res))
                    } else {
                        return res
                    }
                } else {
                    console.log("HTTP error! Status:", response.status)
                    // Handle non-successful response here, return an appropriate JSON response.
                    throw new Error(JSON.stringify({ error: "Authentication failed" }))
                    return { error: "Authentication failed" }
                }
                // } catch (error) {
                //     console.log("catch Error", error)
                //     throw new Error(error)
                //     return error
                // }

                return null
            },
            credentials: {},
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user) return true;
            return false;
        },
        async jwt({ token, account, user }: any) {
            let data = user?.data
            // return token
            if (data) {
                token.user = data
                token.accessToken = data.access_token
            }
            // console.log("token", token, account, user)
            // return Promise.resolve(token)
            return token
        },
        async session({ session, token }: any) {
            if (token.accessToken) {
                session.accessToken = token.access_token
                session.user = token.user
                return session
            }
            return false;
        },
    },
    // pages: {},

    pages: {
        // signIn: '/a/login',
        //     signOut: '/logout',
        //     // error: '/auth/error', // Error code passed in query string as ?error=
        //     // verifyRequest: '/verify-request', // (used for check email message)
        //     // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    debug: false // process.env.NODE_ENV === 'development',
}

export default authOptions