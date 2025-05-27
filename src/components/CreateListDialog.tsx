import { DialogClose } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
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
import { Input } from './ui/input'
import { useCreateList, useUpdateList } from '@/api/lists.api'
import { Loader2 } from 'lucide-react'
import type { List } from '@/types/list.interface'

interface Props {
  open: boolean
  close: () => void
  list?: List
}

// TODO: fix open and close behavior

const CreateListDialog = ({
  children,
  open,
  close,
  list: listToUpdate
}: React.PropsWithChildren<Props>) => {
  const [listName, setListName] = useState('')
  const { createList, isLoading: createIsLoading } = useCreateList()
  const { updateList, isLoading: updateIsLoading } = useUpdateList()

  const handleSubmit = async () => {
    try {
      if (listToUpdate) {
        await updateList({ id: listToUpdate.id as string, title: listName })
      } else {
        await createList({ title: listName } as List)
      }
      setListName('')
      close()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (listToUpdate) {
      setListName(listToUpdate.title)
    }
  }, [listToUpdate])

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-72!">
        <DialogHeader>
          <DialogTitle>
            {listToUpdate ? 'Update list' : 'Create a List'}
          </DialogTitle>
          <DialogDescription className="mt-4">
            <Input
              placeholder="Type a name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={createIsLoading || updateIsLoading}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 mt-4">
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-xl" onClick={close}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="rounded-xl gap-1"
            disabled={listName === '' || createIsLoading || updateIsLoading}
            onClick={handleSubmit}
          >
            {(createIsLoading || updateIsLoading) && (
              <Loader2 className="animate-spin" />
            )}
            {listToUpdate ? 'Update' : 'Done'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateListDialog
