"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import LoginComponent from "../../components/Auth/LoginComponent"
import { type LoginFormData } from "../../interfaces/auth/Schema/Login"

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      console.log("Login data:", data)

      // Here you would typically make an API call to authenticate the user
      // const response = await authService.login(data)

      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to dashboard or home page after successful login
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      // Handle login error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  return (
    <LoginComponent
      onSubmit={handleLogin}
      onHomeClick={handleHomeClick}
      isLoading={isLoading}
    />
  )
}

export default LoginPage
