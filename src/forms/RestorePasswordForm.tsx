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
import { z } from 'zod'

const formSchema = z.object({
  newPassword: z.string().min(8).max(32)
})

export type RestorePasswordData = z.infer<typeof formSchema>

type Props = {
  onSave: (data: any) => Promise<any>
  isLoading: boolean
  token: string
}

const RestorePasswordForm = ({ onSave, isLoading, token }: Props) => {
  const form = useForm<RestorePasswordData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ newPassword }) =>
          onSave({ token, newPassword })
        )}
        className="space-y-4"
      >
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-center">
            Request password restore
          </h2>
        </div>

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full uppercase" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Restore Password
        </Button>
      </form>
    </Form>
  )
}

export default RestorePasswordForm
