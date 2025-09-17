import axios from "axios"
import { DEFAULT_API } from "../constants/API"
import { LoginRequest, Token } from "../interfaces/auth/Schema/Token"
import { useMutation, useQuery } from "@tanstack/react-query"

const AuthApi = {
  login: async (data: LoginRequest) => {
    return axios
      .post<Token>(DEFAULT_API + "/auth/login", data)
      .then((res) => res.data)
  },
  loginGoogle: async (data: any) => {
    return axios
      .get<Token>(DEFAULT_API + "/google-auth/external/google", {
        params: {
          code: data,
        },
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
