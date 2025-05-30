import type { List } from '@/types/list.interface'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog'
import { useDeleteList } from '@/api/lists.api'
import { useTranslation } from 'react-i18next'

interface Props {
  list?: List
  open: boolean
  close: () => void
}

const DeleteListDialog = ({ list, open, close }: Props) => {
  const { t } = useTranslation()

  const { deleteList, isLoading } = useDeleteList()

  const handleDeleteList = () => {
    try {
      deleteList(list?.id as string)
      close()
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && close()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('deleteListDialog.title')}: {list?.title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {t('deleteListDialog.descriptionMsg')}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteList}
            className="bg-red-500 text-white hover:bg-red-600 transition-colors"
            disabled={isLoading}
          >
            {t('action.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteListDialog
