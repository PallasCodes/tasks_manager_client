import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTasks } from '@/context/TasksContext'
import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1).max(255),
  listId: z.string().min(1),
  pinned: z.boolean()
})

export type CreateTaskFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (data: CreateTaskFormData) => Promise<any>
  isLoading: boolean
  children: React.ReactNode
}

const CreateTaskForm = ({ onSave, isLoading, children }: Props) => {
  const { lists } = useTasks()

  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      listId: '',
      pinned: false
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Title" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="List" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lists.map((list) => (
                    <SelectItem value={list.id as string} key={list.id}>
                      {list.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pinned"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <FormLabel>Pinned</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  )
}

export default CreateTaskForm
