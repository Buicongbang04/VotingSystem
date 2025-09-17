import { Token } from "../interfaces/auth/Schema/Token"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export const tokenStorage = {
  // Save tokens to localStorage
  saveTokens: (tokens: Token): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    }
  },

  // Get access token from localStorage
  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACCESS_TOKEN_KEY)
    }
    return null
  },

  // Get refresh token from localStorage
  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    }
    return null
  },

  // Get both tokens
  getTokens: (): Token | null => {
    const accessToken = tokenStorage.getAccessToken()
    const refreshToken = tokenStorage.getRefreshToken()

    if (accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken,
      }
    }
    return null
  },

  // Clear tokens from localStorage
  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  },

  // Check if tokens exist
  hasTokens: (): boolean => {
    const accessToken = tokenStorage.getAccessToken()
    const refreshToken = tokenStorage.getRefreshToken()
    return !!(accessToken && refreshToken)
  },
}
