import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setSession = (sessionData) => {
    cookies.set('__FOsession', sessionData, { path: '/' })
}

export const getSession = () => {
    // const [cookies, setCookie] = useCookies(['session']);
    // const jwt = Cookies.get('__session')
    const jwt = ''
    let session
    try {
        if (jwt) {
            return jwt
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
    return session
}

export const logOut = () => {
    // const [cookies, setCookie] = useCookies(['session']);
    // Cookies.remove('__session')

    // cookies.remove('__FOsession')
    cookies.remove('__FOsession', { path: '/' })
}
