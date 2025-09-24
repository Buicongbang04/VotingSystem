"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  useTokenStore,
  useIsAuthenticated,
  useUser,
  useValidateToken,
} from "../stores/tokenStore"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()
  const validateToken = useValidateToken()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Wait for store to hydrate
    const unsubscribe = useTokenStore.persist.onFinishHydration(() => {
      setIsHydrated(true)
    })

    // If already hydrated, set immediately
    if (useTokenStore.persist.hasHydrated()) {
      setIsHydrated(true)
    }

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const checkAuthentication = async () => {
      try {
        // Check token validity using Zustand store
        const isValid = validateToken()

        if (!isValid) {
          console.log("Invalid or expired token, redirecting to login")
          router.push("/login")
          return
        }

        // Get current user data after validation
        const currentUser = useTokenStore.getState().user
        console.log("User authenticated:", currentUser)
      } catch (error) {
        console.error("Authentication check failed:", error)
        router.push("/login")
      }
    }

    checkAuthentication()
  }, [validateToken, router, isHydrated])

  // Show loading while hydrating
  if (!isHydrated) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-white'>Loading...</div>
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
