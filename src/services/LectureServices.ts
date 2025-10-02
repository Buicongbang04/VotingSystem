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

// Types for query parameters
export interface LectureQueryParams {
  isActive?: boolean
  sortBy?: 0 | 1 | 2 | 3 // 0=Name, 1=Votes, 2=Department, 3=Email
  order?: 0 | 1 // 0=asc, 1=desc
  top?: number
}

const LectureApi = {
  // GET - Get all lectures with optional filtering and sorting
  getAllLectures: async (params?: LectureQueryParams) => {
    const queryParams = new URLSearchParams()

    if (params?.isActive !== undefined) {
      queryParams.append("isActive", params.isActive.toString())
    }
    if (params?.sortBy !== undefined) {
      queryParams.append("sortBy", params.sortBy.toString())
    }
    if (params?.order !== undefined) {
      queryParams.append("order", params.order.toString())
    }
    if (params?.top !== undefined) {
      queryParams.append("top", params.top.toString())
    }

    const queryString = queryParams.toString()
    const url = queryString ? `/Lecture?${queryString}` : "/Lecture"

    return axiosInstance.get<LectureResponse>(url).then((res) => res.data)
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

  // GET - Download lecturer import template
  downloadTemplate: async () => {
    return axiosInstance
      .get("/Lecture/import-template", {
        responseType: "blob",
      })
      .then((res) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement("a")
        link.href = url

        // Get filename from Content-Disposition header or use default
        const contentDisposition = res.headers["content-disposition"]
        let filename = "lecturer_template.xlsx"

        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/)
          if (filenameMatch) {
            filename = filenameMatch[1]
          }
        }

        link.setAttribute("download", filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

        return { success: true, filename }
      })
  },

  // POST - Import lecturers from Excel file
  importLecturers: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    return axiosInstance
      .post<{ messages?: string[]; success?: boolean }>(
        "/Lecture/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetAllLectures = (params?: LectureQueryParams) => {
  const isAuthenticated = useTokenStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ["lectures", params],
    queryFn: () => LectureApi.getAllLectures(params),
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

// Convenience hooks for common use cases
export const useGetActiveLectures = () => {
  return useGetAllLectures({ isActive: true })
}

export const useGetTopLectures = (count: number, sortBy: 0 | 1 | 2 | 3 = 1) => {
  return useGetAllLectures({
    isActive: true,
    top: count,
    sortBy,
    order: 1, // desc for top results
  })
}

export const useGetLecturesSortedByVotes = (order: 0 | 1 = 1) => {
  return useGetAllLectures({
    isActive: true,
    sortBy: 1, // Votes
    order,
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

export const useDownloadTemplate = () => {
  return useMutation({
    mutationFn: () => LectureApi.downloadTemplate(),
  })
}

export const useImportLecturers = () => {
  return useMutation({
    mutationFn: (file: File) => LectureApi.importLecturers(file),
  })
}

export default LectureApi
