"use client"

import React, { useState } from "react"
import { useGetVoteHistory } from "../../../../services/LectureVoteServices"
import { Button } from "../../../../components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Building,
} from "lucide-react"

const VoteHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20)

  const { data, isLoading, error, refetch } = useGetVoteHistory({
    page: currentPage,
    pageSize: pageSize,
  })

  const voteHistory = data?.data.items || []
  const totalPages = data?.data.totalPages || 0
  const totalCount = data?.data.totalCount || 0

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen  relative'>
        <div className='container mx-auto px-4 py-8 relative z-10'>
          <div className='flex items-center justify-center min-h-[400px]'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-500 mx-auto mb-4'></div>
              <p className='text-pink-600 font-medium'>
                Đang tải lịch sử bình chọn...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen  relative'>
        <div className='container mx-auto px-4 py-8 relative z-10'>
          <Card className='bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl'>
            <CardContent className='pt-6'>
              <div className='text-center py-8'>
                <div className='w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center'>
                  <Calendar className='h-10 w-10 text-red-500' />
                </div>
                <p className='text-red-500 mb-4 text-lg font-medium'>
                  Có lỗi xảy ra khi tải lịch sử bình chọn
                </p>
                <Button
                  onClick={() => refetch()}
                  className='bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full'
                >
                  Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen  relative'>
      <div className='container mx-auto px-4 py-8 relative z-10 '>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-white bg-clip-text mb-2 '>
            LỊCH SỬ HOẠT ĐỘNG
          </h1>
          <p className='text-gray-600 text-lg'>
            Xem lại tất cả các lần bình chọn giảng viên của bạn
          </p>
        </div>

        <Card className='bg-gradient-to-r from-transparent to-vibrant-pink backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden border-gradient'>
          <CardHeader className='bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-b border-pink-200/50'>
            <CardTitle className='flex items-center gap-3 text-xl'>
              <div className='p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full'>
                <Calendar className='h-5 w-5 text-white' />
              </div>
              <span className='bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
                Lịch sử bình chọn ({totalCount} bản ghi)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className='p-6'>
            {voteHistory.length === 0 ? (
              <div className='text-center py-12'>
                <div className='w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center'>
                  <Calendar className='h-10 w-10 text-pink-500' />
                </div>
                <p className='text-gray-500 text-lg'>
                  Chưa có lịch sử bình chọn nào
                </p>
                <p className='text-gray-400 text-sm mt-2'>
                  Hãy tham gia bình chọn để tạo lịch sử!
                </p>
              </div>
            ) : (
              <>
                <div className='overflow-x-auto rounded-xl border border-pink-200/50'>
                  <table className='w-full'>
                    <thead className='bg-gradient-to-r from-pink-50 to-purple-50'>
                      <tr>
                        <th className='text-left py-4 px-6 font-semibold text-pink-700'>
                          <div className='flex items-center gap-2'>
                            <User className='h-4 w-4' />
                            Giảng viên
                          </div>
                        </th>
                        <th className='text-left py-4 px-6 font-semibold text-pink-700'>
                          <div className='flex items-center gap-2'>
                            <Building className='h-4 w-4' />
                            Khoa/Bộ môn
                          </div>
                        </th>
                        <th className='text-left py-4 px-6 font-semibold text-pink-700'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            Thời gian bình chọn
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-pink-100'>
                      {voteHistory.map((vote: any, index: number) => (
                        <tr
                          key={index}
                          className='hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-purple-50/50 transition-all duration-200'
                        >
                          <td className='py-4 px-6'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center '>
                                <User className='h-4 w-4 text-white' />
                              </div>
                              <span className='font-medium text-white'>
                                {vote.lectureName}
                              </span>
                            </div>
                          </td>
                          <td className='py-4 px-6'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                                <Building className='h-4 w-4 text-white' />
                              </div>
                              <span className='text-white'>
                                {vote.departmentName}
                              </span>
                            </div>
                          </td>
                          <td className='py-4 px-6'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center'>
                                <Calendar className='h-4 w-4 text-white' />
                              </div>
                              <span className='text-white font-medium'>
                                {formatDate(vote.votedAt)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex items-center justify-between mt-8 p-4 bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-xl border border-pink-200/50'>
                    <div className='text-sm font-medium text-pink-700'>
                      Trang {currentPage} / {totalPages}
                    </div>
                    <div className='flex items-center gap-3'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className='border-pink-300 text-pink-700 bg-pink-50 hover:bg-pink-100 hover:border-pink-400 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <ChevronLeft className='h-4 w-4' />
                        Trước
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className='border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Sau
                        <ChevronRight className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VoteHistoryPage
