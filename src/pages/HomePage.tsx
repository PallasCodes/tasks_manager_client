import { useGetLists } from '@/api/lists.api'
import ListCard from '@/components/ListCard'

const HomePage = () => {
  const { lists, error, isLoading } = useGetLists()

  return (
    <div className="flex flex-row gap-4">
      {lists?.map((list) => (
        <ListCard key={list.id} list={list} />
      ))}
    </div>
  )
}

export default HomePage
