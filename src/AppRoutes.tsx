import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './auth/ProtectedRoute'
import UnprotectedRoute from './auth/UnprotectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SettingsPage from './pages/SettingsPage'
import { useAuth } from './context/AuthContext'
import type { User } from './types/user.interface'
import MainLayout from './layouts/MainLayout'

const AppRoutes = () => {
  const { login } = useAuth()

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    let user = localStorage.getItem('user')

    if (token && user) {
      JSON.parse(user)
      login(user as unknown as User, token)
    }
  }, [])

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
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
