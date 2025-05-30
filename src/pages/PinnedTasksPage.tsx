import { useGetTasks } from '@/api/tasks.api'
import CreateListDialog from '@/components/CreateListDialog'
import DeleteListDialog from '@/components/DeleteListDialog'
import ListCard from '@/components/ListCard'
import type { List } from '@/types/list.interface'
import { useEffect, useState } from 'react'

const PinnedTasksPage = () => {
  const { tasks } = useGetTasks()
  const [list, setList] = useState<List>({
    title: 'Pinned Tasks',
    tasks: [],
    hidden: false,
    id: '-1'
  })
  const [selectedList, setSelectedList] = useState<List | undefined>(undefined)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  const deleteList = (list: List) => {
    setSelectedList(list)
    setShowDeleteDialog(true)
  }

  const updateList = (list: List) => {
    setSelectedList(list)
    setShowUpdateDialog(true)
  }

  useEffect(() => {
    if (tasks) {
      setList((prev) => ({ ...prev, tasks: tasks }))
    }
  }, [tasks])

  return (
    <>
      <ListCard
        list={list}
        deleteList={deleteList}
        updateList={updateList}
        className="mx-auto w-full"
      />
      <DeleteListDialog
        list={selectedList}
        open={showDeleteDialog}
        close={() => setShowDeleteDialog(false)}
      />
      <CreateListDialog
        list={selectedList}
        open={showUpdateDialog}
        close={() => setShowUpdateDialog(false)}
      />
    </>
  )
}

export default PinnedTasksPage
