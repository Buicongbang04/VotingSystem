import axiosInstance from "../lib/axios"
import {
  Account,
  CreateAccountRequest,
  UpdateAccountRequest,
} from "../interfaces/Account/Account"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore, useIsAuthenticated } from "../stores/tokenStore"

// API Response types
interface AccountResponse {
  data: Account[]
  messages?: string[]
}

interface SingleAccountResponse {
  data: Account
  messages?: string[]
}

export const AccountApi = {
  // GET - Get all accounts
  getAllAccounts: async () => {
    return axiosInstance
      .get<AccountResponse>("/Account")
      .then((res) => res.data)
  },

  // GET - Get account by ID
  getAccountById: async (id: string) => {
    return axiosInstance
      .get<SingleAccountResponse>(`/Account/${id}`)
      .then((res) => res.data)
  },

  // PUT - Update entire account
  updateAccount: async ({
    id,
    data,
  }: {
    id: string
    data: UpdateAccountRequest
  }) => {
    return axiosInstance
      .put<SingleAccountResponse>(`/Account/${id}`, data)
      .then((res) => res.data)
  },

  // PATCH - Ban or unban an account
  banAccount: async (id: string) => {
    return axiosInstance
      .patch<SingleAccountResponse>(`/Account/${id}/ban`, {})
      .then((res) => res.data)
  },

  // DELETE - Delete account
  deleteAccount: async (id: string) => {
    return axiosInstance
      .delete<{ messages?: string[] }>(`/Account/${id}`)
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetAllAccounts = () => {
  const isAuthenticated = useIsAuthenticated()

  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => AccountApi.getAllAccounts(),
    enabled: isAuthenticated,
  })
}

export const useGetAccountById = (id: string) => {
  const isAuthenticated = useIsAuthenticated()

  return useQuery({
    queryKey: ["account", id],
    queryFn: () => AccountApi.getAccountById(id),
    enabled: !!id && isAuthenticated,
  })
}

// React Query hooks for mutation operations

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAccountRequest }) =>
      AccountApi.updateAccount({ id, data }),
  })
}

export const useBanAccount = () => {
  return useMutation({
    mutationFn: (id: string) => AccountApi.banAccount(id),
  })
}

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (id: string) => AccountApi.deleteAccount(id),
  })
}
