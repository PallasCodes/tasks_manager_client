import { useRegister } from '@/api/auth.api'
import RegisterForm from '@/forms/RegisterForm'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const { register, isLoading } = useRegister()

  return (
    <div className="max-w-sm mx-auto mt-16">
      <RegisterForm onSave={register} isLoading={isLoading} />
      <div className="text-center mt-6 text-gray-800">
        Already registered?{' '}
        <Link to="/login" className="text-blue-700">
          Login
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage
