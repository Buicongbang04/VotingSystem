import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios"
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

    // Handle other errors
    return Promise.reject(error)
  }
)

export default axiosInstance
