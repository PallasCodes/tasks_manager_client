import { useGetLists } from '@/api/lists.api'
import { useTasks } from '@/context/TasksContext'
import ListsContainer from '../components/ListsContainer'

const HomePage = () => {
  const { lists: _ } = useGetLists()
  const { lists } = useTasks()

  return (
    <ListsContainer
      lists={lists}
      className="flex flex-row gap-4 w-full"
      showCardSettings={true}
    />
  )
}

export default HomePage
