"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Home } from "lucide-react"
import {
  loginSchema,
  type LoginFormData,
} from "../../interfaces/auth/Schema/Login"

interface LoginComponentProps {
  onSubmit?: (data: LoginFormData) => void
  onHomeClick?: () => void
  isLoading?: boolean
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  onSubmit,
  onHomeClick,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberAccount: false,
    },
  })

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit?.(data)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 flex flex-col items-center justify-center p-4'>
      {/* FPT Education Logo */}
      <div className='mb-8 text-center'>
        <div className='flex items-center justify-center mb-2'>
          <span className='text-2xl font-bold text-blue-600'>FPT</span>
          <span className='text-2xl font-bold text-orange-500 mx-1'>
            Education
          </span>
          <span className='text-2xl font-bold text-green-600'></span>
        </div>
        <h1 className='text-4xl font-bold text-orange-500'>FPT UNIVERSITY</h1>
      </div>

      {/* Login Form Container */}
      <div className='relative'>
        {/* Gradient Platform */}
        <div className='absolute -inset-2 bg-gradient-to-r from-purple-300 to-blue-300 rounded-2xl blur-sm opacity-50'></div>

        {/* Main Form Container */}
        <div className='relative bg-pink-300/50 p-8 w-5xl max-w-md shadow-2xl'>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
            {/* Username Field */}
            <div className='space-y-2'>
              {/* <label
                htmlFor='username'
                className='block text-sm font-medium text-pink-300'
              >
                Tên tài khoản
              </label> */}
              <input
                {...register("username")}
                type='text'
                id='username'
                className={`w-full px-4 py-3 bg-white border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900 placeholder-gray-500 ${
                  errors.username ? "ring-2 ring-red-400" : ""
                }`}
                placeholder='Tên tài khoản'
                disabled={isSubmitting || isLoading}
              />
              {errors.username && (
                <p className='text-red-300 text-sm mt-1'>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              {/* <label
                htmlFor='password'
                className='block text-sm font-medium text-pink-300'
              >
                Mật khẩu
              </label> */}
              <div className='relative'>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id='password'
                  className={`w-full px-4 py-3 bg-white  border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900 placeholder-gray-500 pr-12 ${
                    errors.password ? "ring-2 ring-red-400" : ""
                  }`}
                  placeholder='Mật khẩu'
                  disabled={isSubmitting || isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-400 disabled:opacity-50'
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-300 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Account and Forgot Password */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center space-x-2 cursor-pointer'>
                <input
                  {...register("rememberAccount")}
                  type='checkbox'
                  className='w-4 h-4 text-pink-500 bg-white border-2 border-white rounded focus:ring-pink-400 focus:ring-2'
                  disabled={isSubmitting || isLoading}
                />
                <span className='text-sm text-white'>Ghi nhớ tài khoản</span>
              </label>
              <a
                href='#'
                className='text-sm text-blue-400 hover:text-blue-300 underline'
              >
                Quên mật khẩu
              </a>
            </div>

            {/* Login Button and Home Icon */}
            <div className='flex items-center justify-center space-x-3'>
              <button
                type='submit'
                disabled={isSubmitting || isLoading}
                className='flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-400 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:cursor-not-allowed'
              >
                {isSubmitting || isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </button>
              <button
                type='button'
                onClick={onHomeClick}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105'
                disabled={isSubmitting || isLoading}
              >
                <Home size={20} className='text-gray-600' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
