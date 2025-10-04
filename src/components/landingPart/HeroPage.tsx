"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import QRCode from "qrcode"
import Image from "next/image"

const HeroPage = () => {
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    const url = window.location.href
    setCurrentUrl(url)

    QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    }).then(setQrCodeDataUrl)
  }, [])

  const handleShareClick = () => setShowSharePopup(true)
  const handleClosePopup = () => setShowSharePopup(false)
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert("Link đã được sao chép!")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <section
      id='hero'
      className='
        
        px-4
        w-full max-w-[100vw]
        relative
      '
    >
      <div className='flex flex-col items-start justify-start -translate-y-30'>
        <div className='mx-auto '>
          <Image
            src='/images/hero.png'
            alt='logo'
            width={700}
            height={300}
            priority
            draggable={false}
            className='
              w-full
              translate-x-50
            '
          />
        </div>

        <div
          className='
          relative
            rounded-3xl
            p-6 sm:p-6 md:p-12 lg:p-14 xl:p-16
            bg-gradient-to-r from-[#1E1E1E]/70 via-[#65002F]/70 to-[#F54BAF]/70
            backdrop-blur-md
            w-full
            max-w-[95vw] sm:max-w-xl md:max-w-xl lg:max-w-4xl xl:max-w-4xl
            text-white
            border-gradient
            border-b-0
            mx-auto
            z-20
          '
        >
          <div
            className='text-[15vw] leading-none absolute opacity-20 top-0'
            draggable={false}
          >
            ❝
          </div>

          <p
            className='
              text-sm
              sm:text-md md:text-lg lg:text-2xl xl:text-2xl
              leading-relaxed
              mb-5 sm:mb-6
            '
          >
            Danh hiệu{" "}
            <span className='font-bold'>Inspiring Instructor Awards 2025</span>{" "}
            nhằm tôn vinh những nỗ lực, cống hiến của Giảng viên trong hành
            trình định hướng, hỗ trợ sinh viên thu nhận kiến thức và truyền cảm
            hứng đến sinh viên <span className='font-bold'>FPTU</span> trong 3
            học kỳ:{" "}
            <span className='font-bold'>
              Fall 2024, Spring 2025 và Summer 2025.
            </span>
          </p>

          {/* Buttons: dọc trên mobile, ngang từ sm trở lên */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <Link
              href='/login'
              className='
                relative px-6 py-2 rounded-full
                text-white font-medium
                button1
                text-center
                text-[clamp(0.95rem,1.1vw,1rem)]
              '
            >
              Tham gia
            </Link>

            <button
              onClick={handleShareClick}
              className='
                relative px-6 py-2 rounded-full
                text-white font-medium
                button2
                text-[clamp(0.95rem,1.1vw,1rem)]
              '
            >
              Chia sẻ
            </button>
          </div>
        </div>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <div
          className='
            fixed inset-0 bg-black/60 backdrop-blur
            flex items-end sm:items-center justify-center z-50 px-4
          '
          role='dialog'
          aria-modal='true'
          aria-labelledby='share-title'
        >
          {/* Bottom sheet trên mobile, modal ở giữa trên sm+ */}
          <div
            className='
              bg-white w-full
              rounded-t-2xl sm:rounded-2xl
              shadow-2xl
              p-4 sm:p-6 md:p-8
              max-h-[90dvh] overflow-y-auto
              sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
            '
          >
            <div className='text-center'>
              <h3
                id='share-title'
                className='
                  text-gray-800 font-bold mb-5 sm:mb-6
                  text-[clamp(1.125rem,2.2vw,1.5rem)]
                  break-words whitespace-normal
                '
              >
                Chia sẻ trang web
              </h3>

              {/* QR Code */}
              {qrCodeDataUrl && (
                <div className='mb-5 sm:mb-6 flex justify-center'>
                  <img
                    src={qrCodeDataUrl}
                    alt='QR Code'
                    draggable={false}
                    className='
                      border-2 border-gray-200 rounded-lg
                      w-[70vw] max-w-40
                      sm:w-full sm:max-w-56
                      md:max-w-60
                      h-auto
                    '
                  />
                </div>
              )}

              {/* Link */}
              <div className='mb-5 sm:mb-6 text-left'>
                <p className='text-gray-600 mb-2 text-[clamp(0.9rem,1.2vw,1rem)] break-words whitespace-normal'>
                  Link chia sẻ:
                </p>
                <div className='bg-gray-100 p-3 rounded-lg overflow-x-auto'>
                  <p className='text-gray-700 select-all text-[clamp(0.9rem,1.2vw,1rem)] break-all'>
                    {currentUrl}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center'>
                <button
                  onClick={handleCopyLink}
                  className='
                    px-4 md:px-6 py-2
                    bg-blue-500 text-white rounded-lg
                    hover:bg-blue-600 transition-colors duration-200
                    text-[clamp(0.95rem,1.2vw,1rem)]
                  '
                >
                  Sao chép link
                </button>
                <button
                  onClick={handleClosePopup}
                  className='
                    px-4 md:px-6 py-2
                    bg-gray-500 text-white rounded-lg
                    hover:bg-gray-600 transition-colors duration-200
                    text-[clamp(0.95rem,1.2vw,1rem)]
                  '
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroPage
