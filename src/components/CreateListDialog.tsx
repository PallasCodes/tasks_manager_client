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
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  close: () => void
  list?: List
}

const CreateListDialog = ({
  children,
  open,
  close,
  list: listToUpdate
}: React.PropsWithChildren<Props>) => {
  const { t } = useTranslation()

  const [listName, setListName] = useState('')
  const { createList, isLoading: createIsLoading } = useCreateList()
  const { updateList, isLoading: updateIsLoading } = useUpdateList()

  const handleSubmit = async () => {
    try {
      if (listToUpdate) {
        await updateList({ id: listToUpdate.id, title: listName })
      } else {
        await createList({ title: listName })
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
    <Dialog open={open} onOpenChange={(open) => !open && close()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-72!">
        <DialogHeader>
          <DialogTitle>
            {listToUpdate ? 'Update list' : 'Create a List'}
          </DialogTitle>
          <DialogDescription className="mt-4">
            <Input
              placeholder={t('createListDialog.nameInput')}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={createIsLoading || updateIsLoading}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 mt-4">
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-xl" onClick={close}>
              {t('action.cancel')}
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
            {listToUpdate ? t('action.update') : t('action.done')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateListDialog
