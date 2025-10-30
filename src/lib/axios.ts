import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios"

// Extend the InternalAxiosRequestConfig interface to include our custom flag
declare module "axios" {
  interface InternalAxiosRequestConfig {
    skipGlobalErrorToast?: boolean
  }
}
import { toast } from "sonner"
import { DEFAULT_API } from "../constants/API"
import { useTokenStore } from "../stores/tokenStore"
import { AuthApi } from "../services/AuthServices"

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: DEFAULT_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Flag to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

// Process failed requests queue
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })

  failedQueue = []
}

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useTokenStore.getState().accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return axiosInstance(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = useTokenStore.getState().refreshToken

        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        // Attempt to refresh the token
        const response = await AuthApi.refreshToken(refreshToken)

        if (response.accessToken) {
          // Update the token store
          useTokenStore.getState().login(response)

          // Process the queue
          processQueue(null, response.accessToken)

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`

          return axiosInstance(originalRequest)
        } else {
          throw new Error("Failed to refresh token")
        }
      } catch (refreshError) {
        // Refresh failed, logout user and redirect to login
        processQueue(refreshError, null)
        useTokenStore.getState().logout()

        // Redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Handle other errors - show toast notification
    // Skip showing toast if the request has skipGlobalErrorToast flag
    if (error.response && !originalRequest.skipGlobalErrorToast) {
      // Extract error message from response
      const errorMessage =
        (error.response.data as any)?.message ||
        error.response.statusText ||
        "Đã xảy ra lỗi"

      // Skip showing toast for feedback vote errors (handled by FeedbackVoteComponent)
      if (
        errorMessage.includes("Account has already submitted a feedback vote")
      ) {
        return Promise.reject(error)
      }

      // Translate common error messages to Vietnamese
      let translatedErrorMessage = errorMessage
      if (errorMessage.includes("No votes remaining today")) {
        translatedErrorMessage = "Bạn đã hết lượt bình chọn hôm nay"
      } else if (
        errorMessage.includes(
          "Semester 1-6 students can only vote for 1 basic subject lecturer per day"
        )
      ) {
        translatedErrorMessage =
          "Sinh viên học kỳ 1-6 chỉ được bình chọn 1 giảng viên cơ bản mỗi ngày"
      }

      // Show toast notification based on status code
      switch (error.response.status) {
        case 400:
          toast.error("Yêu cầu không hợp lệ", {
            description: translatedErrorMessage,
          })
          break
        case 403:
          toast.error("Không có quyền truy cập", {
            description: translatedErrorMessage,
          })
          break
        case 404:
          toast.error("Không tìm thấy", {
            description: translatedErrorMessage,
          })
          break
        case 409:
          toast.error(translatedErrorMessage)
          break
        case 500:
          toast.error("Lỗi máy chủ", {
            description: translatedErrorMessage,
          })
          break
        default:
          toast.error(`Lỗi ${error.response.status}`, {
            description: translatedErrorMessage,
          })
      }
    } else if (error.request && !originalRequest.skipGlobalErrorToast) {
      // Request was made but no response received
      toast.error("Lỗi kết nối", {
        description:
          "Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối.",
      })
    } else if (!originalRequest.skipGlobalErrorToast) {
      // Something else happened
      toast.error("Lỗi", {
        description: error.message || "Đã xảy ra lỗi không mong muốn",
      })
    }

    return Promise.reject(error)
  }
)

// Create a separate axios instance for public API calls (without auth redirect)
const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL: DEFAULT_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Response interceptor for public API to handle errors without redirecting
publicAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig

    // Handle errors - show toast notification
    if (error.response && !originalRequest.skipGlobalErrorToast) {
      const errorMessage =
        (error.response.data as any)?.message ||
        error.response.statusText ||
        "Đã xảy ra lỗi"

      toast.error(`Lỗi ${error.response.status}`, {
        description: errorMessage,
      })
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
export { publicAxiosInstance }
