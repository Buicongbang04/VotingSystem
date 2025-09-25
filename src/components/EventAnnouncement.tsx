"use client"

import React, { useState, useEffect } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventAnnouncementProps {
  title?: string
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  status?: string
  onJoin?: () => void
  onShare?: () => void
}

const EventAnnouncement: React.FC<EventAnnouncementProps> = ({
  title = "INSPIRATION INSTRUCTOR AWARDS 2025",
  startDate = "10/10/2025",
  startTime = "12:00:00",
  endDate = "31/10/2025",
  endTime = "21:00:00",
  status = "Đang diễn ra",
  onJoin,
  onShare,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  // Close tooltip on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowTooltip(false)
      }
    }

    if (showTooltip) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [showTooltip])

  // Close tooltip when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowTooltip(false)
    }
  }

  return (
    <div className='w-full max-w-3xl flex bg-gradient-to-r from-pink-500 to-pink-400 rounded-2xl shadow-lg overflow-hidden'>
      {/* Left image placeholder */}
      <div className='w-40 bg-white/20 flex items-center justify-center'>
        <div className='w-24 h-24 bg-white/30 rounded-lg'></div>
      </div>

      {/* Right content */}
      <div className='flex-1 p-6 text-white'>
        {/* Title */}
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <div className='relative'>
            <div
              className='w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200'
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className='w-4 h-4 text-vibrant-pink' />
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div></div>
        <div className='mt-4 space-y-2 text-sm flex gap-4'>
          <div className='flex flex-col'>
            <span className='font-semibold'>Thời gian bắt đầu:</span>{" "}
            <span>{startTime}</span>
            <span>{startDate}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold'>Thời gian kết thúc:</span>
            <span>{endTime}</span>
            <span>{endDate}</span>
          </div>
          <p>
            <span className='font-semibold'>Trạng thái:</span> {status}
          </p>
        </div>

        {/* Actions */}
        <div className='mt-6 flex gap-4'>
          <button
            onClick={onJoin}
            className='flex-1 bg-white text-pink-600 font-medium py-2 rounded-full hover:bg-pink-100 transition'
          >
            Tham gia
          </button>
          <button
            onClick={onShare}
            className='flex-1 bg-white text-pink-600 font-medium py-2 rounded-full hover:bg-pink-100 transition'
          >
            Chia sẻ
          </button>
        </div>
      </div>

      {/* Tooltip Modal */}
      {showTooltip && (
        <div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out'
          onClick={handleBackdropClick}
        >
          <div className='w-96 max-w-lg transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95'>
            <div className='bg-light-pink rounded-lg p-6 shadow-2xl border-2 border-vibrant-pink relative'>
              {/* Close button */}
              <button
                onClick={() => setShowTooltip(false)}
                className='absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200'
              >
                <X className='w-4 h-4 text-vibrant-pink' />
              </button>
              <h3 className='text-vibrant-pink text-xl font-bold mb-4 text-center'>
                THỂ LỆ BÌNH CHỌN
              </h3>

              <div className='space-y-4 text-vibrant-pink text-sm'>
                <div className='space-y-2'>
                  <p>
                    • Mỗi sinh viên có 3 lượt bình chọn và chỉ được tham gia 1
                    lần/ngày.
                  </p>
                  <p>• Mỗi phiếu chỉ được bình chọn cho 1 giảng viên/bộ môn.</p>
                </div>

                <div className='space-y-3'>
                  <p className='underline font-medium'>
                    Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
                  </p>

                  <div className='space-y-2 ml-4'>
                    <div>
                      <p className='font-bold'>GIAI ĐOẠN DỰ BỊ:</p>
                      <p className='ml-4'>• 3 giảng viên nhóm ngành cơ bản</p>
                    </div>

                    <div>
                      <p className='font-bold'>
                        GIAI ĐOẠN CHUYÊN NGÀNH (HK1 - HKG):
                      </p>
                      <p className='ml-4'>• 3 giảng viên nhóm ngành cơ bản</p>
                      <p className='ml-4'>• 3 giảng viên chuyên ngành</p>
                    </div>

                    <div>
                      <p className='font-bold'>
                        GIAI ĐOẠN CHUYÊN NGÀNH (HK7 - HK9):
                      </p>
                      <p className='ml-4'>• 3 giảng viên chuyên ngành</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventAnnouncement
