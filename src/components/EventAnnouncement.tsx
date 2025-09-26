"use client"

import React, { useState, useEffect } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
    <div className='w-full max-w-3xl flex bg-gradient-to-r from-vibrant-pink/0 to-vibrant-pink rounded-2xl shadow-lg overflow-hidden border-gradient  '>
      {/* Left image placeholder */}
      <div className='w-50 flex items-center justify-center m-5'>
        <Image
          src='/images/event-logo-announcement.png'
          alt='Event Announcement'
          width={240}
          height={206}
          className='w-full object-cover'
        />
      </div>

      {/* Right content */}
      <div className='flex-1 p-6 text-white'>
        {/* Title */}
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <div className='relative'>
            <div
              className='w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200'
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className='w-5 h-5 text-white' />
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
            className='w-1/2 bg-gradient-to-r from-transparent to-vibrant-pink text-white font-medium py-2 rounded-full hover:bg-pink-100 transition border-gradient'
          >
            Tham gia
          </button>
          <button
            onClick={onShare}
            className='w-1/6 bg-transparent border-gradient text-white font-medium py-2 rounded-full hover:bg-pink-100 transition flex justify-center items-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='30'
              viewBox='0 -960 960 960'
              width='30'
              fill='#e3e3e3'
            >
              <path d='M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z' />
            </svg>
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
