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
      className='backdrop-blur-3xl fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300 ease-in-out'
      onClick={handleBackdropClick}
    >
      <div className='w-3xl transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95 flex flex-col justify-between items-center'>
        <div className='bg-gradient-to-r from-transparent to-vibrant-pink rounded-lg p-6 shadow-2xl border-gradient relative'>
          {/* Close button */}
          <button
            onClick={onClose}
            className='absolute top-2 right-2 rounded-full flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all duration-200'
          >
            <Image
              src='/images/heart.png'
              alt='Close'
              width={50}
              height={50}
              className='w-10 h-10 text-vibrant-pink transform rotate-45'
            />
          </button>
          <h3 className='text-white text-xl font-bold mb-4 text-center'>
            THỂ LỆ BÌNH CHỌN
          </h3>

          <div className='space-y-4 text-white text-sm'>
            <div className='space-y-2 text-center'>
              <p>
                • Mỗi sinh viên có 3 lượt bình chọn và chỉ được tham gia 1
                lần/ngày.
              </p>
              <p>• Mỗi phiếu chỉ được bình chọn cho 1 giảng viên/bộ môn.</p>
            </div>

            <div className='space-y-3'>
              <p className=' font-medium text-center'>
                Quy tắc tính điểm phụ thuộc vào giai đoạn học của sinh viên:
              </p>

              <div className='space-y-2 ml-4 flex gap-4'>
                <div>
                  <p className='font-bold'>GIAI ĐOẠN DỰ BỊ:</p>
                  <div className='flex gap-2'>
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                  </div>

                  <p className='ml-4'>3 giảng viên nhóm ngành cơ bản</p>
                </div>

                <div>
                  <p className='font-bold'>
                    GIAI ĐOẠN CHUYÊN NGÀNH (HK1 - HKG):
                  </p>
                  <p className='ml-4 flex gap-2 justify-center items-center'>
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    3 giảng viên nhóm ngành cơ bản
                  </p>
                  <p className='ml-4 flex gap-4 '>
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    3 giảng viên chuyên ngành
                  </p>
                </div>

                <div>
                  <p className='font-bold'>
                    GIAI ĐOẠN CHUYÊN NGÀNH (HK7 - HK9):
                  </p>
                  <div className='flex gap-2'>
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                    <Image
                      src='/images/heart.png'
                      alt='Phase 1'
                      width={50}
                      height={50}
                      className=''
                    />
                  </div>
                  <p className='ml-4'>3 giảng viên chuyên ngành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
