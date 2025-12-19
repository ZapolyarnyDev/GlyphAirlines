import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import { api } from '../shared/api/client.ts'

export interface AuthUser {
    email: string
    role: 'user' | 'admin'
}

interface AuthContextValue {
    user: AuthUser | null
    isAuth: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return
        
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ email: payload.email ?? 'User', role: payload.role })
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token)
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ email: payload.email ?? 'User', role: payload.role })
    }

    const logout = async () => {
        try {
            await api.post('/api/v1/auth/logout')
        } catch { /* empty */ }
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
