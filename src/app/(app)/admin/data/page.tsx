"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"

export default function AdminData() {
  const [selectedDataType, setSelectedDataType] = useState("")

  const dataTypes = [
    {
      id: "users",
      name: "Dữ liệu người dùng",
      description: "Thông tin tài khoản, lịch sử đăng nhập, hoạt động",
      count: 1247,
      lastUpdated: "2024-01-15 10:30",
      size: "2.3 MB",
    },
    {
      id: "lecturers",
      name: "Dữ liệu giảng viên",
      description: "Thông tin giảng viên, chuyên ngành, thành tích",
      count: 89,
      lastUpdated: "2024-01-14 15:45",
      size: "1.8 MB",
    },
    {
      id: "votes",
      name: "Dữ liệu bình chọn",
      description: "Lịch sử bình chọn, kết quả, thống kê",
      count: 15432,
      lastUpdated: "2024-01-15 09:15",
      size: "15.7 MB",
    },
    {
      id: "events",
      name: "Dữ liệu sự kiện",
      description: "Thông tin sự kiện, lịch trình, người tham gia",
      count: 156,
      lastUpdated: "2024-01-12 14:20",
      size: "3.2 MB",
    },
    {
      id: "logs",
      name: "Log hệ thống",
      description: "Nhật ký hoạt động, lỗi, bảo mật",
      count: 89456,
      lastUpdated: "2024-01-15 11:00",
      size: "45.8 MB",
    },
  ]

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-white'>Quản lý dữ liệu</h1>
        <div className='flex space-x-3'>
          <Button className='bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/20'>
            Xuất tất cả
          </Button>
          <Button className='bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/20'>
            Dọn dẹp dữ liệu
          </Button>
        </div>
      </div>

      {/* Data Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='text-center'>
            <p className='text-white/70 text-sm font-medium'>Tổng bản ghi</p>
            <p className='text-3xl font-bold text-white mt-2'>
              {dataTypes
                .reduce((sum, type) => sum + type.count, 0)
                .toLocaleString()}
            </p>
          </div>
        </Card>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='text-center'>
            <p className='text-white/70 text-sm font-medium'>Tổng dung lượng</p>
            <p className='text-3xl font-bold text-white mt-2'>68.8 MB</p>
          </div>
        </Card>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='text-center'>
            <p className='text-white/70 text-sm font-medium'>Loại dữ liệu</p>
            <p className='text-3xl font-bold text-white mt-2'>
              {dataTypes.length}
            </p>
          </div>
        </Card>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='text-center'>
            <p className='text-white/70 text-sm font-medium'>
              Cập nhật gần nhất
            </p>
            <p className='text-lg font-bold text-white mt-2'>2 phút trước</p>
          </div>
        </Card>
      </div>

      {/* Data Types */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        <h3 className='text-xl font-semibold text-white mb-6'>
          Danh sách dữ liệu
        </h3>
        <div className='space-y-4'>
          {dataTypes.map((dataType) => (
            <div
              key={dataType.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                selectedDataType === dataType.id
                  ? "bg-vibrant-pink/20 border-vibrant-pink/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center space-x-4'>
                    <input
                      type='checkbox'
                      checked={selectedDataType === dataType.id}
                      onChange={() =>
                        setSelectedDataType(
                          selectedDataType === dataType.id ? "" : dataType.id
                        )
                      }
                      className='w-4 h-4 text-vibrant-pink bg-white/10 border-white/20 rounded focus:ring-vibrant-pink'
                    />
                    <div>
                      <h4 className='text-white font-medium'>
                        {dataType.name}
                      </h4>
                      <p className='text-white/60 text-sm'>
                        {dataType.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-6 text-sm'>
                  <div className='text-center'>
                    <p className='text-white/60'>Bản ghi</p>
                    <p className='text-white font-medium'>
                      {dataType.count.toLocaleString()}
                    </p>
                  </div>
                  <div className='text-center'>
                    <p className='text-white/60'>Dung lượng</p>
                    <p className='text-white font-medium'>{dataType.size}</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-white/60'>Cập nhật</p>
                    <p className='text-white font-medium'>
                      {dataType.lastUpdated}
                    </p>
                  </div>
                  <div className='flex space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-blue-400 border-blue-400/20 hover:bg-blue-400/10'
                    >
                      Xem
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-green-400 border-green-400/20 hover:bg-green-400/10'
                    >
                      Xuất
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/10'
                    >
                      Chỉnh sửa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Management Actions */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <h3 className='text-xl font-semibold text-white mb-4'>
            Thao tác dữ liệu
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
              <div>
                <p className='text-white font-medium'>Sao lưu dữ liệu</p>
                <p className='text-white/60 text-sm'>
                  Tạo bản sao lưu toàn bộ dữ liệu
                </p>
              </div>
              <Button className='bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/20'>
                Sao lưu
              </Button>
            </div>
            <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
              <div>
                <p className='text-white font-medium'>Khôi phục dữ liệu</p>
                <p className='text-white/60 text-sm'>
                  Khôi phục từ bản sao lưu
                </p>
              </div>
              <Button className='bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/20'>
                Khôi phục
              </Button>
            </div>
            <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
              <div>
                <p className='text-white font-medium'>Tối ưu hóa</p>
                <p className='text-white/60 text-sm'>
                  Làm sạch và tối ưu dữ liệu
                </p>
              </div>
              <Button className='bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/20'>
                Tối ưu
              </Button>
            </div>
          </div>
        </Card>

        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <h3 className='text-xl font-semibold text-white mb-4'>
            Thống kê hệ thống
          </h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-white/70'>CPU Usage</span>
              <span className='text-white'>23%</span>
            </div>
            <div className='w-full bg-white/10 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full'
                style={{ width: "23%" }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-white/70'>Memory Usage</span>
              <span className='text-white'>67%</span>
            </div>
            <div className='w-full bg-white/10 rounded-full h-2'>
              <div
                className='bg-green-500 h-2 rounded-full'
                style={{ width: "67%" }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-white/70'>Disk Usage</span>
              <span className='text-white'>45%</span>
            </div>
            <div className='w-full bg-white/10 rounded-full h-2'>
              <div
                className='bg-yellow-500 h-2 rounded-full'
                style={{ width: "45%" }}
              ></div>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-white/70'>Database Size</span>
              <span className='text-white'>68.8 MB</span>
            </div>
            <div className='w-full bg-white/10 rounded-full h-2'>
              <div
                className='bg-vibrant-pink h-2 rounded-full'
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
