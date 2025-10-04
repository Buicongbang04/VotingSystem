"use client"

import React, { useState, useEffect } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser, useIsAuthenticated } from "../stores/tokenStore"
import { useGetAccountById } from "../services/AccountServices"
import { VotingRulesModal } from "./VotingRulesModal"

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
  const router = useRouter()
  const user = useUser()
  const isAuthenticated = useIsAuthenticated()

  // Get account data if user is authenticated
  const { data: accountData, isLoading: isLoadingAccount } = useGetAccountById(
    user?.sub || ""
  )

  // Check if user has student code and redirect if needed
  useEffect(() => {
    if (isAuthenticated && !isLoadingAccount && accountData?.data) {
      const account = accountData.data
      // Check if student code is missing or empty
      if (!account.studentCode || account.studentCode.trim() === "") {
        router.push("/user-information")
      }
    }
  }, [isAuthenticated, isLoadingAccount, accountData, router])

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

  // Close tooltip
  const handleCloseTooltip = () => {
    setShowTooltip(false)
  }

  // Handle join button click
  const handleJoinClick = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/login")
      return
    }

    if (isLoadingAccount) {
      // Still loading account data, wait
      return
    }

    if (accountData?.data) {
      const account = accountData.data
      // Check if student code is missing or empty
      if (!account.studentCode || account.studentCode.trim() === "") {
        router.push("/user-information")
        return
      }
    }

    // If all checks pass, call the original onJoin function
    if (onJoin) {
      onJoin()
    }
  }

  // Handle share button click
  const handleShareClick = () => {
    if (onShare) {
      // Call custom onShare function if provided
      onShare()
    } else {
      // Default behavior: use native share API
      const shareText = `Tham gia cuộc thi "Inspiring Instructor Awards 2025" - Hãy bình chọn cho giảng viên yêu thích của bạn!`
      const shareUrl = `${window.location.origin}/`

      if (navigator.share) {
        navigator
          .share({
            title: "Inspiring Instructor Awards 2025",
            text: shareText,
            url: shareUrl,
          })
          .catch((error) => {
            console.log("Error sharing:", error)
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
          })
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      }
    }
  }

  return (
    <div className='w-full flex bg-gradient-to-r from-vibrant-pink/0 to-vibrant-pink rounded-4xl shadow-lg overflow-hidden border-gradient  '>
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
        <div className='flex gap-5'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <div className='relative'>
            <div
              className='w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200'
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className='w-6 h-6 text-white' />
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
          <div className='flex flex-col'>
            <span className='font-semibold'>Trạng thái:</span>
            <span>{status}</span>
          </div>
        </div>

        {/* Actions */}
        <div className='mt-6 flex gap-4'>
          <button
            onClick={handleJoinClick}
            className='w-1/2 bg-gradient-to-r from-transparent to-vibrant-pink text-white font-medium py-2 rounded-full hover:bg-white transition border-gradient'
          >
            Tham gia
          </button>
          <button
            onClick={handleShareClick}
            className='w-1/6 bg-gradient-to-r from-transparent to-vibrant-pink border-gradient text-white font-medium py-2 rounded-full hover:bg-pink-100 transition flex justify-center items-center'
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

      {/* Voting Rules Modal */}
      <VotingRulesModal isOpen={showTooltip} onClose={handleCloseTooltip} />
    </div>
  )
}

export default EventAnnouncement
