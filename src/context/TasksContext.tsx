import type { List } from '@/types/list.interface'
import React, { createContext } from 'react'

interface TasksContextType {
  lists: List[]
  setLists: (lists: List[]) => void
  toggleList: (listId: string) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = React.useState<List[]>([])

  const toggleList = (listId: string) => {
    console.log(listId)

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, hidden: !list.hidden } : list
      )
    )
  }

  return (
    <TasksContext.Provider value={{ lists, setLists, toggleList }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => {
  const context = React.useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TasksProvider')
  }
  return context
}
