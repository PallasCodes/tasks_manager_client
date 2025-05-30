import { useGetLists } from '@/api/lists.api'
import { useTasks } from '@/context/TasksContext'
import ListsContainer from '../components/ListsContainer'

const HomePage = () => {
  const { lists: _ } = useGetLists()
  const { lists } = useTasks()

  return <ListsContainer lists={lists} />
}

export default HomePage
