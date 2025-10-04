"use client"

import LecturerCard from "@/src/components/LecturerCard"
import { Lecture } from "@/src/interfaces/Lecture/Lecture"
import { useGetActiveLectures } from "@/src/services/LectureServices"
import React, { useState, useMemo } from "react"
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/components/ui/input"
import CustomDropdown from "@/src/components/ui/custom-dropdown"
import {
  useVoteForLecture,
  useCancelTodaysVote,
  useGetTodaysVotesByLecture,
} from "@/src/services/LectureVoteServices"
import { useIsAuthenticated } from "@/src/stores/tokenStore"
import { toast } from "sonner"
import { useEffect } from "react"
import { VotingRulesModal } from "@/src/components/VotingRulesModal"
import Link from "next/link"

interface PageProps {
  params: {
    id: string
  }
}

const ITEMS_PER_PAGE = 3

const page = ({ params }: PageProps) => {
  const { data: lectures, isLoading, refetch } = useGetActiveLectures()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [votedLecturers, setVotedLecturers] = useState<Set<string>>(new Set())
  const [showVotingRules, setShowVotingRules] = useState(false)
  const isAuthenticated = useIsAuthenticated()
  const { mutate: voteForLecture, isPending: isVoting } = useVoteForLecture()
  const { mutate: cancelVote, isPending: isCancelling } = useCancelTodaysVote()

  // Load user's existing votes when component mounts
  useEffect(() => {
    if (isAuthenticated && lectures?.data) {
      // For now, we'll start with an empty set
      // In a real implementation, you might want to fetch all user votes
      // or check each lecturer individually
      setVotedLecturers(new Set())
    }
  }, [isAuthenticated, lectures?.data])

  // Filter and search logic
  const filteredLectures = useMemo(() => {
    if (!lectures?.data) return []

    return lectures.data.filter((lecturer) => {
      const matchesSearch =
        lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.quote.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment =
        selectedDepartment === "all" ||
        lecturer.department === selectedDepartment

      return matchesSearch && matchesDepartment
    })
  }, [lectures?.data, searchTerm, selectedDepartment])

  // Pagination logic
  const totalPages = Math.ceil(filteredLectures.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentLectures = filteredLectures.slice(startIndex, endIndex)

  // Get unique departments for filter
  const departmentOptions = useMemo(() => {
    if (!lectures?.data) return []
    const uniqueDepts = [...new Set(lectures.data.map((l) => l.department))]
    return [
      { value: "all", label: "Tất cả bộ môn" },
      ...uniqueDepts.map((dept) => ({ value: dept, label: dept })),
    ]
  }, [lectures?.data])

  const handleVote = (lecturerId: string) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để bình chọn")
      return
    }

    const isVoted = votedLecturers.has(lecturerId)

    if (isVoted) {
      // Cancel vote
      cancelVote(lecturerId, {
        onSuccess: () => {
          setVotedLecturers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(lecturerId)
            return newSet
          })
          refetch() // Refresh lecture data to update vote counts
          toast.success("Đã hủy bình chọn thành công")
        },
        onError: (error: any) => {
          console.error("Error cancelling vote:", error)
          toast.error("Có lỗi xảy ra khi hủy bình chọn")
        },
      })
    } else {
      // Vote for lecturer
      voteForLecture(
        { lectureId: lecturerId },
        {
          onSuccess: () => {
            setVotedLecturers((prev) => new Set(prev).add(lecturerId))
            refetch() // Refresh lecture data to update vote counts
            toast.success("Bình chọn thành công!")
          },
          onError: (error: any) => {
            console.error("Error voting:", error)
            toast.error("Có lỗi xảy ra khi bình chọn")
          },
        }
      )
    }
  }

  const handleShare = (lecturerId: string) => {
    const lecturer = lectures?.data?.find((l) => l.id === lecturerId)
    if (lecturer) {
      const shareText = `Hãy bình chọn cho giảng viên ${lecturer.name} trong cuộc thi "Inspiring Instructor Awards 2025"!`
      const shareUrl = `${window.location.origin}/all-show/lecturers/${lecturerId}`

      if (navigator.share) {
        navigator
          .share({
            title: "Inspiring Instructor Awards 2025",
            text: shareText,
            url: shareUrl,
          })
          .catch(console.error)
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard
          .writeText(`${shareText}\n${shareUrl}`)
          .then(() => {
            toast.success("Đã sao chép link chia sẻ!")
          })
          .catch(() => {
            toast.error("Không thể sao chép link")
          })
      }
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // Generate pagination items with ellipsis
  const getPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5 // Show max 5 page numbers

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Always show first page
      items.push(1)

      if (currentPage > 3) {
        items.push("...")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        items.push("...")
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(totalPages)
      }
    }

    return items
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-lg'>Loading lecturers...</div>
      </div>
    )
  }

  if (!lectures?.data || lectures.data.length === 0) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-lg'>No lecturers found</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto px-4'>
        {/* Header */}
        <div className='mb-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <h2 className='text-4xl font-bold text-white mb-2'>
              Inspiring Instructor Awards 2025
            </h2>
            <button
              onClick={() => setShowVotingRules(true)}
              className='flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 ml-4'
              title='Xem thể lệ bình chọn'
            >
              <Info className='w-5 h-5 text-white' />
            </button>
          </div>

          {/* Feedback Button */}
          <Link href='/feedback'>
            <Button
              variant='ghost'
              className='text-white hover:text-gray-300 hover:bg-white/10 border border-white/20'
            >
              <MessageCircle className='w-4 h-4 mr-2' />
              Đánh giá
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className='flex justify-between md:flex-row gap-4 mb-8 '>
          <div className='relative'>
            <CustomDropdown
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              placeholder='Tất cả bộ môn'
              className=''
            />
          </div>
          <div className='relative  flex-1 max-w-md'>
            <Search className='absolute left-3 top-0 transform translate-y-1/2 text-pink-500 w-5 h-5' />
            <Input
              type='text'
              placeholder='Tìm kiếm'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 border-pink-500 text-pink-500 placeholder:text-pink-500 focus:border-pink-500 focus:ring-pink-500 bg-gray-200'
            />
          </div>
        </div>

        {/* Lecturer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
          {currentLectures.map((lecturer) => (
            <LecturerCard
              key={lecturer.id}
              lecturer={lecturer}
              onVote={handleVote}
              onShare={handleShare}
              voteCount={lecturer.votes}
              isVoted={lecturer.isVoted}
              isLoading={isVoting || isCancelling}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex flex-col items-center space-y-4 m-4'>
            {/* Page info */}
            <div className='text-white/70 text-sm'>
              Trang {currentPage} của {totalPages} ({filteredLectures.length}{" "}
              giảng viên)
            </div>

            {/* Pagination controls */}
            <div className='flex items-center space-x-2 flex-wrap justify-center'>
              <Button
                variant='outline'
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className='flex items-center border-gradient bg-transparent text-white hover:bg-white/10'
                size='sm'
              >
                <ChevronLeft className='w-4 h-4 mr-1' />
                Trước
              </Button>

              <div className='flex space-x-1 flex-wrap justify-center'>
                {getPaginationItems().map((item, index) => (
                  <button
                    key={index}
                    onClick={() => typeof item === "number" && goToPage(item)}
                    disabled={item === "..."}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                      item === "..."
                        ? "text-white/50 cursor-default"
                        : currentPage === item
                        ? "bg-gradient-to-r from-transparent to-vibrant-pink text-white border border-white/30 shadow-lg"
                        : "bg-transparent text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <Button
                variant='outline'
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='flex items-center border-gradient bg-transparent text-white hover:bg-white/10'
                size='sm'
              >
                Sau
                <ChevronRight className='w-4 h-4 ml-1' />
              </Button>
            </div>
          </div>
        )}

        {/* Voting Rules Modal */}
        <VotingRulesModal
          isOpen={showVotingRules}
          onClose={() => setShowVotingRules(false)}
        />
      </div>
    </div>
  )
}

export default page
