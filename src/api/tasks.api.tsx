import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { api } from '.'
import type { CreateTask, Task, UpdateTask } from '@/types/task.interface'
import type { List } from '@/types/list.interface'

const MODULE_PREFIX = '/tasks'

export const useGetTasks = () => {
  const getTasksRequest = async (): Promise<Task[]> => {
    try {
      const response = await api.get(MODULE_PREFIX, {
        params: { pinned: true }
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not get tasks')
    }
  }

  const {
    data: tasks,
    isLoading,
    error,
    isFetching
  } = useQuery('fetchTasks', getTasksRequest)

  return {
    tasks,
    isLoading,
    error,
    isFetching
  }
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const createTaskRequest = async (payload: CreateTask): Promise<Task> => {
    try {
      const response = await api.post(MODULE_PREFIX, payload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not create task')
    }
  }

  const {
    mutateAsync: createTask,
    isLoading,
    error,
    reset
  } = useMutation({
    mutationFn: createTaskRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchLists'])
    }
  })

  useEffect(() => {
    if (error) {
      toast.error(error.toString())
      reset()
    }
  }, [error, reset])

  return {
    createTask,
    isLoading
  }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  const deleteTaskRequest = async (id: string): Promise<CreateTask> => {
    try {
      const response = await api.delete(`${MODULE_PREFIX}/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not delete task')
    }
  }

  const {
    mutateAsync: deleteTask,
    isLoading,
    error,
    reset
  } = useMutation({
    mutationFn: deleteTaskRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchLists'])
    }
  })

  useEffect(() => {
    if (error) {
      toast.error(error.toString())
      reset()
    }
  }, [error, reset])

  return {
    deleteTask,
    isLoading
  }
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  const updateTaskRequest = async (payload: UpdateTask): Promise<Task> => {
    try {
      const { id, ...restPayload } = payload
      const response = await api.patch(`${MODULE_PREFIX}/${id}`, restPayload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not update task')
    }
  }

  const {
    mutateAsync: updateTask,
    isLoading,
    error,
    reset
  } = useMutation({
    mutationFn: updateTaskRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchLists'])
    }
  })

  useEffect(() => {
    if (error) {
      toast.error(error.toString())
      reset()
    }
  }, [error, reset])

  return {
    updateTask,
    isLoading
  }
}
