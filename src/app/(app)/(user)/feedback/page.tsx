"use client"

import React from "react"
import FeedbackVoteComponent from "@/src/components/FeedbackVoteComponent"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"

const FeedbackPage = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className='min-h-screen'>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/bgLeaf.png')] opacity-10 bg-repeat"></div>

      {/* Header */}
      <div className='relative z-10 pt-8 pb-6'>
        <div className='max-w-4xl mx-auto px-4'>
          <Button
            onClick={handleGoBack}
            variant='ghost'
            className='text-white hover:text-gray-300 hover:bg-white/10 mb-6'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Button>

          <div className='text-center mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              Đánh giá trải nghiệm
            </h1>
            <p className='text-white/80 text-lg md:text-xl max-w-2xl mx-auto'>
              Chúng tôi rất mong nhận được phản hồi từ bạn để có thể cải thiện
              chương trình "Inspiring Instructor Awards" trong tương lai
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 pb-12'>
        <div className='max-w-2xl mx-auto px-4'>
          <FeedbackVoteComponent className='w-full' />

          {/* Additional Information */}
          <div className='mt-8 text-center'>
            <p className='text-white/60 text-sm'>
              Đánh giá của bạn sẽ giúp chúng tôi cải thiện chất lượng chương
              trình
            </p>
            <p className='text-white/60 text-sm mt-2'>
              Cảm ơn bạn đã tham gia bình chọn!
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-20 left-10 opacity-20'>
        <div className='w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl'></div>
      </div>
      <div className='absolute bottom-20 right-10 opacity-20'>
        <div className='w-40 h-40 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl'></div>
      </div>
    </div>
  )
}

export default FeedbackPage
