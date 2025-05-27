import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'

import type { List } from '@/types/list.interface'
import { api } from '.'

const MODULE_PREFIX = '/lists'

export const useCreateList = () => {
  const queryClient = useQueryClient()

  const createListRequest = async (payload: List): Promise<List> => {
    try {
      const response = await api.post(MODULE_PREFIX, payload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not create list')
    }
  }

  const {
    mutateAsync: createList,
    isLoading,
    error,
    reset
  } = useMutation({
    mutationFn: createListRequest,
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
    createList,
    isLoading
  }
}

export const useGetLists = () => {
  const getListsRequest = async (): Promise<List[]> => {
    try {
      const response = await api.get(MODULE_PREFIX)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not create list')
    }
  }

  const {
    data: lists,
    isLoading,
    error
  } = useQuery('fetchLists', getListsRequest)

  return {
    lists,
    isLoading,
    error
  }
}

export const useDeleteList = () => {
  const queryClient = useQueryClient()

  const deleteListRequest = async (id: string): Promise<void> => {
    try {
      await api.delete(`${MODULE_PREFIX}/${id}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not delete list')
    }
  }

  const {
    mutateAsync: deleteList,
    isLoading,
    error,
    reset
  } = useMutation({
    mutationFn: deleteListRequest,
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
    deleteList,
    isLoading
  }
}

export const useUpdateList = () => {
  const queryClient = useQueryClient()

  const updateListRequest = async ({
    id,
    title
  }: {
    id: string
    title: string
  }): Promise<List> => {
    try {
      const response = await api.patch(`${MODULE_PREFIX}/${id}`, { title })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not update list')
    }
  }

  const {
    mutateAsync: updateList,
    isLoading,
    error,
    reset
  } = useMutation({
    mutationFn: updateListRequest,
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
    updateList,
    isLoading
  }
}
