import { useState, type FormEvent } from 'react'
import { Circle, CircleCheck, Pen, Star, Trash } from 'lucide-react'

import { useUpdateTask } from '@/api/tasks.api'
import type { Task } from '@/types/task.interface'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
  task: Task
  deleteTask: (id: string) => void
  isLoading: boolean
}

const TaskItem = ({ task, deleteTask, isLoading }: Props) => {
  const [editingEnabled, setEditingEnabled] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const { updateTask, isLoading: updateIsLoading } = useUpdateTask()

  const enableTaskEditing = () => {
    setEditingEnabled(true)
    setNewTitle(task.title)
  }

  const handleUpdateTask = async (fnPayload: {
    e?: FormEvent<HTMLFormElement>
    done?: boolean
    pinned?: boolean
    title?: string
  }) => {
    try {
      const { e, ...restPayload } = fnPayload
      e?.preventDefault()
      const payload = { ...task, ...restPayload }

      await updateTask(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setEditingEnabled(false)
      setNewTitle('')
    }
  }

  return (
    <div className="w-full flex justify-between items-center gap-1.5 hover:bg-blue-50 transition-colors px-2 py-1 dark:hover:bg-gray-900">
      {!editingEnabled && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="rounded-full size-7"
            onClick={() => handleUpdateTask({ ...task, done: !task.done })}
          >
            {task.done ? <CircleCheck /> : <Circle />}
          </Button>
          <span
            className={`text-sm text-gray-800 dark:text-gray-400 ${
              task.done ? 'line-through' : ''
            }`}
            onDoubleClick={enableTaskEditing}
          >
            {task.title}
          </span>
        </div>
      )}
      {editingEnabled && (
        <div className="w-full flex items-center px-2 py-1">
          <Button variant="ghost" className="rounded-full size-7">
            <Circle />
          </Button>
          <form
            onSubmit={(e) => handleUpdateTask({ e, ...task, title: newTitle })}
          >
            <Input
              placeholder="Title"
              className="border-none shadow-none outline-none focus:outline-none! focus:ring-0! focus:border-transparent! px-[6px]! w-full! bg-transparent!"
              autoFocus
              onBlur={() => handleUpdateTask({ ...task, title: newTitle })}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </form>
        </div>
      )}

      <div className="flex items-center">
        <Button
          variant="ghost"
          className="size-7 hover:text-red-400 transition-colors text-gray-400 dark:text-gray-500 dark:hover:text-red-400"
          onClick={() => deleteTask(task.id as string)}
          disabled={isLoading || updateIsLoading}
        >
          <Trash className="size-4" />
        </Button>
        <Button
          variant="ghost"
          className="size-7 hover:text-green-400 transition-colors text-gray-400 dark:text-gray-500 dark:hover:text-green-400"
          onClick={enableTaskEditing}
          disabled={isLoading || updateIsLoading}
        >
          <Pen className="size-4" />
        </Button>
        <Button
          variant="ghost"
          className={`size-7 hover:text-yellow-400 transition-colors text-gray-400 dark:text-gray-500 dark:hover:text-yellow-400 ${
            task.pinned ? 'text-yellow-200!' : ''
          }`}
          onClick={() => handleUpdateTask({ ...task, pinned: !task.pinned })}
          disabled={isLoading || updateIsLoading}
        >
          <Star className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default TaskItem
