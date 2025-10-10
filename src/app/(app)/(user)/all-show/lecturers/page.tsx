"use client"

import LecturerCard from "@/src/components/LecturerCard"
import { Lecture } from "@/src/interfaces/Lecture/Lecture"
import { useGetActiveLectures } from "@/src/services/LectureServices"
import React, { useState, useMemo, useCallback, memo } from "react"
import { useQueryClient } from "@tanstack/react-query"
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
import { useIsAuthenticated, useUser } from "@/src/stores/tokenStore"
import { toast } from "sonner"
import { useEffect } from "react"
import Link from "next/link"
import { useGetAccountById } from "@/src/services/AccountServices"
import { LoadingGrid } from "@/src/components/ui/loading"
import { Suspense, lazy } from "react"

// Lazy load the VotingRulesModal
const VotingRulesModal = lazy(() =>
  import("@/src/components/VotingRulesModal").then((module) => ({
    default: module.VotingRulesModal,
  }))
)
import {
  BASIC_DEPARTMENTS,
  SPECIALIZED_DEPARTMENTS,
  ALL_DEPARTMENTS,
} from "@/src/constants/Departments"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface PageProps {
  params: {
    id: string
  }
}

const ITEMS_PER_PAGE = 8

const page = memo(({ params }: PageProps) => {
  const queryClient = useQueryClient()
  const { data: lectures, isLoading, refetch } = useGetActiveLectures()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [showVotingRules, setShowVotingRules] = useState(false)
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()
  const { mutate: voteForLecture, isPending: isVoting } = useVoteForLecture()
  const { mutate: cancelVote, isPending: isCancelling } = useCancelTodaysVote()

  // Get current user account information
  const { data: accountData, isLoading: isLoadingAccount } = useGetAccountById(
    user?.sub || ""
  )

  // Get allowed departments based on semester
  const getAllowedDepartments = useMemo(() => {
    const semester = accountData?.data?.semester ?? 0

    if (semester === 0) {
      // Only basic departments for semester 0
      return BASIC_DEPARTMENTS.map((dept) => dept.name)
    } else if (semester >= 1 && semester <= 6) {
      // Both basic and specialized for semesters 1-6
      return ALL_DEPARTMENTS.map((dept) => dept.name)
    } else if (semester >= 7 && semester <= 9) {
      // Only specialized departments for semesters 7-9
      return SPECIALIZED_DEPARTMENTS.map((dept) => dept.name)
    }

    // Default to all departments if semester is not recognized
    return ALL_DEPARTMENTS.map((dept) => dept.name)
  }, [accountData?.data?.semester])

  // Get unique departments for filter based on semester
  const departmentOptions = useMemo(() => {
    if (!lectures?.data) return []

    // Filter departments based on semester
    const allowedDepts = lectures.data
      .map((l) => l.department)
      .filter((dept) => getAllowedDepartments.includes(dept))

    const uniqueDepts = [...new Set(allowedDepts)]

    return [
      { value: "all", label: "Tất cả bộ môn" },
      ...uniqueDepts.map((dept) => ({ value: dept, label: dept })),
    ]
  }, [lectures?.data, getAllowedDepartments])

  // Reset selected department when allowed departments change
  useEffect(() => {
    if (departmentOptions.length > 0 && selectedDepartment !== "all") {
      const isCurrentDeptAllowed = departmentOptions.some(
        (option) => option.value === selectedDepartment
      )
      if (!isCurrentDeptAllowed) {
        setSelectedDepartment("all")
      }
    }
  }, [departmentOptions, selectedDepartment])

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

      // Check if lecturer's department is allowed based on semester
      const isDepartmentAllowed = getAllowedDepartments.includes(
        lecturer.department
      )

      return matchesSearch && matchesDepartment && isDepartmentAllowed
    })
  }, [lectures?.data, searchTerm, selectedDepartment, getAllowedDepartments])

  // Calculate number of voted lecturers minus 3
  const votedLecturersCount = useMemo(() => {
    if (!lectures?.data) return 0
    const votedCount = lectures.data.filter(
      (lecturer) => lecturer.isVoted
    ).length
    return Math.max(0, 3 - votedCount)
  }, [lectures?.data])

  // Pagination logic
  const totalPages = Math.ceil(filteredLectures.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentLectures = filteredLectures.slice(startIndex, endIndex)

  const handleVote = useCallback(
    (lecturerId: string) => {
      if (!isAuthenticated) {
        toast.error("Vui lòng đăng nhập để bình chọn")
        return
      }

      // Find the lecturer to check if they're already voted
      const lecturer = lectures?.data?.find((l) => l.id === lecturerId)
      const isVoted = lecturer?.isVoted || false

      if (isVoted) {
        // Cancel vote
        cancelVote(lecturerId, {
          onSuccess: (response) => {
            // Invalidate relevant queries to update the UI
            queryClient.invalidateQueries({
              queryKey: ["lectureVotes", lecturerId, "today"],
            })
            queryClient.invalidateQueries({
              queryKey: ["lectures"],
            })
            queryClient.invalidateQueries({
              queryKey: ["lecture", lecturerId],
            })
            refetch() // Refresh lecture data to update vote counts
            toast.success(response?.message || "Đã hủy bình chọn thành công")
          },
          onError: (error: any) => {
            console.error("Error cancelling vote:", error)
            const errorMessage =
              error?.response?.data?.message ||
              "Có lỗi xảy ra khi hủy bình chọn"
            toast.error(errorMessage)
          },
        })
      } else {
        // Vote for lecturer
        voteForLecture(
          { lectureId: lecturerId },
          {
            onSuccess: (response) => {
              // Invalidate relevant queries to update the UI
              queryClient.invalidateQueries({
                queryKey: ["lectureVotes", lecturerId, "today"],
              })
              queryClient.invalidateQueries({
                queryKey: ["lectures"],
              })
              queryClient.invalidateQueries({
                queryKey: ["lecture", lecturerId],
              })
              refetch() // Refresh lecture data to update vote counts
              toast.success(response?.message || "Bình chọn thành công!")
            },
            onError: (error: any) => {
              console.error("Error voting:", error)
              const errorMessage =
                error?.response?.data?.message || "Có lỗi xảy ra khi bình chọn"
              toast.error(errorMessage)
            },
          }
        )
      }
    },
    [
      isAuthenticated,
      lectures?.data,
      cancelVote,
      voteForLecture,
      queryClient,
      refetch,
    ]
  )

  const handleShare = useCallback((lecturerId: string) => {
    const shareUrl =
      "https://daihoc.fpt.edu.vn/hcm/giang-vien-truyen-cam-hung-2025/"

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Đã sao chép link chia sẻ!")
      })
      .catch(() => {
        toast.error("Không thể sao chép link")
      })
  }, [])

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    },
    [totalPages]
  )

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

  if (isLoading || isLoadingAccount) {
    return (
      <div className='min-h-screen'>
        <div className='mx-auto px-4 pt-10'>
          {/* Header skeleton */}
          <div className='mb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
            <div className='h-8 bg-gray-300 rounded w-64 animate-pulse' />
            <div className='h-10 bg-gray-300 rounded w-24 animate-pulse' />
          </div>

          {/* Search and filter skeleton */}
          <div className='flex flex-col sm:flex-row gap-4 mb-8 items-center'>
            <div className='h-10 bg-gray-300 rounded w-48 animate-pulse' />
            <div className='h-10 bg-gray-300 rounded w-64 animate-pulse' />
            <div className='w-12 h-12 bg-gray-300 rounded animate-pulse' />
          </div>

          {/* Loading grid */}
          <LoadingGrid count={8} />
        </div>
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
      <div className='mx-auto px-4 pt-10'>
        {/* Header */}
        <div className='mb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          <div className='flex items-center flex-wrap'>
            <h2 className='text-2xl md:text-4xl font-bold text-white mb-2'>
              Inspiring Instructor Awards 2025
            </h2>
            <button
              onClick={() => setShowVotingRules(true)}
              className='flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 ml-2 md:ml-4'
              title='Xem thể lệ bình chọn'
            >
              <Info className='w-4 h-4 md:w-5 md:h-5 text-white' />
            </button>
          </div>

          {/* Feedback Button */}
          <Link href='/feedback'>
            <Button
              variant='ghost'
              className='text-white hover:text-gray-300 hover:bg-white/10 border border-white/20 text-sm md:text-base'
            >
              <MessageCircle className='w-4 h-4 mr-2' />
              <span className='hidden sm:inline'>Đánh giá</span>
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8 items-center'>
          <div className='relative w-full sm:w-auto'>
            <CustomDropdown
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              placeholder='Tất cả bộ môn'
              className='w-full sm:w-auto'
            />
          </div>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-0 transform translate-y-1/2 text-pink-500 w-5 h-5' />
            <Input
              type='text'
              placeholder='Tìm kiếm'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 border-pink-500 text-pink-500 placeholder:text-pink-500 focus:border-pink-500 focus:ring-pink-500 bg-gray-200 w-full'
            />
          </div>
          <div className='relative'>
            <Image
              src='/images/heart.png'
              alt='Number of votes'
              width={48}
              height={48}
              className='w-12 h-12 pointer-events-none'
              priority={false}
              loading='lazy'
              sizes='48px'
            />
            <span className='absolute top-[0px] right-[-3px] flex items-center justify-center w-4 h-4 bg-white/20 text-white text-sm font-bold rounded-full'>
              {votedLecturersCount}
            </span>
          </div>
        </div>

        {/* Lecturer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
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
            <div className='text-white/70 text-xs md:text-sm text-center px-4'>
              Trang {currentPage} của {totalPages} ({filteredLectures.length}{" "}
              giảng viên)
            </div>

            {/* Pagination controls */}
            <div className='flex items-center space-x-1 md:space-x-2 flex-wrap justify-center max-w-full'>
              <Button
                variant='outline'
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className='flex items-center border-gradient bg-transparent text-white hover:bg-white/10 text-xs md:text-sm'
                size='sm'
              >
                <ChevronLeft className='w-3 h-3 md:w-4 md:h-4 mr-1' />
                <span className='hidden sm:inline'>Trước</span>
              </Button>

              <div className='flex space-x-1 flex-wrap justify-center max-w-xs overflow-x-auto'>
                {getPaginationItems().map((item, index) => (
                  <button
                    key={index}
                    onClick={() => typeof item === "number" && goToPage(item)}
                    disabled={item === "..."}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
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
                className='flex items-center border-gradient bg-transparent text-white hover:bg-white/10 text-xs md:text-sm'
                size='sm'
              >
                <span className='hidden sm:inline'>Sau</span>
                <ChevronRight className='w-3 h-3 md:w-4 md:h-4 ml-1' />
              </Button>
            </div>
          </div>
        )}

        {/* Voting Rules Modal */}
        <Suspense fallback={<div>Loading...</div>}>
          <VotingRulesModal
            isOpen={showVotingRules}
            onClose={() => setShowVotingRules(false)}
          />
        </Suspense>
      </div>
    </div>
  )
})

page.displayName = "LecturersPage"

export default page
