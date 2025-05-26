import { useGetLists } from '@/api/lists.api'
import ListCard from '@/components/ListCard'
import { useTasks } from '@/context/TasksContext'
import { useEffect } from 'react'

const HomePage = () => {
  const { lists: apiLists, error, isLoading } = useGetLists()
  const { setLists, lists } = useTasks()

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
          <ListCard key={list.id} list={list} />
        ))}
    </div>
  )
}

export default HomePage
