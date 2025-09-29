import axiosInstance from "../lib/axios"
import {
  Lecture,
  CreateLectureRequest,
  UpdateLectureRequest,
  LectureResponse,
  SingleLectureResponse,
} from "../interfaces/Lecture/Lecture"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore } from "../stores/tokenStore"

const LectureApi = {
  // GET - Get all lectures
  getAllLectures: async () => {
    return axiosInstance
      .get<LectureResponse>("/Lecture?isActive=true")
      .then((res) => res.data)
  },

  // GET - Get a specific lecture by ID
  getLectureById: async (id: string) => {
    return axiosInstance
      .get<SingleLectureResponse>(`/Lecture/${id}`)
      .then((res) => res.data)
  },

  // POST - Create a new lecture
  createLecture: async (data: CreateLectureRequest) => {
    return axiosInstance
      .post<SingleLectureResponse>("/Lecture", data)
      .then((res) => res.data)
  },

  // PUT - Update a lecture
  updateLecture: async (id: string, data: UpdateLectureRequest) => {
    return axiosInstance
      .put<SingleLectureResponse>(`/Lecture/${id}`, data)
      .then((res) => res.data)
  },

  // DELETE - Delete a lecture
  deleteLecture: async (id: string) => {
    return axiosInstance.delete(`/Lecture/${id}`).then((res) => res.data)
  },

  // POST - Activate a lecturer
  activateLecturer: async (id: string) => {
    return axiosInstance
      .post(`/Lecture/${id}/activate`, {})
      .then((res) => res.data)
  },

  // POST - Deactivate a lecturer
  deactivateLecturer: async (id: string) => {
    return axiosInstance
      .post(`/Lecture/${id}/deactivate`, {})
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetAllLectures = () => {
  const isAuthenticated = useTokenStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ["lectures"],
    queryFn: () => LectureApi.getAllLectures(),
    enabled: isAuthenticated,
  })
}

export const useGetLectureById = (id: string) => {
  const isAuthenticated = useTokenStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ["lecture", id],
    queryFn: () => LectureApi.getLectureById(id),
    enabled: isAuthenticated && !!id,
  })
}

// React Query hooks for mutation operations
export const useCreateLecture = () => {
  return useMutation({
    mutationFn: (data: CreateLectureRequest) => LectureApi.createLecture(data),
  })
}

export const useUpdateLecture = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLectureRequest }) =>
      LectureApi.updateLecture(id, data),
  })
}

export const useDeleteLecture = () => {
  return useMutation({
    mutationFn: (id: string) => LectureApi.deleteLecture(id),
  })
}

export const useActivateLecturer = () => {
  return useMutation({
    mutationFn: (id: string) => LectureApi.activateLecturer(id),
  })
}

export const useDeactivateLecturer = () => {
  return useMutation({
    mutationFn: (id: string) => LectureApi.deactivateLecturer(id),
  })
}

export default LectureApi
