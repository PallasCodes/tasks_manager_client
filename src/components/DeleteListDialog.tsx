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

interface Props {
  list?: List
  open: boolean
  close: () => void
}

const DeleteListDialog = ({ list, open, close }: Props) => {
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
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the list: {list?.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          All tasks within this list will be deleted as well
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteList}
            className="bg-red-500 text-white hover:bg-red-600 transition-colors"
            disabled={isLoading}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteListDialog
