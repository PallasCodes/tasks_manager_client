import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const UnprotectedRoute = () => {
  const { user } = useAuth()

  if (!user) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}

export default UnprotectedRoute
