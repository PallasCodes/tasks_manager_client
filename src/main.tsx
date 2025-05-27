import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import { Toaster } from 'sonner'
import AppRoutes from './AppRoutes.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { TasksProvider } from './context/TasksContext.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TasksProvider>
            <AppRoutes />
            <Toaster position="top-right" richColors closeButton />
          </TasksProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
