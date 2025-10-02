"use client"

import React, { useState } from "react"
import {
  useCreateFeedbackVote,
  useUpdateFeedbackVote,
} from "../services/FeedbackVoteServices"
import {
  CreateFeedbackVoteRequest,
  UpdateFeedbackVoteRequest,
} from "../interfaces/FeedbackVote/FeedbackVote"
import { useUser } from "../stores/tokenStore"

interface FeedbackVoteComponentProps {
  className?: string
}

const FeedbackVoteComponent: React.FC<FeedbackVoteComponentProps> = ({
  className = "",
}) => {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info"
    text: string
  } | null>(null)

  const user = useUser()
  const createFeedbackVote = useCreateFeedbackVote()
  const updateFeedbackVote = useUpdateFeedbackVote()

  const handleStarClick = async (starRating: number) => {
    if (!user?.email) {
      setMessage({ type: "error", text: "Vui lòng đăng nhập để đánh giá" })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      // Try to create new vote first
      try {
        const createData: CreateFeedbackVoteRequest = {
          vote: starRating,
        }
        await createFeedbackVote.mutateAsync(createData)
        setMessage({ type: "success", text: "Cảm ơn bạn đã đánh giá!" })
      } catch (createError: any) {
        // If create fails with 409 conflict, try to update instead
        if (createError?.response?.status === 409) {
          const updateData: UpdateFeedbackVoteRequest = {
            vote: starRating,
          }
          await updateFeedbackVote.mutateAsync(updateData)
          setMessage({
            type: "success",
            text: "Đánh giá của bạn đã được cập nhật!",
          })
        } else {
          // If it's a different error, re-throw it
          throw createError
        }
      }

      setRating(starRating)
    } catch (error) {
      console.error("Error submitting feedback vote:", error)
      setMessage({
        type: "error",
        text: "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarIcon: React.FC<{ filled: boolean; rating: number }> = ({
    filled,
    rating,
  }) => (
    <svg
      className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
        filled
          ? "text-yellow-400 fill-current"
          : "text-gray-300 hover:text-yellow-300"
      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      viewBox='0 0 24 24'
      onClick={() => !isSubmitting && handleStarClick(rating)}
      onMouseEnter={() => !isSubmitting && setHoveredRating(rating)}
      onMouseLeave={() => !isSubmitting && setHoveredRating(0)}
    >
      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
    </svg>
  )

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Rất không hài lòng"
      case 2:
        return "Không hài lòng"
      case 3:
        return "Bình thường"
      case 4:
        return "Hài lòng"
      case 5:
        return "Rất hài lòng"
      default:
        return ""
    }
  }

  const displayRating = hoveredRating || rating

  return (
    <div
      className={`bg-gradient-to-r from-transparent to-vibrant-pink rounded-2xl p-8 shadow-2xl border-gradient ${className}`}
    >
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='text-white text-2xl font-bold mb-2'>
          Cảm ơn vì đã đồng hành cùng chương trình.
        </h2>
        <p className='text-white text-lg opacity-90'>
          Hãy đánh giá trải nghiệm của bạn nhé!
        </p>
      </div>

      {/* Star Rating */}
      <div className='flex justify-center items-center space-x-2 mb-4'>
        {[1, 2, 3, 4, 5].map((starRating) => (
          <StarIcon
            key={starRating}
            filled={starRating <= displayRating}
            rating={starRating}
          />
        ))}
      </div>

      {/* Rating Text */}
      {displayRating > 0 && (
        <div className='text-center mb-4'>
          <p className='text-white font-semibold text-lg'>
            {getRatingText(displayRating)}
          </p>
          {rating > 0 && (
            <p className='text-white opacity-75 text-sm mt-1'>
              Đánh giá hiện tại: {rating}/5
            </p>
          )}
        </div>
      )}

      {/* Message */}
      {message && (
        <div
          className={`text-center p-3 rounded-lg mb-4 ${
            message.type === "success"
              ? "bg-green-500/20 text-green-200 border border-green-400/30"
              : message.type === "error"
              ? "bg-red-500/20 text-red-200 border border-red-400/30"
              : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Instructions */}
      {rating === 0 && (
        <div className='text-center'>
          <p className='text-white opacity-75 text-sm'>
            Nhấp vào ngôi sao để đánh giá từ 1-5
          </p>
        </div>
      )}

      {/* Decorative Heart */}
      <div className='absolute top-4 right-4 opacity-20'>
        <svg
          className='w-8 h-8 text-pink-300'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
        </svg>
      </div>
    </div>
  )
}

export default FeedbackVoteComponent
