import { CheckLine, Circle, EllipsisVertical } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { useCreateTask, useDeleteTask } from '@/api/tasks.api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { List } from '@/types/list.interface'

import TaskItem from './TaskItem'
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem
} from './ui/accordion'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useTranslation } from 'react-i18next'

interface Props {
  list: List
  deleteList: (list: List) => void
  updateList: (list: List) => void
  showSettings?: boolean
  className?: string
  onDragStart: (e: any, list: List) => void
  onDragEnd: (e: any, list: List) => void
  onDragOver: (e: any, list: List) => void
  onDragLeave: (e: any, list: List) => void
  onDrop: (e: any, list: List) => void
}

const ListCard = ({
  list,
  deleteList,
  updateList,
  className,
  showSettings,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop
}: Props) => {
  const { t } = useTranslation()

  const [showNewTaskInput, setShowNewTaskInput] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [newTaskEstimatedTime, setNewTaskEstimatedTime] = useState(5)

  const { createTask, isLoading: addTaskIsLoading } = useCreateTask()
  const { deleteTask, isLoading: deleteTaskIsLoading } = useDeleteTask()

  const handleAddTask = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setShowNewTaskInput(false)

    const trimmedNewTask = newTask.trim()
    if (trimmedNewTask === '') return

    try {
      await createTask({
        listId: list.id,
        title: trimmedNewTask,
        estimatedTime: newTaskEstimatedTime
      })
      setNewTask('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTask = (id: string) => {
    try {
      deleteTask(id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card
      className={`gap-0! py-5! overflow-y-auto list-card h-min relative list-card ${className} ${
        list.dragged ? 'opacity-50' : ''
      }`}
      onDragStart={(e) => onDragStart(e, list)}
      onDragEnd={(e) => onDragEnd(e, list)}
      onDragOver={(e) => onDragOver(e, list)}
      onDragLeave={(e) => onDragLeave(e, list)}
      onDrop={(e) => onDrop(e, list)}
      data-draggable-type="list"
    >
      <div className="span absolute w-10 h-1 bg-gray-500 rounded cursor-pointer top-1 self-center list-card-drag hidden" />
      <CardHeader
        className="px-0! top-0 sticky bg-white dark:bg-card cursor-pointer"
        draggable="true"
      >
        <CardTitle className="px-4 text-lg">{list.title}</CardTitle>
        {showSettings && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full absolute top-[-14px] right-1 size-8"
              >
                <EllipsisVertical className="size-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => deleteList(list)}
              >
                {t('action.delete')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => updateList(list)}
              >
                {t('listCard.changeListName')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex items-center justify-between relative">
          <Button
            variant="ghost"
            className="text-blue-400 justify-start px-4! transition-colors hover:text-text-blue-600 grow"
            onClick={() => setShowNewTaskInput(true)}
          >
            <CheckLine />
            {t('listCard.addTaskBtn')}
          </Button>
          <div className="text-end text-sm dark:text-gray-300 pr-2 mt-1 font-medium absolute right-0">
            Total: &nbsp;
            {list.tasks.reduce(
              (acc, current) => (current.estimatedTime ?? 0) + acc,
              0
            )}
            &nbsp;min
          </div>
        </div>

        {showNewTaskInput && (
          <div className="w-full flex items-center px-2 py-1">
            <Button variant="ghost" className="rounded-full size-7">
              <Circle />
            </Button>
            <form
              onSubmit={(e) => handleAddTask(e)}
              onBlur={() => handleAddTask()}
              onBlurCapture={() => handleAddTask()}
              className="flex w-full"
            >
              <Input
                placeholder="Title"
                className="ghost-input grow"
                autoFocus
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Input
                className="ghost-input shrink grow-0 w-12! remove-input-arrows"
                value={newTaskEstimatedTime}
                type="number"
                onChange={(e) => setNewTaskEstimatedTime(+e.target.value)}
                min={1}
              />
            </form>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col px-0!">
        {/* Tasks */}
        {list.tasks
          ?.filter((task) => !task.done)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={handleDeleteTask}
              isLoading={deleteTaskIsLoading || addTaskIsLoading}
              list={list}
            />
          ))}

        {/* Completed Tasks */}
        <Accordion collapsible type="single">
          <AccordionItem value="tasks-done">
            <AccordionTrigger className="px-4 dark:text-gray-300 text-gray-700">
              {t('listCard.done')} (
              {list.tasks?.filter((task) => task.done).length})
            </AccordionTrigger>
            {list.tasks
              ?.filter((task) => task.done)
              .map((task) => (
                <AccordionContent key={task.id} className="p-0!">
                  <TaskItem
                    task={task}
                    deleteTask={handleDeleteTask}
                    isLoading={deleteTaskIsLoading || addTaskIsLoading}
                    list={list}
                  />
                </AccordionContent>
              ))}
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default ListCard
