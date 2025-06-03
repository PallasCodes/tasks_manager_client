import React, { createContext, useState } from 'react'

import type { List } from '@/types/list.interface'
import type { Task } from '@/types/task.interface'

interface TasksContextType {
  lists: List[]
  setLists: (data: React.SetStateAction<List[]>) => void
  toggleList: (listId: string) => void
  draggedTask: Task | undefined
  setDraggedTask: (data: React.SetStateAction<Task | undefined>) => void
  draggedOnTask: Task | undefined
  setDraggedOnTask: (data: React.SetStateAction<Task | undefined>) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<List[]>([])
  const [draggedTask, setDraggedTask] = useState<Task>()
  const [draggedOnTask, setDraggedOnTask] = useState<Task>()

  const toggleList = (listId: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, hidden: !list.hidden } : list
      )
    )
  }

  return (
    <TasksContext.Provider
      value={{
        lists,
        setLists,
        toggleList,
        draggedTask,
        setDraggedTask,
        draggedOnTask,
        setDraggedOnTask
      }}
    >
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
