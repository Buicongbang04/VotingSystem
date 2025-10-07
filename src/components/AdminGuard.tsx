"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  useTokenStore,
  useIsAuthenticated,
  useUser,
  useValidateToken,
} from "../stores/tokenStore"

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
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

    const checkAdminAccess = async () => {
      try {
        // First check if user is authenticated
        const isValid = validateToken()

        if (!isValid) {
          console.log("Invalid or expired token, redirecting to login")
          router.push("/login")
          return
        }

        // Get current user data after validation
        const currentUser = useTokenStore.getState().user

        // Check if user has admin privileges
        if (
          !currentUser ||
          !currentUser.isAdmin ||
          currentUser.isAdmin !== "True"
        ) {
          console.log(
            "User does not have admin privileges, redirecting to home"
          )
          router.push("/")
          return
        }

        console.log("Admin user authenticated:", currentUser)
      } catch (error) {
        console.error("Admin access check failed:", error)
        router.push("/login")
      }
    }

    checkAdminAccess()
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
  if (!isAuthenticated || !user || user.isAdmin !== "True") {
    return null
  }

  // Render children with admin context
  return (
    <div className='admin-authenticated' data-user={JSON.stringify(user)}>
      {children}
    </div>
  )
}
