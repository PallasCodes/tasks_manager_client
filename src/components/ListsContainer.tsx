import type { List } from '@/types/list.interface'
import { useState } from 'react'
import CreateListDialog from './CreateListDialog'
import DeleteListDialog from './DeleteListDialog'
import ListCard from './ListCard'

interface Props {
  lists: List[]
  className?: string
  showCardSettings?: boolean
}

const ListsContainer = ({ lists, className, showCardSettings }: Props) => {
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
    <div className={`${className}`}>
      {lists
        ?.filter((list) => !list.hidden)
        .map((list) => (
          <ListCard
            key={list.id}
            list={list}
            deleteList={deleteList}
            updateList={updateList}
            className="grow"
            showSettings={showCardSettings}
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

export default ListsContainer
