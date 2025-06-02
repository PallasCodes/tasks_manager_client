import type { BaseEntity } from './base-entity.interface'

export interface Task extends BaseEntity {
  id: string
  title: string
  done: boolean
  pinned: boolean
  description?: string
}

export interface CreateTask {
  title: string
  listId: string
  description?: string
}

export interface UpdateTask {
  id: string
  title: string
  done?: boolean
  pinned?: boolean
  description?: string
}
