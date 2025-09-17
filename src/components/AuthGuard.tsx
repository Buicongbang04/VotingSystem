"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  useTokenStore,
  useIsAuthenticated,
  useUser,
  useIsLoading,
} from "../stores/tokenStore"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()
  const isLoading = useIsLoading()
  const { checkTokenValidity, clearTokens, setLoading } = useTokenStore()

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        setLoading(true)

        // Check token validity using Zustand store
        const isValid = checkTokenValidity()

        if (!isValid) {
          console.log("Invalid or expired token, redirecting to login")
          clearTokens()
          router.push("/login")
          return
        }

        // Get current user data after validation
        const currentUser = useTokenStore.getState().user
        console.log("User authenticated:", {
          email: currentUser?.email,
          name: currentUser?.name,
          role: currentUser?.role,
          exp: currentUser?.exp
            ? new Date(currentUser.exp * 1000).toLocaleString()
            : "N/A",
        })
      } catch (error) {
        console.error("Authentication check failed:", error)
        clearTokens()
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuthentication()
  }, []) // Empty dependency array - only run once on mount

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538] mx-auto mb-4'></div>
          <p className='text-gray-600'>Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null
  }

  // Render children with user context
  return (
    <div className='user-authenticated' data-user={JSON.stringify(user)}>
      {children}
    </div>
  )
}
