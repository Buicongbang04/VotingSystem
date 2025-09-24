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
    <div className='bg-maroon-gradient flex flex-col items-center justify-center p-8 relative'>
      {/* Main content container */}
      <div className='max-w-4xl w-full space-y-12'>
        {/* Title section */}
        <div className='text-center space-y-4'>
          <div className='flex items-center justify-center gap-3'>
            <h1 className='text-4xl md:text-5xl font-bold text-white tracking-wide'>
              {title}
            </h1>
            <div className='relative'>
              <div
                className='w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200'
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <Info className='w-5 h-5 text-maroon' />
              </div>

              {/* Tooltip */}
              {showTooltip && (
                <div
                  className='fixed inset-0 bg-black/50  flex items-center justify-center z-50 transition-all duration-300 ease-in-out'
                  onClick={handleBackdropClick}
                >
                  <div className='w-96 max-w-lg transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95'>
                    <div className='bg-pink-300 rounded-lg p-6 shadow-2xl border-2 border-pink-400 relative'>
                      {/* Close button */}
                      <button
                        onClick={() => setShowTooltip(false)}
                        className='absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200'
                      >
                        <X className='w-4 h-4 text-maroon' />
                      </button>
                      <h3 className='text-white text-xl font-bold mb-4 text-center'>
                        THỂ LỆ BÌNH CHỌN
                      </h3>

                      <div className='space-y-4 text-white text-sm'>
                        <div className='space-y-2'>
                          <p>
                            • Mỗi sinh viên có 3 lượt bình chọn và chỉ được tham
                            gia 1 lần/ngày.
                          </p>
                          <p>
                            • Mỗi phiếu chỉ được bình chọn cho 1 giảng viên/bộ
                            môn.
                          </p>
                        </div>

                        <div className='space-y-3'>
                          <p className='underline font-medium'>
                            Quy tắc tính điểm phụ thuộc vào giai đoạn học của
                            sinh viên:
                          </p>

                          <div className='space-y-2 ml-4'>
                            <div>
                              <p className='font-bold'>GIAI ĐOẠN DỰ BỊ:</p>
                              <p className='ml-4'>
                                • 3 giảng viên nhóm ngành cơ bản
                              </p>
                            </div>

                            <div>
                              <p className='font-bold'>
                                GIAI ĐOẠN CHUYÊN NGÀNH (HK1 - HKG):
                              </p>
                              <p className='ml-4'>
                                • 3 giảng viên nhóm ngành cơ bản
                              </p>
                              <p className='ml-4'>
                                • 3 giảng viên chuyên ngành
                              </p>
                            </div>

                            <div>
                              <p className='font-bold'>
                                GIAI ĐOẠN CHUYÊN NGÀNH (HK7 - HK9):
                              </p>
                              <p className='ml-4'>
                                • 3 giảng viên chuyên ngành
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time and status section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          {/* Start time column */}
          <div className='space-y-3'>
            <h3 className='text-white text-lg font-medium'>
              Thời gian bắt đầu
            </h3>
            <div className='space-y-1'>
              <p className='text-white text-xl font-semibold'>{startDate}</p>
              <p className='text-white text-lg'>{startTime}</p>
            </div>
          </div>

          {/* End time column */}
          <div className='space-y-3'>
            <h3 className='text-white text-lg font-medium'>
              Thời gian kết thúc
            </h3>
            <div className='space-y-1'>
              <p className='text-white text-xl font-semibold'>{endDate}</p>
              <p className='text-white text-lg'>{endTime}</p>
            </div>
          </div>

          {/* Status column */}
          <div className='space-y-3'>
            <h3 className='text-white text-lg font-medium'>Trạng thái</h3>
            <div className='space-y-1'>
              <p className='text-green-400 text-xl font-semibold'>{status}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button
            onClick={onJoin}
            className='bg-light-pink text-maroon hover:scale-105 font-semibold text-lg px-8 py-3 rounded-full min-w-[200px] transition-all duration-200'
          >
            THAM GIA
          </Button>
          <Button
            onClick={onShare}
            className='bg-light-pink text-maroon hover:scale-105 font-semibold text-lg px-8 py-3 rounded-full min-w-[200px] transition-all duration-200'
          >
            CHIA SẺ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventAnnouncement
