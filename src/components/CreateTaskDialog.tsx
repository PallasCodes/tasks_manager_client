import { useCreateList, useUpdateList } from '@/api/lists.api'
import CreateTaskForm from '@/forms/CreateTaskForm'
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
  const { createList, isLoading: createIsLoading } = useCreateList()
  const { updateList, isLoading: updateIsLoading } = useUpdateList()

  const handleSubmit = (): Promise<void> => {
    return new Promise((resolve) => {
      console.log('first')
      resolve()
    })
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && close()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm!">
        <DialogHeader>
          <DialogTitle>Create a new Task</DialogTitle>
          <DialogDescription>New task</DialogDescription>
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
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="rounded-xl gap-1"
                onClick={handleSubmit}
                type="submit"
              >
                {(createIsLoading || updateIsLoading) && (
                  <Loader2 className="animate-spin" />
                )}
                Done
              </Button>
            </DialogFooter>
          </CreateTaskForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog
