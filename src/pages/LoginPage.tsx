import LoginForm from '@/forms/LoginForm'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const login = async () => {
    console.log('login')
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <LoginForm onSave={login} />
      <div className="text-center mt-6 text-gray-800">
        Don't have an account yet?{' '}
        <Link to="/register" className="text-blue-700">
          Register
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
