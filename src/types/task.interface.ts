import type { BaseEntity } from './base-entity.interface'

export interface Task extends BaseEntity {
  id: string
  title: string
  done: boolean
  pinned: boolean
}

export interface CreateTask {
  title: string
  listId: string
}

export interface UpdateTask {
  id: string
  title: string
  done?: boolean
  pinned?: boolean
}
