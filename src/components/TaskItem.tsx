import { useState, type FormEvent } from 'react'
import { Circle, CircleCheck, Pen, Star, Trash } from 'lucide-react'

import { useUpdateTask } from '@/api/tasks.api'
import type { Task } from '@/types/task.interface'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useTranslation } from 'react-i18next'
import { dateToLocale } from '@/utils/formatters.util'

interface Props {
  task: Task
  deleteTask: (id: string) => void
  isLoading: boolean
}

const TaskItem = ({ task, deleteTask, isLoading }: Props) => {
  const { t } = useTranslation()

  const [editingEnabled, setEditingEnabled] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const { updateTask, isLoading: updateIsLoading } = useUpdateTask()

  const enableTaskEditing = () => {
    if (task.done) return
    setEditingEnabled(true)
    setNewTitle(task.title)
  }

  const handleUpdateTask = async ({
    e,
    done,
    pinned,
    title
  }: {
    e?: FormEvent<HTMLFormElement>
    done?: boolean
    pinned?: boolean
    title?: string
  }) => {
    try {
      e?.preventDefault()
      const payload = {
        id: task.id,
        title: title ?? task.title,
        done: done ?? task.done,
        pinned: pinned ?? task.pinned
      }

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
          <div
            className="text-sm text-gray-800 dark:text-gray-400"
            onDoubleClick={enableTaskEditing}
          >
            <div className={task.done ? 'line-through' : ''}>{task.title}</div>
            {task.done && (
              <div className="text-xs font-medium">
                {t('taskItem.done')}:&nbsp; {dateToLocale(task.updatedAt)}
              </div>
            )}
          </div>
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

      {!task.done && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="size-7 hover:text-red-400 transition-colors text-transparent dark:text-transparent dark:hover:text-red-400"
            onClick={() => deleteTask(task.id)}
            disabled={isLoading || updateIsLoading}
          >
            <Trash className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 hover:text-green-400 transition-colors text-transparent dark:text-transparent dark:hover:text-green-400"
            onClick={enableTaskEditing}
            disabled={isLoading || updateIsLoading}
          >
            <Pen className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className={`size-7 hover:text-yellow-400 transition-colors text-transparent dark:text-transparent dark:hover:text-yellow-400 ${
              task.pinned ? 'dark:text-yellow-200 text-yellow-400' : ''
            }`}
            onClick={() => handleUpdateTask({ ...task, pinned: !task.pinned })}
            disabled={isLoading || updateIsLoading}
          >
            <Star className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default TaskItem
