"use client"

import React from "react"
import Image from "next/image"

interface VotingRulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VotingRulesModal: React.FC<VotingRulesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className='backdrop-blur-3xl fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out p-4'
      onClick={handleBackdropClick}
    >
      <div className='w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95 flex flex-col justify-between items-center'>
        <div className='bg-gradient-to-r from-transparent to-vibrant-pink rounded-lg p-4 sm:p-6 shadow-2xl border-gradient relative w-full'>
          {/* Close button */}
          <button
            onClick={onClose}
            className='absolute top-1 right-1 sm:top-2 sm:right-2 rounded-full flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all duration-200 translate-x-2 -translate-y-2 sm:translate-x-5 sm:-translate-y-7'
          >
            <Image
              src='/images/heart.png'
              alt='Close'
              width={100}
              height={100}
              className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-vibrant-pink transform rotate-20'
            />
          </button>
          <h3 className='text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center'>
            THỂ LỆ BÌNH CHỌN
          </h3>

          <div className='space-y-3 sm:space-y-4 text-white text-sm sm:text-base'>
            <div className='space-y-2 text-center'>
              <p>
                • Mỗi sinh viên có 3 lượt bình chọn và chỉ được tham gia 1
                lần/ngày.
              </p>
              <p>• Mỗi bộ môn chỉ được bình chọn cho 1 giảng viên/bộ môn.</p>
            </div>

            <div className='space-y-3'>
              <p className='font-medium text-center text-sm sm:text-base'>
                Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
              </p>

              <div className='space-y-4 sm:space-y-6'>
                <div className='text-center'>
                  <p className='font-bold text-base sm:text-lg'>
                    GIAI ĐOẠN DỰ BỊ:
                  </p>
                  <div className='flex gap-1 sm:gap-2 justify-center mb-2'>
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                    />
                  </div>

                  <p className='text-sm sm:text-base'>
                    3 giảng viên nhóm ngành cơ bản
                  </p>
                </div>

                <div className='text-center'>
                  <p className='font-bold text-base sm:text-lg'>
                    GIAI ĐOẠN CHUYÊN NGÀNH
                  </p>
                  <p className='text-sm sm:text-base mb-3'>(HK1 - HK6):</p>

                  <div className='space-y-2'>
                    <div className='flex gap-1 sm:gap-2 justify-center items-center'>
                      <Image
                        src='/images/heart.png'
                        alt='Phase 2'
                        width={50}
                        height={50}
                        className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                      />
                      <span className='text-sm sm:text-base'>
                        1 giảng viên nhóm ngành cơ bản
                      </span>
                    </div>

                    <div className='flex gap-1 sm:gap-2 justify-center items-center'>
                      <Image
                        src='/images/heart.png'
                        alt='Phase 2'
                        width={50}
                        height={50}
                        className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                      />
                      <Image
                        src='/images/heart.png'
                        alt='Phase 2'
                        width={50}
                        height={50}
                        className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                      />
                      <span className='text-sm sm:text-base'>
                        2 giảng viên chuyên ngành
                      </span>
                    </div>
                  </div>
                </div>

                <div className='text-center'>
                  <p className='font-bold text-base sm:text-lg'>
                    GIAI ĐOẠN CHUYÊN NGÀNH
                  </p>
                  <p className='text-sm sm:text-base mb-3'>(HK7 - HK9):</p>
                  <div className='flex gap-1 sm:gap-2 justify-center mb-2'>
                    <Image
                      src='/images/heart.png'
                      alt='Phase 3'
                      width={50}
                      height={50}
                      className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 3'
                      width={50}
                      height={50}
                      className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 3'
                      width={50}
                      height={50}
                      className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12'
                    />
                  </div>
                  <p className='text-sm sm:text-base'>
                    3 giảng viên chuyên ngành
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
