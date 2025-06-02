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
    <div className="w-full flex justify-between items-start gap-1.5 hover:bg-blue-50 transition-colors px-2 py-1 dark:hover:bg-gray-900 task-item">
      {!editingEnabled && (
        <div
          className={`flex ${
            task.description ? 'items-start' : 'items-center'
          }`}
        >
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
            <div
              className={`dark:text-gray-300 ${
                task.done ? 'line-through' : ''
              }`}
            >
              {task.title}
            </div>
            {task.done && (
              <div className="text-xs font-medium">
                {t('taskItem.done')}:&nbsp; {dateToLocale(task.updatedAt)}
              </div>
            )}
            {!task.done && task.description && (
              <div className="text-xs font-medium">
                {task.description.substring(0, 100)}
                {task.description.length > 100 ? '...' : ''}
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
            className="size-7 transition-colors text-transparent dark:text-transparent task-action hover:text-red-500!"
            onClick={() => deleteTask(task.id)}
            disabled={isLoading || updateIsLoading}
          >
            <Trash className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 transition-colors text-transparent dark:text-transparent task-action hover:text-green-500!"
            onClick={enableTaskEditing}
            disabled={isLoading || updateIsLoading}
          >
            <Pen className="size-4" />
          </Button>
          <Button
            variant="ghost"
            className={`size-7 transition-colors text-transparent dark:text-transparent task-action hover:text-yellow-500! ${
              task.pinned ? 'text-[#aaa]' : ''
            }`}
            onClick={() => handleUpdateTask({ ...task, pinned: !task.pinned })}
            disabled={isLoading || updateIsLoading}
          >
            <Star
              className="size-4"
              fill={`${task.pinned ? '#aaa' : 'transparent'}`}
            />
          </Button>
        </div>
      )}
    </div>
  )
}

export default TaskItem
