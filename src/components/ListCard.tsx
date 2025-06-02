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
}

const ListCard = ({
  list,
  deleteList,
  updateList,
  className,
  showSettings
}: Props) => {
  const { t } = useTranslation()

  const [showNewTaskInput, setShowNewTaskInput] = useState(false)
  const [newTask, setNewTask] = useState('')
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
        title: trimmedNewTask
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
      className={`gap-0! py-5! overflow-y-auto list-card h-min ${className}`}
    >
      <CardHeader className="px-0! top-0 sticky bg-white dark:bg-card">
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
              (acc, current) => current.estimatedTime ?? 0 + acc,
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
            <form onSubmit={(e) => handleAddTask(e)}>
              <Input
                placeholder="Title"
                className="border-none shadow-none outline-none focus:outline-none! focus:ring-0! focus:border-transparent! px-[6px]! w-full! bg-transparent!"
                autoFocus
                onBlur={() => handleAddTask()}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </form>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col px-0!">
        {list.tasks
          ?.filter((task) => !task.done)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={handleDeleteTask}
              isLoading={deleteTaskIsLoading || addTaskIsLoading}
            />
          ))}
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
