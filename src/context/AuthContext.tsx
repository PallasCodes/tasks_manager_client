import { api } from '@/api'
import type { User } from '@/types/user.interface'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User, token: string) => {
    setUser(user)
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    navigate('/')
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
