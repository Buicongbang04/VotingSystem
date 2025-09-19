import axios from "axios"
import { DEFAULT_API } from "../constants/API"
import {
  Lecture,
  CreateLectureRequest,
  UpdateLectureRequest,
  LectureResponse,
  SingleLectureResponse,
} from "../interfaces/Lecture/Lecture"
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

const LectureApi = {
  // GET - Get all lectures
  getAllLectures: async () => {
    return axios
      .get<LectureResponse>(DEFAULT_API + "/Lecture", getAuthHeaders())
      .then((res) => res.data)
  },

  // GET - Get a specific lecture by ID
  getLectureById: async (id: string) => {
    return axios
      .get<SingleLectureResponse>(
        DEFAULT_API + `/Lecture/${id}`,
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // POST - Create a new lecture
  createLecture: async (data: CreateLectureRequest) => {
    return axios
      .post<SingleLectureResponse>(
        DEFAULT_API + "/Lecture",
        data,
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // PUT - Update a lecture
  updateLecture: async (id: string, data: UpdateLectureRequest) => {
    return axios
      .put<SingleLectureResponse>(
        DEFAULT_API + `/Lecture/${id}`,
        data,
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // DELETE - Delete a lecture
  deleteLecture: async (id: string) => {
    return axios
      .delete(DEFAULT_API + `/Lecture/${id}`, getAuthHeaders())
      .then((res) => res.data)
  },

  // POST - Activate a lecturer
  activateLecturer: async (id: string) => {
    return axios
      .post(DEFAULT_API + `/Lecture/${id}/activate`, {}, getAuthHeaders())
      .then((res) => res.data)
  },

  // POST - Deactivate a lecturer
  deactivateLecturer: async (id: string) => {
    return axios
      .post(DEFAULT_API + `/Lecture/${id}/deactivate`, {}, getAuthHeaders())
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
