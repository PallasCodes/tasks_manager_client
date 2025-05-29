import type { BaseEntity } from './base-entity.interface'

export interface Task extends BaseEntity {
  id?: string
  title: string
  done?: boolean
  pinned?: boolean
  listId?: string
}
