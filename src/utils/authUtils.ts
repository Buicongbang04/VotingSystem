import { useTokenStore } from "../stores/tokenStore"

/**
 * Utility functions for testing and debugging authentication
 */
export const authUtils = {
  /**
   * Check if the current token is expired
   */
  isTokenExpired: (): boolean => {
    const token = useTokenStore.getState().accessToken
    if (!token) return true

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch {
      return true
    }
  },

  /**
   * Get token expiration time
   */
  getTokenExpiration: (): Date | null => {
    const token = useTokenStore.getState().accessToken
    if (!token) return null

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return new Date(payload.exp * 1000)
    } catch {
      return null
    }
  },

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiration: (): number => {
    const expiration = authUtils.getTokenExpiration()
    if (!expiration) return 0

    const currentTime = Math.floor(Date.now() / 1000)
    const expirationTime = Math.floor(expiration.getTime() / 1000)
    return Math.max(0, expirationTime - currentTime)
  },

  /**
   * Force logout (useful for testing)
   */
  forceLogout: (): void => {
    useTokenStore.getState().logout()
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  },

  /**
   * Simulate token expiration (for testing)
   */
  simulateTokenExpiration: (): void => {
    const store = useTokenStore.getState()
    if (store.accessToken) {
      // Create an expired token by modifying the exp claim
      const parts = store.accessToken.split(".")
      const payload = JSON.parse(atob(parts[1]))
      payload.exp = Math.floor(Date.now() / 1000) - 3600 // Expired 1 hour ago
      const newPayload = btoa(JSON.stringify(payload))
      const expiredToken = `${parts[0]}.${newPayload}.${parts[2]}`

      store.login({
        accessToken: expiredToken,
        refreshToken: store.refreshToken || "",
      })
    }
  },
}

// Make it available globally for debugging in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  ;(window as any).authUtils = authUtils
}
