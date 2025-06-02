import type { List } from '@/types/list.interface'
import { useState } from 'react'
import CreateListDialog from './CreateListDialog'
import DeleteListDialog from './DeleteListDialog'
import ListCard from './ListCard'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Skeleton } from './ui/skeleton'

interface Props {
  lists: List[]
  className?: string
  showCardSettings?: boolean
  isLoading: boolean
}

const ListsContainer = ({ lists, showCardSettings, isLoading }: Props) => {
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
    <ScrollArea className="w-full h-full p-4">
      <div className="flex sm:flex-row gap-4 min-w-max flex-col">
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
                className="w-full lg:min-w-lg lg:max-w-2xl flex-shrink-0"
              >
                <ListCard
                  key={list.id}
                  list={list}
                  deleteList={deleteList}
                  updateList={updateList}
                  showSettings={showCardSettings}
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
