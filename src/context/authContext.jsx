import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
    const inititalAuth = JSON.parse(localStorage.getItem('auth')) || {
        token: null,
        user: null,
    }
    const [auth, setAuth] = useState(inititalAuth)

    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth))
        }
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
