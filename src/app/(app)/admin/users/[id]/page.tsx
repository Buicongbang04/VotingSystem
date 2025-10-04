"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  useGetAccountById,
  useUpdateAccount,
} from "@/src/services/AccountServices"
import { Account, UpdateAccountRequest } from "@/src/interfaces/Account/Account"
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  GraduationCap,
  Building,
  Calendar,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { toast } from "sonner"

export default function EditUser() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.id as string

  // Form state
  const [formData, setFormData] = useState<UpdateAccountRequest>({
    studentCode: "",
    email: "",
    name: "",
    semester: undefined,
    department: "",
    isAdmin: false,
  })

  // API hooks
  const {
    data: accountResponse,
    isLoading: isLoadingAccount,
    isError: isAccountError,
    error: accountError,
  } = useGetAccountById(userId)

  const updateAccountMutation = useUpdateAccount()

  // Load account data into form
  useEffect(() => {
    if (accountResponse?.data) {
      const account = accountResponse.data
      setFormData({
        studentCode: account.studentCode || "",
        email: account.email || "",
        name: account.name || "",
        semester: account.semester || undefined,
        department: account.department || "",
        isAdmin: account.isAdmin || false,
      })
    }
  }, [accountResponse])

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "semester"
          ? value
            ? parseInt(value)
            : undefined
          : value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Prepare data with only non-empty values
      const updateData: UpdateAccountRequest = {
        studentCode: formData.studentCode || undefined,
        email: formData.email || undefined,
        name: formData.name || undefined,
        semester: formData.semester || undefined,
        department: formData.department || undefined,
        isAdmin: formData.isAdmin,
      }

      // Remove undefined values
      const cleanedData = Object.fromEntries(
        Object.entries(updateData).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      ) as UpdateAccountRequest

      await updateAccountMutation.mutateAsync({
        id: userId,
        data: cleanedData,
      })

      toast.success("Cập nhật thông tin người dùng thành công!")
      router.push("/admin/users")
    } catch (error: any) {
      console.error("Error updating account:", error)
      toast.error("Có lỗi xảy ra khi cập nhật thông tin người dùng")
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.push("/admin/users")
  }

  // Loading state
  if (isLoadingAccount) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center py-12'>
          <div className='flex items-center space-x-3'>
            <Loader2 className='w-6 h-6 animate-spin text-vibrant-pink' />
            <span className='text-white/70'>
              Đang tải thông tin người dùng...
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (isAccountError) {
    return (
      <div className='p-6'>
        <Card className='p-6 bg-red-500/10 backdrop-blur-md border-red-500/20'>
          <div className='flex items-center space-x-3'>
            <AlertCircle className='w-6 h-6 text-red-400' />
            <div>
              <h3 className='text-lg font-semibold text-red-400 mb-2'>
                Lỗi khi tải thông tin người dùng
              </h3>
              <p className='text-red-400/80 mb-4'>
                Không thể tải thông tin người dùng. Vui lòng thử lại.
              </p>
              <p className='text-red-400/60 text-sm mb-4'>
                Chi tiết lỗi: {accountError?.message || "Unknown error"}
              </p>
              <Button
                onClick={() => router.push("/admin/users")}
                variant='outline'
                className='text-red-400 border-red-400/20 hover:bg-red-400/10'
              >
                Quay lại danh sách
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const account = accountResponse?.data

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button
            onClick={() => router.push("/admin/users")}
            variant='outline'
            className='text-white border-white/20 hover:bg-white/10'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Button>
          <div className='flex items-center space-x-4'>
            <div className='p-3 bg-gradient-to-r from-vibrant-pink/20 to-purple-500/20 rounded-xl'>
              <User className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-white'>
                Chỉnh sửa thông tin người dùng
              </h1>
              <p className='text-white/70'>
                Cập nhật thông tin cho {account?.name || "người dùng"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      {account && (
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='flex items-center space-x-4 mb-6'>
            <div className='p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl'>
              <User className='w-6 h-6 text-white' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-white'>
                Thông tin hiện tại
              </h3>
              <p className='text-white/70'>
                Mã sinh viên: {account.studentCode}
              </p>
            </div>
            <div className='ml-auto'>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                  account.isAdmin
                    ? "bg-vibrant-pink/20 text-vibrant-pink"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {account.isAdmin ? (
                  <>
                    <Shield className='w-3 h-3' />
                    <span>Admin</span>
                  </>
                ) : (
                  <>
                    <User className='w-3 h-3' />
                    <span>User</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Edit Form */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex items-center space-x-3 mb-6'>
            <div className='p-2 bg-gradient-to-r from-vibrant-pink/20 to-purple-500/20 rounded-lg'>
              <Save className='w-5 h-5 text-vibrant-pink' />
            </div>
            <h3 className='text-lg font-semibold text-white'>
              Chỉnh sửa thông tin
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Student Code */}
            <div className='space-y-2'>
              <Label
                htmlFor='studentCode'
                className='text-white flex items-center space-x-2'
              >
                <GraduationCap className='w-4 h-4' />
                <span>Mã sinh viên</span>
              </Label>
              <Input
                id='studentCode'
                name='studentCode'
                type='text'
                value={formData.studentCode}
                onChange={handleInputChange}
                className='bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-vibrant-pink focus:ring-vibrant-pink'
                placeholder='Nhập mã sinh viên'
                required
              />
            </div>

            {/* Name */}
            <div className='space-y-2'>
              <Label
                htmlFor='name'
                className='text-white flex items-center space-x-2'
              >
                <User className='w-4 h-4' />
                <span>Họ và tên</span>
              </Label>
              <Input
                id='name'
                name='name'
                type='text'
                value={formData.name}
                onChange={handleInputChange}
                className='bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-vibrant-pink focus:ring-vibrant-pink'
                placeholder='Nhập họ và tên'
                required
              />
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-white flex items-center space-x-2'
              >
                <Mail className='w-4 h-4' />
                <span>Email</span>
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                className='bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-vibrant-pink focus:ring-vibrant-pink'
                placeholder='Nhập email'
                required
              />
            </div>

            {/* Department */}
            <div className='space-y-2'>
              <Label
                htmlFor='department'
                className='text-white flex items-center space-x-2'
              >
                <Building className='w-4 h-4' />
                <span>Khoa</span>
              </Label>
              <Input
                id='department'
                name='department'
                type='text'
                value={formData.department}
                onChange={handleInputChange}
                className='bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-vibrant-pink focus:ring-vibrant-pink'
                placeholder='Nhập khoa/bộ môn'
              />
            </div>

            {/* Semester */}
            <div className='space-y-2'>
              <Label
                htmlFor='semester'
                className='text-white flex items-center space-x-2'
              >
                <Calendar className='w-4 h-4' />
                <span>Học kỳ</span>
              </Label>
              <select
                id='semester'
                name='semester'
                value={formData.semester || ""}
                onChange={handleInputChange}
                className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
              >
                <option value=''>Chọn học kỳ</option>
                <option value='0'>Học kỳ 0</option>
                <option value='1'>Học kỳ 1</option>
                <option value='2'>Học kỳ 2</option>
                <option value='3'>Học kỳ 3</option>
                <option value='4'>Học kỳ 4</option>
                <option value='5'>Học kỳ 5</option>
                <option value='6'>Học kỳ 6</option>
                <option value='7'>Học kỳ 7</option>
                <option value='8'>Học kỳ 8</option>
                <option value='9'>Học kỳ 9</option>
              </select>
            </div>

            {/* Admin Toggle */}
            <div className='space-y-2'>
              <Label
                htmlFor='isAdmin'
                className='text-white flex items-center space-x-2'
              >
                <Shield className='w-4 h-4' />
                <span>Quyền quản trị</span>
              </Label>
              <div className='flex items-center space-x-3 p-3 bg-white/10 border border-white/20 rounded-lg'>
                <input
                  type='checkbox'
                  id='isAdmin'
                  name='isAdmin'
                  checked={formData.isAdmin || false}
                  onChange={handleInputChange}
                  className='w-5 h-5 text-vibrant-pink bg-white/10 border-white/20 rounded focus:ring-vibrant-pink focus:ring-2'
                />
                <label htmlFor='isAdmin' className='text-white text-sm'>
                  {formData.isAdmin ? "Quản trị viên" : "Người dùng thường"}
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end space-x-3 pt-6 border-t border-white/20'>
            <Button
              type='button'
              onClick={handleCancel}
              variant='outline'
              className='text-white border-white/20 hover:bg-white/10'
            >
              Hủy
            </Button>
            <Button
              type='submit'
              disabled={updateAccountMutation.isPending}
              className='bg-vibrant-pink hover:bg-vibrant-pink/80 text-white flex items-center space-x-2'
            >
              {updateAccountMutation.isPending ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span>Đang cập nhật...</span>
                </>
              ) : (
                <>
                  <CheckCircle className='w-4 h-4' />
                  <span>Cập nhật</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
