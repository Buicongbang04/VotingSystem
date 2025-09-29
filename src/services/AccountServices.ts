import axiosInstance from "../lib/axios"
import {
  Account,
  CreateAccountRequest,
  UpdateAccountRequest,
} from "../interfaces/Account/Account"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore, useIsAuthenticated } from "../stores/tokenStore"

export const AccountApi = {
  // GET - Get all accounts
  getAllAccounts: async () => {
    return axiosInstance.get<Account[]>("/Account").then((res) => res.data)
  },

  // GET - Get account by ID
  getAccountById: async (id: string) => {
    return axiosInstance.get<Account>(`/Account/${id}`).then((res) => res.data)
  },

  // PUT - Update entire account
  updateAccount: async ({
    id,
    data,
  }: {
    id: string
    data: CreateAccountRequest
  }) => {
    return axiosInstance
      .put<Account>(`/Account/${id}`, data)
      .then((res) => res.data)
  },

  // PATCH - Ban or unban an account
  banAccount: async (id: string) => {
    return axiosInstance.patch(`/Account/${id}/ban`, {}).then((res) => res.data)
  },

  // DELETE - Delete account
  deleteAccount: async (id: string) => {
    return axiosInstance.delete(`/Account/${id}`).then((res) => res.data)
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
    mutationFn: ({ id, data }: { id: string; data: CreateAccountRequest }) =>
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
