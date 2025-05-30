import type { Task } from './task.interface'

export interface List {
  id: string
  title: string
  tasks: Task[]
  hidden?: boolean
}

export interface CreateList {
  title: string
}

export interface UpdateList {
  id: string
  title: string
}
