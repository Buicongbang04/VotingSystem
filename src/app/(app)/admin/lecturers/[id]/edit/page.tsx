"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ALL_DEPARTMENTS } from "@/src/constants/Departments"
import { UpdateLectureRequest } from "@/src/interfaces/Lecture/Lecture"
import {
  useGetLectureById,
  useUpdateLecture,
} from "@/src/services/LectureServices"
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
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { CloudinaryButton } from "@/src/components/CloudinaryButton"

interface FormData {
  name: string
  email: string
  department: string
  quote: string
  avatarUrl: string
  AccountName: string
}

interface FormErrors {
  name?: string
  email?: string
  department?: string
  quote?: string
  avatarUrl?: string
  AccountName?: string
}

export default function EditLecturer() {
  const router = useRouter()
  const params = useParams()
  const lecturerId = params?.id as string

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    department: "",
    quote: "",
    avatarUrl: "",
    AccountName: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // API hooks
  const {
    data: lectureResponse,
    isLoading,
    isError,
    error,
  } = useGetLectureById(lecturerId)

  const updateLectureMutation = useUpdateLecture()

  // Populate form data when lecture data is loaded
  useEffect(() => {
    if (lectureResponse?.data) {
      const lecture = lectureResponse.data
      setFormData({
        name: lecture.name || "",
        email: lecture.email || "",
        department: lecture.department || "",
        quote: lecture.quote || "",
        avatarUrl: lecture.avatarUrl || "",
        AccountName: lecture.accountName || "",
      })
      setPreviewImage(lecture.avatarUrl || null)
    }
  }, [lectureResponse])

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

    if (!formData.AccountName.trim()) {
      newErrors.AccountName = "Tên tài khoản là bắt buộc"
    } else if (formData.AccountName.trim().length < 3) {
      newErrors.AccountName = "Tên tài khoản phải có ít nhất 3 ký tự"
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

  const handleCloudinaryUpload = (url: string, publicId: string) => {
    setPreviewImage(url)
    setFormData((prev) => ({ ...prev, avatarUrl: url }))
    setErrors((prev) => ({ ...prev, avatarUrl: undefined }))
    toast.success("Ảnh đã được tải lên thành công!")
  }

  const handleCloudinaryError = (error: string) => {
    setErrors((prev) => ({
      ...prev,
      avatarUrl: `Lỗi tải ảnh: ${error}`,
    }))
    toast.error("Có lỗi xảy ra khi tải ảnh lên")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const lecturerData: UpdateLectureRequest = {
        id: lecturerId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department,
        quote: formData.quote.trim(),
        avatarUrl: formData.avatarUrl,
        accountName: formData.AccountName.trim(),
      }

      await updateLectureMutation.mutateAsync(lecturerData)
      toast.success("Cập nhật giảng viên thành công!")
      router.push("/admin/lecturers")
    } catch (error: any) {
      console.error("Error updating lecturer:", error)
      toast.error("Có lỗi xảy ra khi cập nhật giảng viên. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (confirm("Bạn có chắc chắn muốn hủy? Tất cả thay đổi sẽ bị mất.")) {
      router.push("/admin/lecturers")
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen p-6 flex items-center justify-center'>
        <div className='flex items-center space-x-3'>
          <Loader2 className='w-6 h-6 animate-spin text-vibrant-pink' />
          <span className='text-white/70'>
            Đang tải thông tin giảng viên...
          </span>
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className='min-h-screen p-6'>
        <div className='max-w-4xl mx-auto'>
          <Card className='p-6 bg-red-500/10 backdrop-blur-md border-red-500/20'>
            <div className='flex items-center space-x-3'>
              <AlertCircle className='w-6 h-6 text-red-400' />
              <div>
                <h3 className='text-lg font-semibold text-red-400 mb-2'>
                  Lỗi khi tải thông tin giảng viên
                </h3>
                <p className='text-red-400/80 mb-4'>
                  Không thể tải thông tin giảng viên. Vui lòng thử lại.
                </p>
                <p className='text-red-400/60 text-sm mb-4'>
                  Chi tiết lỗi: {error?.message || "Unknown error"}
                </p>
                <div className='flex space-x-3'>
                  <Button
                    onClick={() => router.push("/admin/lecturers")}
                    variant='outline'
                    className='text-red-400 border-red-400/20 hover:bg-red-400/10'
                  >
                    Quay lại danh sách
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen p-6'>
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
                Chỉnh sửa giảng viên
              </h1>
              <p className='text-white/70 mt-2'>
                Cập nhật thông tin chi tiết của giảng viên
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

                  {/* Account Name */}
                  <div>
                    <Label
                      htmlFor='accountName'
                      className='text-white font-medium mb-2 block'
                    >
                      Tên tài khoản *
                    </Label>
                    <Input
                      id='accountName'
                      type='text'
                      value={formData.AccountName}
                      onChange={(e) =>
                        handleInputChange("AccountName", e.target.value)
                      }
                      placeholder='Nhập tên tài khoản'
                      className={`bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-vibrant-pink ${
                        errors.AccountName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.AccountName && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.AccountName}</span>
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
                        <option
                          className='text-black'
                          key={dept.id}
                          value={dept.name}
                        >
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
                    <CloudinaryButton
                      className='w-full p-3 bg-gradient-to-r from-vibrant-pink to-purple-500 hover:from-vibrant-pink/80 hover:to-purple-500/80 text-white rounded-lg transition-all duration-300 hover:scale-105'
                      text='Chọn ảnh đại diện'
                      uploadPreset='votingsystem'
                      onUploaded={handleCloudinaryUpload}
                      onError={handleCloudinaryError}
                    />
                    {errors.avatarUrl && (
                      <div className='flex items-center space-x-2 mt-2 text-red-400 text-sm'>
                        <AlertCircle className='w-4 h-4' />
                        <span>{errors.avatarUrl}</span>
                      </div>
                    )}
                    <p className='text-white/60 text-xs mt-2'>
                      Hỗ trợ: JPG, PNG, GIF. Tự động tối ưu hóa
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
                          <span>Đang cập nhật...</span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <Save className='w-4 h-4' />
                          <span>Cập nhật giảng viên</span>
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
                      formData.AccountName &&
                      formData.department &&
                      formData.quote &&
                      formData.avatarUrl ? (
                        <>
                          <CheckCircle className='w-4 h-4 text-green-400' />
                          <span className='text-green-400'>
                            Form đã sẵn sàng để cập nhật
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
