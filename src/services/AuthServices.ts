import axiosInstance from "../lib/axios"
import { LoginRequest, Token } from "../interfaces/auth/Schema/Token"
import { useMutation, useQuery } from "@tanstack/react-query"

export const AuthApi = {
  login: async (data: LoginRequest) => {
    return axiosInstance
      .post<Token>("/auth/login", data)
      .then((res) => res.data)
  },
  loginGoogle: async (data: any) => {
    return axiosInstance
      .get<Token>("http://localhost:8000/api/google-auth/external/google", {
        params: {
          code: data,
        },
      })
      .then((res) => res.data)
  },
  refreshToken: async (refreshToken: string) => {
    return axiosInstance
      .post<Token>("/auth/refresh", {
        refreshToken,
      })
      .then((res) => res.data)
  },
}

export const useLoginApi = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => AuthApi.login(data),
  })
}

export const useLoginGoogleApi = () => {
  return useMutation({
    mutationFn: (data: any) => AuthApi.loginGoogle(data),
  })
}

export const useRefreshTokenApi = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => AuthApi.refreshToken(refreshToken),
  })
}
