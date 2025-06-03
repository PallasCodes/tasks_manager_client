import type { BaseEntity } from './base-entity.interface'

export interface Task extends BaseEntity {
  id: string
  title: string
  done: boolean
  pinned: boolean
  description?: string
  estimatedTime?: number
  order: number
}

export interface CreateTask {
  title: string
  listId: string
  description?: string
  estimatedTime?: number
  pinned?: boolean
}

export interface UpdateTask {
  id: string
  title?: string
  done?: boolean
  pinned?: boolean
  description?: string
  estimatedTime?: number
  order?: number
}
