import { useGetTasks } from '@/api/tasks.api'
import ListsContainer from '@/components/ListsContainer'
import type { List } from '@/types/list.interface'
import { useEffect, useState } from 'react'

const PinnedTasksPage = () => {
  const { tasks, isLoading } = useGetTasks()
  const [list, setList] = useState<List>({
    title: 'Pinned Tasks',
    tasks: [],
    hidden: false,
    id: '-1',
    order: 0
  })

  useEffect(() => {
    if (tasks) {
      setList((prev) => ({ ...prev, tasks: tasks }))
    }
  }, [tasks])

  return (
    <ListsContainer
      lists={[list]}
      className="w-full justify-center flex"
      isLoading={isLoading}
    />
  )
}

export default PinnedTasksPage
