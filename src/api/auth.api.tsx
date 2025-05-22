import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'sonner'

import type { User } from '@/types/user.interface'
import { api } from '.'

const MODULE_PREFIX = '/auth'

type AuthResponse = {
  token: string
  user: User
}

type LoginPayload = {
  email: string
  password: string
}

export const useLogin = () => {
  const loginRequest = async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      const response = await api.post(`${MODULE_PREFIX}/login`, payload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not login')
    }
  }

  const {
    mutateAsync: login,
    isLoading,
    error,
    reset
  } = useMutation(loginRequest)

  useEffect(() => {
    if (error) {
      toast.error(error.toString())
      reset()
    }
  }, [error, reset])

  return {
    login,
    isLoading
  }
}

type RegisterPayload = {
  username: string
  password: string
  email: string
}

export const useRegister = () => {
  const registerRequest = async (
    payload: RegisterPayload
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post(`${MODULE_PREFIX}/register`, payload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Could not register')
    }
  }

  const {
    mutateAsync: register,
    isLoading,
    error,
    reset
  } = useMutation(registerRequest)

  useEffect(() => {
    if (error) {
      toast.error(error.toString())
      reset()
    }
  }, [error, reset])

  return {
    register,
    isLoading
  }
}
