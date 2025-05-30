import { useGetTasks } from '@/api/tasks.api'
import ListsContainer from '@/components/ListsContainer'
import type { List } from '@/types/list.interface'
import { useEffect, useState } from 'react'

const PinnedTasksPage = () => {
  const { tasks } = useGetTasks()
  const [list, setList] = useState<List>({
    title: 'Pinned Tasks',
    tasks: [],
    hidden: false,
    id: '-1'
  })

  useEffect(() => {
    if (tasks) {
      setList((prev) => ({ ...prev, tasks: tasks }))
    }
  }, [tasks])

  return (
    <ListsContainer lists={[list]} className="w-full justify-center flex" />
  )
}

export default PinnedTasksPage
