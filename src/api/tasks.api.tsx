import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import { api } from '.'

const MODULE_PREFIX = '/tasks'

type createTaskPayload = {
  title: string
  listId: string
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const createTaskRequest = async (
    payload: createTaskPayload
  ): Promise<createTaskPayload> => {
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

  const deleteTaskRequest = async (id: string): Promise<createTaskPayload> => {
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
