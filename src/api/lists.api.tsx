import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'sonner'

import type { List } from '@/types/list.interface'
import { api } from '.'

const MODULE_PREFIX = '/lists'

export const useCreateList = () => {
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
  } = useMutation(createListRequest)

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
