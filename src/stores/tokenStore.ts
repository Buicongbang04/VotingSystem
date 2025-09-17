import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Token } from "../interfaces/auth/Schema/Token"
import { DecodedToken, decodeJWT, isTokenValid } from "../utils/jwt"

interface TokenState {
  // Tokens
  accessToken: string | null
  refreshToken: string | null

  // User data from decoded token
  user: DecodedToken | null

  // Computed states
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setTokens: (tokens: Token) => void
  clearTokens: () => void
  updateUserFromToken: () => void
  checkTokenValidity: () => boolean
  setLoading: (loading: boolean) => void
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
      // Initial state
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setTokens: (tokens: Token) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })

        // Update user data from the new token
        get().updateUserFromToken()
      },

      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        })
      },

      updateUserFromToken: () => {
        const { accessToken } = get()

        if (!accessToken) {
          set({ user: null, isAuthenticated: false })
          return
        }

        // Decode token to get user information
        const decodedToken = decodeJWT(accessToken)

        if (decodedToken && isTokenValid(accessToken)) {
          set({
            user: decodedToken,
            isAuthenticated: true,
          })
        } else {
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },

      checkTokenValidity: () => {
        const { accessToken } = get()

        if (!accessToken) {
          set({ isAuthenticated: false, user: null })
          return false
        }

        const isValid = isTokenValid(accessToken)

        if (!isValid) {
          set({ isAuthenticated: false, user: null })
          return false
        }

        // Update user data if token is valid
        get().updateUserFromToken()
        return true
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: "token-storage", // unique name for localStorage key
      partialize: (state) => ({
        // Only persist tokens, not computed states
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, update user data from persisted tokens
        if (state) {
          state.updateUserFromToken()
        }
      },
    }
  )
)

// Selectors for easier access to specific parts of the state
export const useAccessToken = () => useTokenStore((state) => state.accessToken)
export const useRefreshToken = () =>
  useTokenStore((state) => state.refreshToken)
export const useUser = () => useTokenStore((state) => state.user)
export const useIsAuthenticated = () =>
  useTokenStore((state) => state.isAuthenticated)
export const useIsLoading = () => useTokenStore((state) => state.isLoading)

// Action selectors
export const useTokenActions = () =>
  useTokenStore((state) => ({
    setTokens: state.setTokens,
    clearTokens: state.clearTokens,
    updateUserFromToken: state.updateUserFromToken,
    checkTokenValidity: state.checkTokenValidity,
    setLoading: state.setLoading,
  }))
