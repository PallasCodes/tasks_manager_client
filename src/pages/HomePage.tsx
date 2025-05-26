import { useGetLists } from '@/api/lists.api'
import DeleteListDialog from '@/components/DeleteListDialog'
import ListCard from '@/components/ListCard'
import { useTasks } from '@/context/TasksContext'
import type { List } from '@/types/list.interface'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const { lists: apiLists, error, isLoading } = useGetLists()
  const { setLists, lists } = useTasks()
  const [selectedList, setSelectedList] = useState<List | undefined>(undefined)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const deleteList = (list: List) => {
    setSelectedList(list)
    setShowDeleteDialog(true)
  }

  useEffect(() => {
    if (apiLists) {
      const mappedLists = apiLists.map((list) => ({ ...list, hidden: false }))
      setLists(mappedLists)
    }
  }, [apiLists])

  return (
    <div className="flex flex-row gap-4">
      {lists
        ?.filter((list) => !list.hidden)
        .map((list) => (
          <ListCard key={list.id} list={list} deleteList={deleteList} />
        ))}
      <DeleteListDialog
        list={selectedList}
        open={showDeleteDialog}
        close={() => setShowDeleteDialog(false)}
      />
    </div>
  )
}

export default HomePage
