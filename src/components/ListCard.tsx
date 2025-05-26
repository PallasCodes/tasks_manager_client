import { CheckLine, Circle, EllipsisVertical } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { useCreateTask, useDeleteTask } from '@/api/tasks.api'
import type { List as ListCard } from '@/types/list.interface'
import type { Task } from '@/types/task.interface'
import TaskItem from './TaskItem'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

const ListCard = ({ list }: { list: ListCard }) => {
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
        listId: list.id as string,
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
    <Card className="shrink-0 grow min-w-sm max-w-lg w-full gap-0! py-5! overflow-y-scroll list-card h-min">
      <CardHeader className="px-0! top-0 sticky bg-white">
        <CardTitle className="px-4">{list.title}</CardTitle>
        <Button
          variant="ghost"
          className="rounded-full absolute top-[-14px] right-1 size-8"
        >
          <EllipsisVertical className="size-5 text-gray-700" />
        </Button>
        <Button
          variant="ghost"
          className="text-blue-400 justify-start px-4! hover:bg-blue-50 transition-colors hover:text-text-blue-600"
          onClick={() => setShowNewTaskInput(true)}
        >
          <CheckLine />
          Add a task
        </Button>

        {showNewTaskInput && (
          <div className="w-full flex items-center px-2 py-1">
            <Button variant="ghost" className="rounded-full size-7">
              <Circle />
            </Button>
            <form onSubmit={(e) => handleAddTask(e)}>
              <Input
                placeholder="Title"
                className="border-none shadow-none outline-none focus:outline-none! focus:ring-0! focus:border-transparent! px-[6px]!"
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
        {list.tasks?.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={handleDeleteTask}
            isLoading={deleteTaskIsLoading || addTaskIsLoading}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default ListCard
