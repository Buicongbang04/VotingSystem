import axios from "axios"
import { DEFAULT_API } from "../constants/API"
import {
  Account,
  CreateAccountRequest,
  UpdateAccountRequest,
} from "../interfaces/Account/Account"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore } from "../stores/tokenStore"

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = useTokenStore.getState().accessToken
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

const AccountApi = {
  // GET - Get all accounts
  getAllAccounts: async () => {
    return axios
      .get<Account[]>(DEFAULT_API + "/Account", getAuthHeaders())
      .then((res) => res.data)
  },

  // GET - Get account by ID
  getAccountById: async (id: string) => {
    return axios
      .get<Account>(DEFAULT_API + `/Account/${id}`, getAuthHeaders())
      .then((res) => res.data)
  },

  // PUT - Update entire account
  updateAccount: async ({
    id,
    data,
  }: {
    id: string
    data: CreateAccountRequest
  }) => {
    return axios
      .put<Account>(DEFAULT_API + `/Account/${id}`, data, getAuthHeaders())
      .then((res) => res.data)
  },

  // PATCH - Ban or unban an account
  banAccount: async (id: string) => {
    return axios
      .patch(DEFAULT_API + `/Account/${id}/ban`, {}, getAuthHeaders())
      .then((res) => res.data)
  },

  // DELETE - Delete account
  deleteAccount: async (id: string) => {
    return axios
      .delete(DEFAULT_API + `/Account/${id}`, getAuthHeaders())
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetAllAccounts = () => {
  const isAuthenticated = useTokenStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => AccountApi.getAllAccounts(),
    enabled: isAuthenticated,
  })
}

export const useGetAccountById = (id: string) => {
  const isAuthenticated = useTokenStore((state) => state.isAuthenticated)

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
