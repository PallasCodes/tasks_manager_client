import type { List } from '@/types/list.interface'
import { useState } from 'react'
import CreateListDialog from './CreateListDialog'
import DeleteListDialog from './DeleteListDialog'
import ListCard from './ListCard'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Skeleton } from './ui/skeleton'
import { useTasks } from '@/context/TasksContext'
import { useUpdateList } from '@/api/lists.api'

interface Props {
  lists: List[]
  className?: string
  showCardSettings?: boolean
  isLoading: boolean
}

const ListsContainer = ({ lists, showCardSettings, isLoading }: Props) => {
  const { setLists } = useTasks()
  const { updateList: updateListApi } = useUpdateList()

  const [selectedList, setSelectedList] = useState<List>({
    id: '-1',
    tasks: [],
    title: '',
    order: 0
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [draggedList, setDraggedList] = useState<List>({
    id: '-1',
    order: 0,
    tasks: [],
    title: ''
  })

  const deleteList = (list: List) => {
    setSelectedList(list)
    setShowDeleteDialog(true)
  }

  const updateList = (list: List) => {
    setSelectedList(list)
    setShowUpdateDialog(true)
  }

  const onDragStart = (list: List) => {
    setDraggedList(list)
    setLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, dragged: true } : l))
    )
  }

  const onDragEnd = (list: List) => {
    setLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, dragged: false } : l))
    )
  }

  const onDragOver = (e: React.DragEvent, list: List) => {
    e.preventDefault()
    setLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, draggedOver: true } : l))
    )
  }

  const onDragLeave = (list: List) => {
    setLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, draggedOver: false } : l))
    )
  }

  const onDrop = async (e: React.DragEvent, list: List) => {
    try {
      e.preventDefault()
      await updateListApi({ id: draggedList.id, order: list.order })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ScrollArea className="w-full h-full p-4">
      <div className="flex sm:flex-row gap-4 md:min-w-max flex-col">
        {isLoading && (
          <>
            <Skeleton className="w-full lg:min-w-lg lg:max-w-2xl flex-shrink-0 h-[350px]" />
            <Skeleton className="w-full lg:min-w-lg lg:max-w-2xl flex-shrink-0 h-[250px]" />
          </>
        )}
        {!isLoading &&
          lists
            ?.filter((list) => !list.hidden)
            .map((list) => (
              <div
                key={list.id}
                className={`w-full lg:min-w-sm lg:max-w-lg md:flex-shrink-0 ${
                  list.draggedOver ? 'border-r-4 border-r-blue-500' : ''
                }`}
              >
                <ListCard
                  key={list.id}
                  list={list}
                  deleteList={deleteList}
                  updateList={updateList}
                  showSettings={showCardSettings}
                  onDragEnd={onDragEnd}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                />
              </div>
            ))}
      </div>
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default ListsContainer
