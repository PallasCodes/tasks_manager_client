import type { Task } from './task.interface'
import type { User } from './user.interface'

export interface List {
  id?: string
  title: string
  user?: string | User
  tasks: Task[]
  hidden?: boolean
}
