import axiosInstance, { publicAxiosInstance } from "../lib/axios"
import {
  WebImage,
  CreateWebImageRequest,
  UpdateWebImageRequest,
  WebImageResponse,
  SingleWebImageResponse,
} from "../interfaces/WebImage/WebImage"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useIsAuthenticated } from "../stores/tokenStore"

export const WebImageApi = {
  // GET - Get all web images
  getAllWebImages: async () => {
    return axiosInstance
      .get<WebImageResponse>("/WebImage")
      .then((res) => res.data)
  },

  // GET - Get web image by name (requires auth)
  getWebImageByName: async (name: string) => {
    return axiosInstance
      .get<SingleWebImageResponse>(`/WebImage/${name}`)
      .then((res) => res.data)
  },

  // GET - Get web image by name (public, no auth required)
  getWebImageByNamePublic: async (name: string) => {
    return publicAxiosInstance
      .get<SingleWebImageResponse>(`/WebImage/${name}`)
      .then((res) => res.data)
  },

  // POST - Create a new web image
  createWebImage: async (data: CreateWebImageRequest) => {
    return axiosInstance
      .post<SingleWebImageResponse>("/WebImage", data)
      .then((res) => res.data)
  },

  // PUT - Update a web image
  updateWebImage: async (data: UpdateWebImageRequest) => {
    return axiosInstance
      .put<SingleWebImageResponse>("/WebImage", data)
      .then((res) => res.data)
  },

  // DELETE - Delete a web image
  deleteWebImage: async (name: string) => {
    return axiosInstance
      .delete<{ message?: string }>(`/WebImage/${name}`)
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetAllWebImages = () => {
  const isAuthenticated = useIsAuthenticated()

  return useQuery({
    queryKey: ["webImages"],
    queryFn: () => WebImageApi.getAllWebImages(),
    enabled: isAuthenticated,
  })
}

export const useGetWebImageByName = (name: string) => {
  const isAuthenticated = useIsAuthenticated()

  return useQuery({
    queryKey: ["webImage", name],
    queryFn: () => WebImageApi.getWebImageByName(name),
    enabled: !!name && isAuthenticated,
  })
}

// Hook for fetching web images without authentication requirement (for public backgrounds)
export const useGetWebImageByNamePublic = (name: string) => {
  return useQuery({
    queryKey: ["webImagePublic", name],
    queryFn: () => WebImageApi.getWebImageByNamePublic(name),
    enabled: !!name,
  })
}

// React Query hooks for mutation operations
export const useCreateWebImage = () => {
  return useMutation({
    mutationFn: (data: CreateWebImageRequest) =>
      WebImageApi.createWebImage(data),
  })
}

export const useUpdateWebImage = () => {
  return useMutation({
    mutationFn: (data: UpdateWebImageRequest) =>
      WebImageApi.updateWebImage(data),
  })
}

export const useDeleteWebImage = () => {
  return useMutation({
    mutationFn: (name: string) => WebImageApi.deleteWebImage(name),
  })
}
