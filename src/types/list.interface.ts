import type { User } from './user.interface'

export interface List {
  id?: string
  title: string
  user?: string | User
}
