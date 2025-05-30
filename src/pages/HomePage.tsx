import { useGetLists } from '@/api/lists.api'
import CreateListDialog from '@/components/CreateListDialog'
import DeleteListDialog from '@/components/DeleteListDialog'
import ListCard from '@/components/ListCard'
import { useTasks } from '@/context/TasksContext'
import type { List } from '@/types/list.interface'
import { useState } from 'react'

const HomePage = () => {
  const { lists: _ } = useGetLists()
  const { lists } = useTasks()
  const [selectedList, setSelectedList] = useState<List>({
    id: '-1',
    tasks: [],
    title: ''
  })
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

  return (
    <div className="flex flex-row gap-4 w-full">
      {lists
        ?.filter((list) => !list.hidden)
        .map((list) => (
          <ListCard
            key={list.id}
            list={list}
            deleteList={deleteList}
            updateList={updateList}
            className="grow"
          />
        ))}
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
    </div>
  )
}

export default HomePage
