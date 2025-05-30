import { useCreateTask } from '@/api/tasks.api'
import CreateTaskForm, { type CreateTaskFormData } from '@/forms/CreateTaskForm'
import type { List } from '@/types/list.interface'
import { DialogClose } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  close: () => void
  list?: List
}

const CreateTaskDialog = ({
  children,
  open,
  close
}: React.PropsWithChildren<Props>) => {
  const { t } = useTranslation()

  const { createTask, isLoading } = useCreateTask()

  const handleSubmit = async (task: CreateTaskFormData): Promise<void> => {
    try {
      await createTask(task)
      close()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && close()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm!">
        <DialogHeader>
          <DialogTitle>{t('createTaskDialog.title')}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <CreateTaskForm onSave={handleSubmit} isLoading={false}>
            <DialogFooter className="gap-4 mt-4">
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="rounded-xl"
                  onClick={close}
                  type="button"
                >
                  {t('action.cancel')}
                </Button>
              </DialogClose>
              <Button className="rounded-xl gap-1" type="submit">
                {isLoading && <Loader2 className="animate-spin" />}
                {t('action.done')}
              </Button>
            </DialogFooter>
          </CreateTaskForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog
