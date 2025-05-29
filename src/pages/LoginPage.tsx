import { useLogin } from '@/api/auth.api'
import { useAuth } from '@/context/AuthContext'
import LoginForm from '@/forms/LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {
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
      login(user, token, tokenExpiration)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <LoginForm onSave={loginUser} isLoading={isLoading} />
      <div className="text-center mt-6 text-gray-800 dark:text-gray-300">
        Don't have an account yet?{' '}
        <Link to="/register" className="text-blue-700 dark:text-blue-400">
          Register
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
