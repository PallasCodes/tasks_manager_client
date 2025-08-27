import { Circle, CircleCheck, Pen, Star, Trash } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { useUpdateTask } from '@/api/tasks.api'
import { useTasks } from '@/context/TasksContext'
import type { List } from '@/types/list.interface'
import type { Task } from '@/types/task.interface'
import { dateToLocale } from '@/utils/formatters.util'
import { Button } from './ui/button'
import { Input } from './ui/input'
import clsx from 'clsx'

interface Props {
  task: Task
  deleteTask: (id: string) => void
  isLoading: boolean
  list: List
}

const TaskItem = ({ task, deleteTask, isLoading, list }: Props) => {
  const { t } = useTranslation()

  const { draggedTask, setDraggedTask, draggedOnTask, setDraggedOnTask } =
    useTasks()

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

  const onDragStart = (e: React.DragEvent, task: Task) => {
    e.stopPropagation()
    setDraggedTask({ ...task, listId: list.id })
  }

  const onDragEnd = (e: React.DragEvent, _: Task) => {
    e.stopPropagation()
    setDraggedTask(undefined)
  }

  const onDragOver = (e: React.DragEvent, task: Task) => {
    e.stopPropagation()
    e.preventDefault()
    setDraggedOnTask({ ...task, listId: list.id })
  }

  const onDragLeave = (e: React.DragEvent, _: Task) => {
    e.stopPropagation()
    setDraggedOnTask(undefined)
  }

  const onDrop = async (e: React.DragEvent, task: Task) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (list.id !== draggedTask?.listId) {
        await updateTask({ id: draggedTask?.id as string, listId: list.id })
      } else {
        await updateTask({ id: draggedTask?.id as string, order: task.order })
      }
    } catch (error) {
    } finally {
      setDraggedTask(undefined)
      setDraggedOnTask(undefined)
    }
  }

  return (
    <div
      className={`flex justify-between items-start gap-1.5 hover:bg-blue-50 transition-colors px-2 py-1 dark:hover:bg-gray-900 task-item 
        ${draggedTask?.id === task.id ? 'opacity-50' : ''} 
        ${draggedOnTask?.id === task.id ? 'border-b-2 border-b-blue-500' : ''}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={(e) => onDragEnd(e, task)}
      onDragOver={(e) => onDragOver(e, task)}
      onDragLeave={(e) => onDragLeave(e, task)}
      onDrop={(e) => onDrop(e, task)}
    >
      {!editingEnabled && (
        <div
          className={`flex ${
            task.description || task.done ? 'items-start' : 'items-center'
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
            className="text-sm text-gray-600 dark:text-gray-400 flex "
            onDoubleClick={enableTaskEditing}
          >
            <div
              className={clsx(
                'dark:text-gray-300 min-w-0 break-words max-w-[344px]',
                {
                  'line-through': task.done
                }
              )}
            >
              {task.title}
            </div>
            {task.done && (
              <div className="text-xs">
                {t('taskItem.done')}:&nbsp; {dateToLocale(task.updatedAt)}
              </div>
            )}
            {!task.done && task.description && (
              <div className="text-xs ">
                {task.description.substring(0, 100)}
                {task.description.length > 100 ? '...' : ''}
              </div>
            )}
          </div>
        </div>
      )}

      {editingEnabled && (
        <div className="w-full flex items-center">
          <Button variant="ghost" className="rounded-full size-7">
            <Circle />
          </Button>
          <form
            onSubmit={(e) => handleUpdateTask({ e, ...task, title: newTitle })}
            className="p-0! m-0 w-full"
          >
            <Input
              placeholder="Title"
              className="border-none shadow-none outline-none focus:outline-none! focus:ring-0! focus:border-transparent! w-full! max-w-full! min-w-full! bg-transparent! m-0! p-0!"
              autoFocus
              onBlur={() => handleUpdateTask({ ...task, title: newTitle })}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </form>
        </div>
      )}

      {!task.done && !editingEnabled && (
        <div className="flex items-center">
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
              className={`size-7 transition-colors text-transparent dark:text-transparent task-action hover:text-[#aaa]! ${
                task.pinned ? 'text-[#aaa]' : ''
              }`}
              onClick={() =>
                handleUpdateTask({ ...task, pinned: !task.pinned })
              }
              disabled={isLoading || updateIsLoading}
            >
              <Star
                className="size-4"
                fill={`${task.pinned ? '#aaa' : 'transparent'}`}
              />
            </Button>
          </div>
          <div className="w-10 text-sm text-end dark:text-gray-300">
            {task.estimatedTime}
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
