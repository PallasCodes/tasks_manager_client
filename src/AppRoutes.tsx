import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import TestPage from './pages/TestPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/test" element={<TestPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
