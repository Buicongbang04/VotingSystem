"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import {
  useGetAllLectures,
  useDownloadTemplate,
  useDeleteLecture,
  useActivateLecturer,
  useDeactivateLecturer,
} from "@/src/services/LectureServices"
import { Lecture } from "@/src/interfaces/Lecture/Lecture"
import {
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Edit,
  Eye,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react"

export default function AdminLecturers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")

  // API hooks
  const {
    data: lecturesResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllLectures()

  const downloadTemplateMutation = useDownloadTemplate()
  const deleteLectureMutation = useDeleteLecture()
  const activateLecturerMutation = useActivateLecturer()
  const deactivateLecturerMutation = useDeactivateLecturer()

  // Get lectures data
  const lectures = lecturesResponse?.data || []

  // Filter lectures
  const filteredLecturers = lectures.filter((lecturer: Lecture) => {
    const matchesSearch =
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      !departmentFilter || lecturer.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  // Calculate rank based on votes
  const lecturersWithRank = filteredLecturers
    .sort((a, b) => b.votes - a.votes)
    .map((lecturer, index) => ({
      ...lecturer,
      rank: index + 1,
    }))

  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplateMutation.mutateAsync()
    } catch (error) {
      console.error("Error downloading template:", error)
    }
  }

  const handleDeleteLecture = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giảng viên này?")) {
      try {
        await deleteLectureMutation.mutateAsync(id)
        refetch()
      } catch (error) {
        console.error("Error deleting lecture:", error)
      }
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await deactivateLecturerMutation.mutateAsync(id)
      } else {
        await activateLecturerMutation.mutateAsync(id)
      }
      refetch()
    } catch (error) {
      console.error("Error toggling lecturer status:", error)
    }
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Quản lý giảng viên</h1>
          <p className='text-white/70'>
            {isLoading
              ? "Đang tải..."
              : `${lecturersWithRank.length} giảng viên`}
          </p>
        </div>
        <div className='flex space-x-3'>
          <button
            onClick={handleDownloadTemplate}
            disabled={downloadTemplateMutation.isPending}
            className='text-white border-white/20 hover:bg-white/10 flex items-center space-x-2'
          >
            {downloadTemplateMutation.isPending ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Download className='w-4 h-4' />
            )}
            <span>Tải template Excel</span>
          </button>
          <Link href='/admin/lecturers/add'>
            <Button className='bg-vibrant-pink hover:bg-vibrant-pink/80 text-white'>
              Thêm giảng viên mới
            </Button>
          </Link>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <Card className='p-6 bg-red-500/10 backdrop-blur-md border-red-500/20'>
          <div className='flex items-center space-x-3'>
            <AlertCircle className='w-6 h-6 text-red-400' />
            <div>
              <h3 className='text-lg font-semibold text-red-400 mb-2'>
                Lỗi khi tải dữ liệu
              </h3>
              <p className='text-red-400/80 mb-4'>
                Không thể tải danh sách giảng viên. Vui lòng thử lại.
              </p>
              <p className='text-red-400/60 text-sm mb-4'>
                Chi tiết lỗi: {error?.message || "Unknown error"}
              </p>
              <Button
                onClick={() => refetch()}
                variant='outline'
                className='text-red-400 border-red-400/20 hover:bg-red-400/10'
              >
                Thử lại
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Template Download Info */}
      {downloadTemplateMutation.isSuccess && (
        <Card className='p-4 bg-green-500/10 backdrop-blur-md border-green-500/20'>
          <div className='flex items-center space-x-3'>
            <CheckCircle className='w-5 h-5 text-green-400' />
            <div>
              <p className='text-green-400 font-medium'>
                Template đã được tải xuống thành công!
              </p>
              <p className='text-green-400/80 text-sm'>
                File Excel đã được lưu vào thư mục Downloads của bạn.
              </p>
            </div>
          </div>
        </Card>
      )}

      {downloadTemplateMutation.isError && (
        <Card className='p-4 bg-red-500/10 backdrop-blur-md border-red-500/20'>
          <div className='flex items-center space-x-3'>
            <AlertCircle className='w-5 h-5 text-red-400' />
            <div>
              <p className='text-red-400 font-medium'>Lỗi khi tải template!</p>
              <p className='text-red-400/80 text-sm'>
                Vui lòng thử lại hoặc liên hệ quản trị viên.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Template Information */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        <div className='flex items-start space-x-4'>
          <div className='p-3 bg-blue-500/20 rounded-xl'>
            <FileSpreadsheet className='w-6 h-6 text-blue-400' />
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-white mb-2'>
              Template Excel cho việc nhập hàng loạt
            </h3>
            <p className='text-white/70 mb-3'>
              Tải xuống template Excel để thêm nhiều giảng viên cùng lúc.
              Template bao gồm các cột: Tên giảng viên, Email, Khoa, Câu nói yêu
              thích, và URL ảnh đại diện.
            </p>
            <div className='flex flex-wrap gap-2'>
              <span className='px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full'>
                Tên giảng viên
              </span>
              <span className='px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full'>
                Email
              </span>
              <span className='px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full'>
                Khoa
              </span>
              <span className='px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full'>
                Câu nói yêu thích
              </span>
              <span className='px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full'>
                URL ảnh đại diện
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Tìm kiếm theo tên, khoa hoặc email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className='p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
          >
            <option value=''>Tất cả khoa</option>
            {Array.from(new Set(lectures.map((l) => l.department))).map(
              (dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              )
            )}
          </select>
        </div>
      </Card>

      {/* Lecturers Table */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='flex items-center space-x-3'>
              <Loader2 className='w-6 h-6 animate-spin text-vibrant-pink' />
              <span className='text-white/70'>
                Đang tải danh sách giảng viên...
              </span>
            </div>
          </div>
        ) : lecturersWithRank.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <UserCheck className='w-12 h-12 text-white/40 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-white/70 mb-2'>
                Không tìm thấy giảng viên
              </h3>
              <p className='text-white/50'>
                {searchTerm || departmentFilter
                  ? "Thử thay đổi bộ lọc tìm kiếm"
                  : "Chưa có giảng viên nào trong hệ thống"}
              </p>
            </div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-white/20'>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Tên giảng viên
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Khoa
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Email
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Số phiếu
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Xếp hạng
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {lecturersWithRank.map((lecturer) => (
                  <tr
                    key={lecturer.id}
                    className='border-b border-white/10 hover:bg-white/5'
                  >
                    <td className='py-3 px-4 text-white/80 font-medium'>
                      {lecturer.name}
                    </td>
                    <td className='py-3 px-4 text-white/80'>
                      {lecturer.department}
                    </td>
                    <td className='py-3 px-4 text-white/80'>
                      {lecturer.email}
                    </td>
                    <td className='py-3 px-4 text-white/80'>
                      {lecturer.votes}
                    </td>
                    <td className='py-3 px-4'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lecturer.rank === 1
                            ? "bg-yellow-500/20 text-yellow-400"
                            : lecturer.rank === 2
                            ? "bg-gray-400/20 text-gray-300"
                            : lecturer.rank === 3
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        #{lecturer.rank}
                      </span>
                    </td>
                    <td className='py-3 px-4'>
                      <div className='flex space-x-2'>
                        <Link href={`/admin/lecturers/${lecturer.id}/edit`}>
                          <Button
                            size='sm'
                            variant='outline'
                            className='text-green-400 border-green-400/20 hover:bg-green-400/10'
                          >
                            <Edit className='w-4 h-4' />
                          </Button>
                        </Link>
                        <Link href={`/admin/lecturers/${lecturer.id}`}>
                          <Button
                            size='sm'
                            variant='outline'
                            className='text-blue-400 border-blue-400/20 hover:bg-blue-400/10'
                          >
                            <Eye className='w-4 h-4' />
                          </Button>
                        </Link>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            handleToggleStatus(lecturer.id, lecturer.isVoted)
                          }
                          disabled={
                            activateLecturerMutation.isPending ||
                            deactivateLecturerMutation.isPending
                          }
                          className='text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/10'
                        >
                          {lecturer.isVoted ? (
                            <UserX className='w-4 h-4' />
                          ) : (
                            <UserCheck className='w-4 h-4' />
                          )}
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleDeleteLecture(lecturer.id)}
                          disabled={deleteLectureMutation.isPending}
                          className='text-red-400 border-red-400/20 hover:bg-red-400/10'
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
