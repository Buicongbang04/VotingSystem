"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import LoginComponent from "../../../components/Auth/LoginComponent"
import { type LoginFormData } from "../../../interfaces/auth/Schema/Login"
import { useLoginApi, useLoginGoogleApi } from "../../../services/AuthServices"
import {
  useLogin,
  useIsAuthenticated,
  useUser,
} from "../../../stores/tokenStore"

// Component that handles search params logic
const LoginWithSearchParams = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const loginMutation = useLoginApi()
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

    if (code) {
      console.log("Google OAuth code received:", code)
      // Handle Google OAuth code
      handleGoogleOAuthCode(code)
    }

    if (error) {
      console.log("Google OAuth error:", error)
    }

    // If tokens are provided directly in URL parameters, save them
    if (accessToken && refreshToken) {
      console.log("Tokens received from URL parameters")
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
  }, [isClient, searchParams, router, login])

  // Handle Google OAuth code
  const handleGoogleOAuthCode = async (code: string) => {
    try {
      const tokens = await googleLoginMutation.mutateAsync(code)
      if (tokens.accessToken && tokens.refreshToken) {
        const success = login(tokens)
        if (success) {
          // Redirect admin users to admin dashboard, regular users to all-show
          const redirectPath = isAdmin() ? "/admin/dashboard" : "/all-show"
          router.push(redirectPath)
        }
      }
    } catch (error) {
      console.error("Google OAuth error:", error)
    }
  }

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      console.log("Login data:", data)

      // Make API call to authenticate the user
      const tokens = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      // Save tokens to Zustand store if they exist
      if (tokens.accessToken && tokens.refreshToken) {
        const success = login(tokens)
        if (success) {
          console.log("Tokens saved to Zustand store")
          // Redirect admin users to admin dashboard, regular users to all-show
          const redirectPath = isAdmin() ? "/admin/dashboard" : "/all-show"
          router.push(redirectPath)
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      // Handle login error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Simply redirect to the backend Google OAuth endpoint with redirect URL
    const redirectUrl = encodeURIComponent(`${window.location.origin}/login`)
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/google-auth/external/google?redirectUri=${redirectUrl}`
    window.location.href = backendUrl
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
      onSubmit={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      onHomeClick={handleHomeClick}
      isLoading={isLoading}
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
