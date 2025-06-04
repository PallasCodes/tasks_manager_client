import { useRequestPassRestore } from '@/api/auth.api'
import RequestRestorePasswordForm from '@/forms/RequestRestorePasswordForm'

const RequestPasswordRestorePage = () => {
  const { isLoading, requestPassRestore } = useRequestPassRestore()

  return (
    <div className="max-w-sm mx-auto mt-28">
      <RequestRestorePasswordForm
        isLoading={isLoading}
        onSave={requestPassRestore}
      />
    </div>
  )
}

export default RequestPasswordRestorePage
