import { useRestorePassword } from '@/api/auth.api'
import RestorePasswordForm from '@/forms/RestorePasswordForm'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const RestorePasswordPage = () => {
  const { isLoading, restorePassword } = useRestorePassword()

  const [searchParams] = useSearchParams()
  const [token, setToken] = useState<string>()

  useEffect(() => {
    const tokenInUrl = searchParams.get('token')
    if (tokenInUrl) {
      setToken(tokenInUrl)
    }
  }, [])

  if (!token) {
    return <div>No token provided</div>
  }

  return (
    <div className="mx-auto max-w-sm mt-28">
      <RestorePasswordForm
        token={token}
        onSave={restorePassword}
        isLoading={isLoading}
      />
    </div>
  )
}

export default RestorePasswordPage
