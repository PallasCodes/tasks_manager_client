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
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email()
})

// TODO: type functions passed to forms

export type RequestRestorePasswordData = z.infer<typeof formSchema>

type Props = {
  onSave: (data: any) => Promise<any>
  isLoading: boolean
}

const RequestRestorePasswordForm = ({ onSave, isLoading }: Props) => {
  const { t } = useTranslation()

  const form = useForm<RequestRestorePasswordData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-center">
            Request password restore
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

        <Button type="submit" className="w-full uppercase" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Send email
        </Button>
      </form>
    </Form>
  )
}

export default RequestRestorePasswordForm
