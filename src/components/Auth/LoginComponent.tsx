"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Home } from "lucide-react";
import {
  loginSchema,
  type LoginFormData,
} from "../../interfaces/auth/Schema/Login";

interface LoginComponentProps {
  onSubmit?: (data: LoginFormData) => void;
  onGoogleLogin?: () => void;
  onHomeClick?: () => void;
  isLoading?: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  onSubmit,
  onGoogleLogin,
  onHomeClick,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberAccount: false,
    },
  });

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit?.(data);
  };

  return (
    <div className="bg-login min-h-screen flex flex-col items-center justify-center p-4">
      {/* FPT Education Logo */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl font-bold text-blue-600">FPT</span>
          <span className="text-2xl font-bold text-orange-500 mx-1">
            Education
          </span>
          <span className="text-2xl font-bold text-green-600"></span>
        </div>
        <h1 className="text-4xl font-bold text-orange-500">FPT UNIVERSITY</h1>
      </div>

      {/* Login Form Container */}
      <div className="relative">
        {/* Gradient Platform */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 to-blue-300 rounded-2xl blur-sm opacity-50"></div>

        {/* Main Form Container */}
        <div className="relative bg-pink-300/50 p-8 w-5xl max-w-md shadow-2xl">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              {/* <label
                htmlFor='email'
                className='block text-sm font-medium text-pink-300'
              >
                Email
              </label> */}
              <input
                {...register("email")}
                type="email"
                id="email"
                className={`w-full px-4 py-3 bg-white border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900 placeholder-gray-500 ${
                  errors.email ? "ring-2 ring-red-400" : ""
                }`}
                placeholder="Email"
                disabled={isSubmitting || isLoading}
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              {/* <label
                htmlFor='password'
                className='block text-sm font-medium text-pink-300'
              >
                Mật khẩu
              </label> */}
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full px-4 py-3 bg-white  border-0 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-900 placeholder-gray-500 pr-12 ${
                    errors.password ? "ring-2 ring-red-400" : ""
                  }`}
                  placeholder="Mật khẩu"
                  disabled={isSubmitting || isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-400 disabled:opacity-50"
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Account and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  {...register("rememberAccount")}
                  type="checkbox"
                  className="w-4 h-4 text-pink-500 bg-white border-2 border-white rounded focus:ring-pink-400 focus:ring-2"
                  disabled={isSubmitting || isLoading}
                />
                <span className="text-sm text-white">Ghi nhớ tài khoản</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Quên mật khẩu
              </a>
            </div>

            {/* Login Button and Home Icon */}
            <div className="flex items-center justify-center space-x-3">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-400 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:cursor-not-allowed"
              >
                {isSubmitting || isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </button>
              <button
                type="button"
                onClick={onHomeClick}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                disabled={isSubmitting || isLoading}
              >
                <Home size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-pink-300/50 text-white">Hoặc</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={onGoogleLogin}
              disabled={isSubmitting || isLoading}
              className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-full border border-gray-300 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Đăng nhập với Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
