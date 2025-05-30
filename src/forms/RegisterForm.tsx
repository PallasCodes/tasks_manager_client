import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(1).max(20),
    password: z.string().min(8).max(32),
    repeatPassword: z.string().min(8).max(32)
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  })

export type LoginFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (data: Omit<LoginFormData, 'repeatPassword'>) => void
  isLoading: boolean
}

const RegisterForm = ({ onSave, isLoading }: Props) => {
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ repeatPassword, ...data }) =>
          onSave(data)
        )}
        className="space-y-4"
      >
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-center">
            {t('registerPage.createAccount')}
          </h2>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('registerPage.email')}</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showPassword ? 'text' : 'password'} />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showRepeat ? 'text' : 'password'} />
                  <button
                    type="button"
                    onClick={() => setShowRepeat((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full uppercase" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
