"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Account } from "../interfaces/Account/Account"

// Zod schema based on Account interface (simplified)
const accountSchema = z.object({
  studentCode: z
    .string()
    .min(1, "Vui lòng nhập mã số sinh viên")
    .regex(
      /^[A-Z]{2}[0-9]{6}$/,
      "Mã số sinh viên phải có 2 chữ cái in hoa và 6 số"
    ),
  semester: z
    .number()
    .min(0, "Vui lòng chọn học kỳ")
    .max(9, "Học kỳ không được quá 9"),
  department: z.string().min(1, "Vui lòng chọn chuyên ngành").optional(),
  isAdmin: z.boolean(),
})

type AccountFormData = z.infer<typeof accountSchema>

interface StudentInfoFormProps {
  onConfirm?: (data: AccountFormData) => void
  onCancel?: () => void
}

const majors = [
  "Kỹ thuật phần mềm",
  "An toàn thông tin",
  "Trí tuệ nhân tạo",
  "Ngôn ngữ Anh",
  "Ngôn ngữ Nhật",
  "Thiết kế Mỹ thuật số",
  "Quản trị Truyền thông Đa phương tiện",
  "Quản trị Khách sạn",
  "Hệ thống thông tin",
  "Quản trị Dịch vụ Du lịch & Lữ hành",
  "Digital Marketing",
  "Kinh Doanh Quốc tế",
  "Tài chính",
]

const studyPeriods = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  onConfirm,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
    defaultValues: {
      isAdmin: false,
    },
  })

  const [showMajorDropdown, setShowMajorDropdown] = React.useState(false)
  const [showPeriodDropdown, setShowPeriodDropdown] = React.useState(false)

  const watchedValues = watch()

  const onSubmit = (data: AccountFormData) => {
    onConfirm?.(data)
  }

  const handleCancel = () => {
    onCancel?.()
  }

  return (
    <div className='relative'>
      <div className='relative z-10 flex items-center justify-center p-4'>
        <Card className='w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-xl'>
          <CardHeader className='text-center pb-4'>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
              THÔNG TIN CỦA BẠN
            </CardTitle>
            <CardDescription className='text-pink-500 text-sm mt-2'>
              Vui lòng chọn thông tin chính xác
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* Student Code Field */}
              <div className='space-y-2'>
                <label className='text-pink-700 font-medium text-sm'>
                  Mã số sinh viên
                </label>
                <input
                  type='text'
                  {...register("studentCode")}
                  placeholder='Nhập mã số sinh viên'
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white",
                    errors.studentCode ? "border-red-500" : "border-gray-200"
                  )}
                />
                {errors.studentCode && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.studentCode.message}
                  </p>
                )}
              </div>

              {/* Department Field */}
              <div className='space-y-2 relative'>
                <label className='text-pink-700 font-medium text-sm'>
                  Chuyên ngành
                </label>
                <div className='relative'>
                  <button
                    type='button'
                    onClick={() => setShowMajorDropdown(!showMajorDropdown)}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white text-left flex items-center justify-between",
                      errors.department ? "border-red-500" : "border-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "truncate",
                        watchedValues.department
                          ? "text-gray-900"
                          : "text-gray-400"
                      )}
                    >
                      {watchedValues.department || "Chọn chuyên ngành"}
                    </span>
                    <svg
                      className={cn(
                        "w-5 h-5 text-purple-400 transition-transform duration-200",
                        showMajorDropdown ? "rotate-180" : ""
                      )}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>

                  {showMajorDropdown && (
                    <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto'>
                      {majors.map((major) => (
                        <button
                          key={major}
                          type='button'
                          onClick={() => {
                            setValue("department", major, {
                              shouldValidate: true,
                            })
                            setShowMajorDropdown(false)
                          }}
                          className='w-full px-4 py-3 text-left hover:bg-pink-50 transition-colors duration-150 text-sm'
                        >
                          {major}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.department && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.department.message}
                  </p>
                )}
              </div>

              {/* Study Period Field */}
              <div className='space-y-2 relative'>
                <label className='text-pink-700 font-medium text-sm'>
                  Học kỳ
                </label>
                <div className='relative'>
                  <button
                    type='button'
                    onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                    className={cn(
                      "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white text-left flex items-center justify-between",
                      errors.semester ? "border-red-500" : "border-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "truncate",
                        watchedValues.semester !== undefined
                          ? "text-gray-900"
                          : "text-gray-400"
                      )}
                    >
                      {watchedValues.semester !== undefined
                        ? `Học kỳ ${watchedValues.semester}`
                        : "Chọn học kỳ"}
                    </span>
                    <svg
                      className={cn(
                        "w-5 h-5 text-purple-400 transition-transform duration-200",
                        showPeriodDropdown ? "rotate-180" : ""
                      )}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>

                  {showPeriodDropdown && (
                    <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                      {studyPeriods.map((period) => (
                        <button
                          key={period}
                          type='button'
                          onClick={() => {
                            setValue("semester", period, {
                              shouldValidate: true,
                            })
                            setShowPeriodDropdown(false)
                          }}
                          className='w-full px-4 py-3 text-left hover:bg-pink-50 transition-colors duration-150 text-sm'
                        >
                          Học kỳ {period}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.semester && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.semester.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4 pt-4'>
                <Button
                  type='button'
                  onClick={handleCancel}
                  variant='outline'
                  className='flex-1 border-pink-300 text-pink-700 bg-pink-50 hover:bg-pink-100 font-semibold'
                >
                  HUỶ BỎ
                </Button>
                <Button
                  type='submit'
                  className='flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold'
                  disabled={!isValid}
                >
                  XÁC NHẬN
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StudentInfoForm
