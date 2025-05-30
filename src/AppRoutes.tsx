import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './auth/ProtectedRoute'
import UnprotectedRoute from './auth/UnprotectedRoute'
import { useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SettingsPage from './pages/SettingsPage'
import type { User } from './types/user.interface'
import PinnedTasksPage from './pages/PinnedTasksPage'
import { Loader2 } from 'lucide-react'

const AppRoutes = () => {
  const { login, isLoading, setIsLoading } = useAuth()
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')

    if (darkMode === 'true') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const token = localStorage.getItem('token')
    const tokenExpiration = Number(localStorage.getItem('tokenExpiration'))
    let user = localStorage.getItem('user')

    setIsLoading(false)

    if (token && user && tokenExpiration) {
      const now = new Date().getTime()

      if (now < tokenExpiration - 15 * 60 * 1000) {
        user = JSON.parse(user)
        login(user as unknown as User, token, tokenExpiration)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<UnprotectedRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/pinned"
          element={
            <MainLayout>
              <PinnedTasksPage />
            </MainLayout>
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
