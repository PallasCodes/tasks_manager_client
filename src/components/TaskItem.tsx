import { Circle, Trash } from 'lucide-react'

import type { Task } from '@/types/task.interface'
import { Button } from './ui/button'

interface Props {
  task: Task
  deleteTask: (id: string) => void
  isLoading: boolean
}

const TaskItem = ({ task, deleteTask, isLoading }: Props) => {
  return (
    <div className="w-full flex justify-between items-center gap-1.5 hover:bg-blue-50 transition-colors px-2 py-1 dark:hover:bg-gray-900">
      <div className="flex items-center">
        <Button variant="ghost" className="rounded-full size-7">
          <Circle />
        </Button>
        <span className="text-sm text-gray-800 dark:text-gray-400">
          {task.title}
        </span>
      </div>
      <Button
        variant="ghost"
        className="size-7 hover:text-red-400 transition-colors text-gray-400"
        onClick={() => deleteTask(task.id as string)}
        disabled={isLoading}
      >
        <Trash className="size-4" />
      </Button>
    </div>
  )
}

export default TaskItem
