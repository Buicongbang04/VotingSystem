import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Token } from "../interfaces/auth/Schema/Token"
import { DecodedToken, decodeJWT, isTokenValid } from "../utils/jwt"

interface TokenState {
  accessToken: string | null
  refreshToken: string | null
  user: DecodedToken | null
  isAuthenticated: boolean

  // Actions
  login: (tokens: Token) => boolean
  logout: () => void
  setUser: (user: DecodedToken | null) => void
  validateToken: () => boolean
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
      // Initial state
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      // Actions
      login: (tokens: Token) => {
        const decodedToken = decodeJWT(tokens.accessToken)
        if (!decodedToken || !isTokenValid(tokens.accessToken)) {
          return false
        }

        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: decodedToken,
          isAuthenticated: true,
        })
        return true
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: DecodedToken | null) => {
        set({ user })
      },

      validateToken: () => {
        const { accessToken } = get()

        if (!accessToken || !isTokenValid(accessToken)) {
          get().logout()
          return false
        }

        // Update user from token if needed
        const decodedToken = decodeJWT(accessToken)
        if (decodedToken) {
          set({ user: decodedToken, isAuthenticated: true })
        }

        return true
      },
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => {
        // Check if we're on the client side
        if (typeof window !== "undefined") {
          return localStorage
        }
        // Return a no-op storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
      // Skip hydration to prevent SSR/client mismatch
      skipHydration: true,
    }
  )
)

// Simple selectors
export const useAccessToken = () => useTokenStore((state) => state.accessToken)
export const useRefreshToken = () =>
  useTokenStore((state) => state.refreshToken)
export const useUser = () => useTokenStore((state) => state.user)
export const useIsAuthenticated = () =>
  useTokenStore((state) => state.isAuthenticated)

// Individual action selectors
export const useLogin = () => useTokenStore((state) => state.login)
export const useLogout = () => useTokenStore((state) => state.logout)
export const useSetUser = () => useTokenStore((state) => state.setUser)
export const useValidateToken = () =>
  useTokenStore((state) => state.validateToken)

// Actions object (use sparingly to avoid re-renders)
export const useTokenActions = () => ({
  login: useLogin(),
  logout: useLogout(),
  setUser: useSetUser(),
  validateToken: useValidateToken(),
})

// Hydrate the store on client side
if (typeof window !== "undefined") {
  useTokenStore.persist.rehydrate()
}
