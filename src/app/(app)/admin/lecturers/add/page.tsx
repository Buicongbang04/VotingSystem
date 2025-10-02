"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ALL_DEPARTMENTS } from "@/src/constants/Departments"
import { CreateLectureRequest } from "@/src/interfaces/Lecture/Lecture"
import {
  User,
  Mail,
  Building,
  Quote,
  Image,
  ArrowLeft,
  Save,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  email: string
  department: string
  quote: string
  avatarUrl: string
}

interface FormErrors {
  name?: string
  email?: string
  department?: string
  quote?: string
  avatarUrl?: string
}

export default function AddLecturer() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    department: "",
    quote: "",
    avatarUrl: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Tên giảng viên là bắt buộc"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Tên giảng viên phải có ít nhất 2 ký tự"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.department) {
      newErrors.department = "Khoa là bắt buộc"
    }

    if (!formData.quote.trim()) {
      newErrors.quote = "Câu nói yêu thích là bắt buộc"
    } else if (formData.quote.trim().length < 10) {
      newErrors.quote = "Câu nói yêu thích phải có ít nhất 10 ký tự"
    }

    if (!formData.avatarUrl.trim()) {
      newErrors.avatarUrl = "Ảnh đại diện là bắt buộc"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          avatarUrl: "Vui lòng chọn file ảnh hợp lệ",
        }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          avatarUrl: "Kích thước file không được vượt quá 5MB",
        }))
        return
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl)
      setFormData((prev) => ({ ...prev, avatarUrl: file.name }))

      // Clear any existing error
      setErrors((prev) => ({ ...prev, avatarUrl: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      const lecturerData: CreateLectureRequest = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department,
        quote: formData.quote.trim(),
        avatarUrl: formData.avatarUrl,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Creating lecturer:", lecturerData)

      // Show success message and redirect
      alert("Thêm giảng viên thành công!")
      router.push("/admin/lecturers")
    } catch (error) {
      console.error("Error creating lecturer:", error)
      alert("Có lỗi xảy ra khi thêm giảng viên. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (
      confirm("Bạn có chắc chắn muốn hủy? Tất cả thông tin đã nhập sẽ bị mất.")
    ) {
      router.push("/admin/lecturers")
    }
  }

  return (
    <div className='min-h-screen  p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-4 mb-4'>
            <Link href='/admin/lecturers'>
              <Button
                variant='outline'
                className='text-white border-white/20 hover:bg-white/10'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Quay lại
              </Button>
            </Link>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold text-white'>
                Thêm giảng viên mới
              </h1>
              <p className='text-white/70 mt-2'>
                Điền thông tin chi tiết để thêm giảng viên vào hệ thống
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Left Column - Basic Info */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Basic Information */}
              <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
                <div className='flex items-center space-x-3 mb-6'>
                  <User className='w-6 h-6 text-vibrant-pink' />
                  <h2 className='text-xl font-semibold text-white'>
                    Thông tin cơ bản
                  </h2>
                </div>

                <div className='space-y-4'>
                  {/* Name */}
                  <div>
                    <Label
                      htmlFor='name'
                      className='text-white font-medium mb-2 block'
                    >
                      Tên giảng viên *
                    </Label>
                    <Input
                      id='name'
                      type='text'
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder='Nhập tên đầy đủ của giảng viên'
                      className={`bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-vibrant-pink ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor='email'
                      className='text-white font-medium mb-2 block'
                    >
                      Email *
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder='example@university.edu'
                      className={`bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-vibrant-pink ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <Label
                      htmlFor='department'
                      className='text-white font-medium mb-2 block'
                    >
                      Khoa *
                    </Label>
                    <select
                      id='department'
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      className={`w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink ${
                        errors.department ? "border-red-500" : ""
                      }`}
                    >
                      <option value=''>Chọn khoa</option>
                      {ALL_DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.department}</span>
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <div>
                    <Label
                      htmlFor='quote'
                      className='text-white font-medium mb-2 block'
                    >
                      Câu nói yêu thích *
                    </Label>
                    <textarea
                      id='quote'
                      value={formData.quote}
                      onChange={(e) =>
                        handleInputChange("quote", e.target.value)
                      }
                      placeholder='Nhập câu nói yêu thích của giảng viên...'
                      rows={4}
                      className={`w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink resize-none ${
                        errors.quote ? "border-red-500" : ""
                      }`}
                    />
                    {errors.quote && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.quote}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Avatar Upload */}
            <div className='space-y-6'>
              <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
                <div className='flex items-center space-x-3 mb-6'>
                  <Image className='w-6 h-6 text-vibrant-pink' />
                  <h2 className='text-xl font-semibold text-white'>
                    Ảnh đại diện
                  </h2>
                </div>

                <div className='space-y-4'>
                  {/* Image Preview */}
                  <div className='aspect-square bg-white/5 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden'>
                    {previewImage ? (
                      <div className='relative w-full h-full'>
                        <img
                          src={previewImage}
                          alt='Preview'
                          className='w-full h-full object-cover'
                        />
                        <button
                          type='button'
                          onClick={() => {
                            setPreviewImage(null)
                            setFormData((prev) => ({ ...prev, avatarUrl: "" }))
                          }}
                          className='absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    ) : (
                      <div className='text-center'>
                        <Image className='w-12 h-12 text-white/40 mx-auto mb-2' />
                        <p className='text-white/60 text-sm'>Chưa có ảnh</p>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div>
                    <input
                      type='file'
                      id='avatar'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='hidden'
                    />
                    <Label
                      htmlFor='avatar'
                      className='w-full p-3 bg-gradient-to-r from-vibrant-pink to-purple-500 hover:from-vibrant-pink/80 hover:to-purple-500/80 text-white rounded-lg cursor-pointer flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105'
                    >
                      <Upload className='w-4 h-4' />
                      <span>Chọn ảnh đại diện</span>
                    </Label>
                    {errors.avatarUrl && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.avatarUrl}</span>
                      </div>
                    )}
                    <p className='text-white/60 text-xs mt-2'>
                      Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB
                    </p>
                  </div>
                </div>
              </Card>

              {/* Form Actions */}
              <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-white mb-4'>
                    Hành động
                  </h3>

                  <div className='space-y-3'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-gradient-to-r from-vibrant-pink to-purple-500 hover:from-vibrant-pink/80 hover:to-purple-500/80 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSubmitting ? (
                        <div className='flex items-center space-x-2'>
                          <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                          <span>Đang thêm...</span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <Save className='w-4 h-4' />
                          <span>Thêm giảng viên</span>
                        </div>
                      )}
                    </Button>

                    <Button
                      type='button'
                      onClick={handleCancel}
                      variant='outline'
                      className='w-full text-white border-white/20 hover:bg-white/10'
                    >
                      Hủy bỏ
                    </Button>
                  </div>

                  {/* Form Status */}
                  <div className='pt-4 border-t border-white/20'>
                    <div className='flex items-center space-x-2 text-sm'>
                      {Object.keys(errors).length === 0 &&
                      formData.name &&
                      formData.email &&
                      formData.department &&
                      formData.quote &&
                      formData.avatarUrl ? (
                        <>
                          <CheckCircle className='w-4 h-4 text-green-400' />
                          <span className='text-green-400'>
                            Form đã sẵn sàng để gửi
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className='w-4 h-4 text-yellow-400' />
                          <span className='text-yellow-400'>
                            Vui lòng điền đầy đủ thông tin
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
