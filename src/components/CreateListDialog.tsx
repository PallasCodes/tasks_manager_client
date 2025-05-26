import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
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
import { useCreateList } from '@/api/lists.api'
import { Loader2 } from 'lucide-react'
import type List from './ListCard'

interface Props {
  open: boolean
  close: () => void
}

// TODO: fix open and close behavior

const CreateListDialog = ({
  children,
  open,
  close
}: React.PropsWithChildren<Props>) => {
  const [listName, setListName] = useState('')
  const { createList, isLoading } = useCreateList()

  const handleSubmit = async () => {
    try {
      await createList({ title: listName } as List)
      close()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-72!">
        <DialogHeader>
          <DialogTitle>Create a List</DialogTitle>
          <DialogDescription className="mt-4">
            <Input
              placeholder="Type a name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={isLoading}
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
            disabled={listName === '' || isLoading}
            onClick={handleSubmit}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateListDialog
