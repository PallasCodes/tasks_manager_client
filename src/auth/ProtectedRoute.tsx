import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { user } = useAuth()

  if (user) {
    return <Outlet />
  }

  return <Navigate to="/login" replace />
}

export default ProtectedRoute
