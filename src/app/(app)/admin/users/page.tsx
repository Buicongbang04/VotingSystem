"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import {
  useGetAllAccounts,
  useBanAccount,
  useDeleteAccount,
} from "@/src/services/AccountServices"
import { Account } from "@/src/interfaces/Account/Account"
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Ban,
  Trash2,
  Edit,
  Shield,
  User,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // API hooks
  const {
    data: accountsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllAccounts()

  // Get accounts data
  const accounts = accountsResponse?.data || []

  const banAccountMutation = useBanAccount()
  const deleteAccountMutation = useDeleteAccount()

  // Filter accounts based on search and filters
  const filteredAccounts = React.useMemo(() => {
    return accounts.filter((account: Account) => {
      const matchesSearch =
        account.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.studentCode?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole =
        !roleFilter ||
        (roleFilter === "Admin" && account.isAdmin) ||
        (roleFilter === "User" && !account.isAdmin)

      // Note: Account interface doesn't have status field, so we'll skip status filter for now
      const matchesStatus = !statusFilter // Always true since no status field

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [accounts, searchTerm, roleFilter, statusFilter])

  const handleBanAccount = async (studentCode: string) => {
    if (confirm("Bạn có chắc chắn muốn cấm tài khoản này?")) {
      try {
        await banAccountMutation.mutateAsync(studentCode)
        refetch() // Refresh the data
      } catch (error) {
        console.error("Error banning account:", error)
      }
    }
  }

  const handleDeleteAccount = async (studentCode: string) => {
    if (
      confirm(
        "Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác!"
      )
    ) {
      try {
        await deleteAccountMutation.mutateAsync(studentCode)
        refetch() // Refresh the data
      } catch (error) {
        console.error("Error deleting account:", error)
      }
    }
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='p-3 bg-gradient-to-r from-vibrant-pink/20 to-purple-500/20 rounded-xl'>
            <Users className='w-8 h-8 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-white'>
              Quản lý người dùng
            </h1>
            <p className='text-white/70'>
              {isLoading
                ? "Đang tải..."
                : `${filteredAccounts.length} tài khoản`}
            </p>
          </div>
        </div>
        <div className='flex space-x-3'>
          <Button
            onClick={() => refetch()}
            disabled={isLoading}
            variant='outline'
            className='text-white border-white/20 hover:bg-white/10 flex items-center space-x-2'
          >
            {isLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <RefreshCw className='w-4 h-4' />
            )}
            <span>Làm mới</span>
          </Button>
          <Button className='bg-vibrant-pink hover:bg-vibrant-pink/80 text-white'>
            Thêm người dùng mới
          </Button>
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
                Không thể tải danh sách tài khoản. Vui lòng thử lại.
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

      {/* Search and Filters */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        <div className='flex items-center space-x-3 mb-4'>
          <Search className='w-5 h-5 text-vibrant-pink' />
          <h3 className='text-lg font-semibold text-white'>Tìm kiếm và lọc</h3>
        </div>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Tìm kiếm theo tên, email hoặc mã sinh viên...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className='p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
          >
            <option value=''>Tất cả vai trò</option>
            <option value='User'>Người dùng</option>
            <option value='Admin'>Quản trị viên</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
          >
            <option value=''>Tất cả trạng thái</option>
            <option value='Active'>Hoạt động</option>
            <option value='Inactive'>Không hoạt động</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='flex items-center space-x-3'>
              <Loader2 className='w-6 h-6 animate-spin text-vibrant-pink' />
              <span className='text-white/70'>
                Đang tải danh sách tài khoản...
              </span>
            </div>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <Users className='w-12 h-12 text-white/40 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-white/70 mb-2'>
                Không tìm thấy tài khoản
              </h3>
              <p className='text-white/50'>
                {searchTerm || roleFilter || statusFilter
                  ? "Thử thay đổi bộ lọc tìm kiếm"
                  : "Chưa có tài khoản nào trong hệ thống"}
              </p>
            </div>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-white/20'>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Mã sinh viên
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Tên
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Email
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Khoa
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Học kỳ
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Vai trò
                  </th>
                  <th className='text-left py-3 px-4 text-white font-semibold'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account: Account) => (
                  <tr
                    key={account.studentCode}
                    className='border-b border-white/10 hover:bg-white/5'
                  >
                    <td className='py-3 px-4 text-white/80 font-mono text-sm'>
                      {account.studentCode}
                    </td>
                    <td className='py-3 px-4 text-white/80 font-medium'>
                      {account.name}
                    </td>
                    <td className='py-3 px-4 text-white/80'>{account.email}</td>
                    <td className='py-3 px-4 text-white/80'>
                      {account.department || "Chưa cập nhật"}
                    </td>
                    <td className='py-3 px-4 text-white/80'>
                      {account.semester
                        ? `Học kỳ ${account.semester}`
                        : "Chưa cập nhật"}
                    </td>
                    <td className='py-3 px-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${
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
                    </td>
                    <td className='py-3 px-4'>
                      <div className='flex space-x-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          className='text-white border-white/20 hover:bg-white/10'
                        >
                          <Edit className='w-3 h-3 mr-1' />
                          Sửa
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleBanAccount(account.studentCode)}
                          disabled={banAccountMutation.isPending}
                          className='text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/10'
                        >
                          <Ban className='w-3 h-3 mr-1' />
                          Cấm
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            handleDeleteAccount(account.studentCode)
                          }
                          disabled={deleteAccountMutation.isPending}
                          className='text-red-400 border-red-400/20 hover:bg-red-400/10'
                        >
                          <Trash2 className='w-3 h-3 mr-1' />
                          Xóa
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
