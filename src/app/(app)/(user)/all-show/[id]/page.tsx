"use client"

import LecturerCard from "@/src/components/LecturerCard"
import { Lecture } from "@/src/interfaces/Lecture/Lecture"
import { useGetAllLectures } from "@/src/services/LectureServices"
import React, { useState, useMemo } from "react"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/components/ui/input"
import CustomDropdown from "@/src/components/ui/custom-dropdown"

interface PageProps {
  params: {
    id: string
  }
}

const ITEMS_PER_PAGE = 3

const page = ({ params }: PageProps) => {
  const { data: lectures, isLoading } = useGetAllLectures()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

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
      { value: "all", label: "ngành học" },
      ...uniqueDepts.map((dept) => ({ value: dept, label: dept })),
    ]
  }, [lectures?.data])

  const handleVote = (lecturerId: string) => {
    console.log("Voted for lecturer:", lecturerId)
    // TODO: Implement voting logic
  }

  const handleShare = (lecturerId: string) => {
    console.log("Shared lecturer:", lecturerId)
    // TODO: Implement sharing logic
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
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
        <div className='mb-2'>
          <h2 className='text-4xl font-bold text-white mb-2'>
            Inspiring Instructor Awards 2025
          </h2>
        </div>

        {/* Search and Filter */}
        <div className='flex justify-between md:flex-row gap-4 mb-8 '>
          <div className='relative'>
            <CustomDropdown
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              placeholder='Tất cả bộ môn'
              className='pl-10'
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
              isVoted={false} // TODO: Implement user vote check
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center space-x-2 m-4'>
            <Button
              variant='outline'
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='flex items-center'
            >
              <ChevronLeft className='w-4 h-4 mr-1' />
              Trước
            </Button>

            <div className='flex space-x-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => goToPage(page)}
                    className='w-10 h-10'
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant='default'
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='flex items-center border-gradient bg-transparent'
            >
              Sau
              <ChevronRight className='w-4 h-4 ml-1' />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
