import { useRegister } from '@/api/auth.api'
import { useAuth } from '@/context/AuthContext'
import RegisterForm from '@/forms/RegisterForm'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const RegisterPage = () => {
  const { t } = useTranslation()

  const { register, isLoading } = useRegister()
  const { login } = useAuth()

  const registerUser = async (payload: {
    email: string
    password: string
    username: string
  }) => {
    const { user, token, tokenExpiration } = await register(payload)
    login(user, token, tokenExpiration)
    toast.success(t('registerPage.accountCreationMsg'))
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <RegisterForm onSave={registerUser} isLoading={isLoading} />
      <div className="text-center mt-6 text-gray-800 dark:text-gray-300">
        {t('registerPage.loginMsg')}{' '}
        <Link to="/login" className="text-blue-700 dark:text-blue-400">
          {t('registerPage.loginBtn')}
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage
