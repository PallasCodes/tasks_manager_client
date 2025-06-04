import { useLogin } from '@/api/auth.api'
import { useAuth } from '@/context/AuthContext'
import LoginForm from '@/forms/LoginForm'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const { t } = useTranslation()

  const { isLoading, login: requestLogin } = useLogin()
  const { login } = useAuth()

  const loginUser = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    try {
      const { user, token, tokenExpiration } = await requestLogin({
        email,
        password
      })
      login(user, token, tokenExpiration, true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <LoginForm onSave={loginUser} isLoading={isLoading} />
      <div className="text-center mt-6 text-gray-800 dark:text-gray-300">
        {t('loginPage.registerMsg')}{' '}
        <Link to="/register" className="text-blue-700 dark:text-blue-400">
          {t('loginPage.registerBtn')}
        </Link>
      </div>

      <div className="text-center mt-1 text-gray-800 dark:text-gray-300">
        Don't remember your password?
        <Link
          to="/request-password-restore"
          className="text-blue-700 dark:text-blue-400"
        >
          Restore password
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
