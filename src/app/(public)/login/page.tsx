"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import LoginComponent from "../../../components/Auth/LoginComponent"
import { useLoginGoogleApi } from "../../../services/AuthServices"
import {
  useLogin,
  useIsAuthenticated,
  useUser,
} from "../../../stores/tokenStore"

// Component that handles search params logic
const LoginWithSearchParams = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const googleLoginMutation = useLoginGoogleApi()
  const login = useLogin()
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()

  // Helper function to check if user is admin
  const isAdmin = () => {
    return user?.isAdmin === "True"
  }

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if user is already authenticated and redirect
  useEffect(() => {
    const checkExistingAuth = () => {
      if (isAuthenticated) {
        console.log("User already authenticated, redirecting to dashboard")
        // Redirect admin users to admin dashboard, regular users to all-show
        const redirectPath = isAdmin() ? "/admin/dashboard" : "/all-show"
        router.push(redirectPath)
      }
      setIsCheckingAuth(false)
    }

    checkExistingAuth()
  }, [isAuthenticated, router, user])

  // Check for Google OAuth callback parameters
  useEffect(() => {
    if (!isClient || !searchParams) return

    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const accessToken = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")

    // Check if we're in a popup window
    const isPopup = window.opener && window.opener !== window

    if (code) {
      console.log("Google OAuth code received:", code)
      // Handle Google OAuth code
      handleGoogleOAuthCode(code)
    }

    if (error) {
      console.log("Google OAuth error:", error)
      if (isPopup) {
        // Send error message to parent window
        window.opener?.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: error,
          },
          window.location.origin
        )
        window.close()
      }
    }

    // If tokens are provided directly in URL parameters, save them
    if (accessToken && refreshToken) {
      console.log("Tokens received from URL parameters")

      if (isPopup) {
        // Send success message to parent window
        window.opener?.postMessage(
          {
            type: "GOOGLE_AUTH_SUCCESS",
            accessToken,
            refreshToken,
          },
          window.location.origin
        )
        window.close()
      } else {
        // Handle direct redirect (fallback)
        const tokens = {
          accessToken,
          refreshToken,
        }
        const success = login(tokens)
        if (success) {
          // Redirect admin users to admin dashboard, regular users to all-show
          const redirectPath = isAdmin() ? "/admin/dashboard" : "/all-show"
          router.push(redirectPath)
        }
      }
    }
  }, [isClient, searchParams, router, login])

  // Handle Google OAuth code
  const handleGoogleOAuthCode = async (code: string) => {
    try {
      const tokens = await googleLoginMutation.mutateAsync(code)
      if (tokens.accessToken && tokens.refreshToken) {
        // Check if we're in a popup window
        const isPopup = window.opener && window.opener !== window

        if (isPopup) {
          // Send success message to parent window
          window.opener?.postMessage(
            {
              type: "GOOGLE_AUTH_SUCCESS",
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            },
            window.location.origin
          )
          window.close()
        } else {
          // Handle direct redirect (fallback)
          const success = login(tokens)
          if (success) {
            // Redirect admin users to admin dashboard, regular users to all-show
            const redirectPath = isAdmin() ? "/admin/dashboard" : "/all-show"
            router.push(redirectPath)
          }
        }
      }
    } catch (error) {
      console.error("Google OAuth error:", error)

      // Check if we're in a popup window
      const isPopup = window.opener && window.opener !== window
      if (isPopup) {
        // Send error message to parent window
        window.opener?.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          window.location.origin
        )
        window.close()
      }
    }
  }

  const handleGoogleLogin = () => {
    // Open Google OAuth in a popup window
    const redirectUrl = encodeURIComponent(`${window.location.origin}/login`)
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/google-auth/external/google?redirectUri=${redirectUrl}`

    // Open popup window
    const popup = window.open(
      backendUrl,
      "googleAuth",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    )

    // Listen for messages from the popup
    const messageListener = (event: MessageEvent) => {
      // Check if the message is from our popup
      if (event.origin !== window.location.origin) return

      if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
        const { accessToken, refreshToken } = event.data
        console.log("Tokens received from popup:", {
          accessToken,
          refreshToken,
        })

        const tokens = { accessToken, refreshToken }
        const success = login(tokens)

        if (success) {
          // Redirect admin users to admin dashboard, regular users to all-show
          const redirectPath = isAdmin() ? "/admin/dashboard" : "/all-show"
          router.push(redirectPath)
        }

        // Clean up
        window.removeEventListener("message", messageListener)
        popup?.close()
      } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
        console.error("Google OAuth error from popup:", event.data.error)
        window.removeEventListener("message", messageListener)
        popup?.close()
      }
    }

    // Add message listener
    window.addEventListener("message", messageListener)

    // Check if popup was closed manually
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed)
        window.removeEventListener("message", messageListener)
      }
    }, 1000)
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538] mx-auto mb-4'></div>
          <p className='text-gray-600'>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <LoginComponent
      onGoogleLogin={handleGoogleLogin}
      onHomeClick={handleHomeClick}
    />
  )
}

// Loading component for Suspense fallback
const LoginLoading = () => (
  <div className='flex items-center justify-center h-screen'>
    <div className='text-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1538] mx-auto mb-4'></div>
      <p className='text-gray-600'>Loading...</p>
    </div>
  </div>
)

// Main LoginPage component with Suspense boundary
const LoginPage = () => {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginWithSearchParams />
    </Suspense>
  )
}

export default LoginPage
