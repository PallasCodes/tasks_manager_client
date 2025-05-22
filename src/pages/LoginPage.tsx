import LoginForm from '@/forms/LoginForm'

const LoginPage = () => {
  const login = async () => {
    console.log('login')
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <LoginForm onSave={login} />
    </div>
  )
}

export default LoginPage
