import { api } from '@/api'
import type { User } from '@/types/user.interface'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  login: (
    user: User,
    token: string,
    tokenExpiration: number,
    goToHome?: boolean
  ) => void
  logout: () => void
  isLoading: boolean
  setIsLoading: (val: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tokenExpiration')
    api.defaults.headers.common['Authorization'] = ''
    setUser(null)
    navigate('/login')
  }

  const login = (
    user: User,
    token: string,
    tokenExpiration: number,
    goToHome?: boolean
  ) => {
    setUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('tokenExpiration', tokenExpiration.toString())
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    if (goToHome) navigate('/')

    const now = new Date().getTime()
    const loggedTimeLeft = tokenExpiration - now - 1000

    setTimeout(() => {
      logout()
    }, loggedTimeLeft)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
