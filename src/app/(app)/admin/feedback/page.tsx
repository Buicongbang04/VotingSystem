"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { useGetAllFeedbackVotes } from "@/src/services/FeedbackVoteServices"
import { FeedbackVote } from "@/src/interfaces/FeedbackVote/FeedbackVote"

// API Response type
interface FeedbackVoteResponse {
  data: FeedbackVote[]
  messages?: string[]
}
import {
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Loader2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Heart,
} from "lucide-react"

export default function AdminFeedbackVotes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [voteFilter, setVoteFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // API hooks
  const {
    data: feedbackVotes,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllFeedbackVotes()

  // Filter feedback votes
  const filteredVotes = React.useMemo(() => {
    const votes = feedbackVotes?.data || []
    return votes.filter((vote: FeedbackVote) => {
      const matchesSearch =
        vote.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false

      const matchesVote =
        !voteFilter ||
        (voteFilter === "5" && vote.vote === 5) ||
        (voteFilter === "4" && vote.vote === 4) ||
        (voteFilter === "3" && vote.vote === 3) ||
        (voteFilter === "2" && vote.vote === 2) ||
        (voteFilter === "1" && vote.vote === 1) ||
        (voteFilter === "0" && vote.vote === 0)

      const matchesDate =
        !dateFilter ||
        (() => {
          const voteDate = new Date(vote.votedAt)
          const now = new Date()

          switch (dateFilter) {
            case "today":
              return voteDate.toDateString() === now.toDateString()
            case "week":
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
              return voteDate >= weekAgo
            case "month":
              const monthAgo = new Date(
                now.getTime() - 30 * 24 * 60 * 60 * 1000
              )
              return voteDate >= monthAgo
            default:
              return true
          }
        })()

      return matchesSearch && matchesVote && matchesDate
    })
  }, [feedbackVotes, searchTerm, voteFilter, dateFilter])

  // Calculate statistics
  const stats = React.useMemo(() => {
    const votes = feedbackVotes?.data || []
    const total = votes.length
    const excellent = votes.filter(
      (vote: FeedbackVote) => vote.vote === 5
    ).length
    const good = votes.filter((vote: FeedbackVote) => vote.vote === 4).length
    const average = votes.filter((vote: FeedbackVote) => vote.vote === 3).length
    const poor = votes.filter((vote: FeedbackVote) => vote.vote === 2).length
    const veryPoor = votes.filter(
      (vote: FeedbackVote) => vote.vote === 1
    ).length
    const noRating = votes.filter(
      (vote: FeedbackVote) => vote.vote === 0
    ).length
    const overallAverage =
      total > 0
        ? votes.reduce(
            (sum: number, vote: FeedbackVote) => sum + vote.vote,
            0
          ) / total
        : 0

    return {
      total,
      excellent,
      good,
      average,
      poor,
      veryPoor,
      noRating,
      overallAverage,
    }
  }, [feedbackVotes])

  const getVoteIcon = (vote: number) => {
    if (vote === 5) return <Star className='w-4 h-4 text-yellow-400' />
    if (vote === 4) return <ThumbsUp className='w-4 h-4 text-green-400' />
    if (vote === 3) return <Heart className='w-4 h-4 text-blue-400' />
    if (vote === 2) return <ThumbsDown className='w-4 h-4 text-orange-400' />
    if (vote === 1) return <ThumbsDown className='w-4 h-4 text-red-400' />
    return <Heart className='w-4 h-4 text-gray-400' />
  }

  const getVoteColor = (vote: number) => {
    if (vote === 5) return "bg-yellow-500/20 text-yellow-400"
    if (vote === 4) return "bg-green-500/20 text-green-400"
    if (vote === 3) return "bg-blue-500/20 text-blue-400"
    if (vote === 2) return "bg-orange-500/20 text-orange-400"
    if (vote === 1) return "bg-red-500/20 text-red-400"
    return "bg-gray-500/20 text-gray-400"
  }

  const getVoteLabel = (vote: number) => {
    if (vote === 5) return "Xuất sắc"
    if (vote === 4) return "Tốt"
    if (vote === 3) return "Trung bình"
    if (vote === 2) return "Kém"
    if (vote === 1) return "Rất kém"
    return "Không đánh giá"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className='min-h-screen p-6 relative overflow-hidden'>
      <div className='relative z-10 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='p-3 bg-gradient-to-r from-vibrant-pink/20 to-purple-500/20 rounded-xl'>
              <MessageSquare className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-white'>
                Phản hồi người dùng
              </h1>
              <p className='text-white/70'>
                {isLoading ? "Đang tải..." : `${filteredVotes.length} phản hồi`}
              </p>
            </div>
          </div>
          <div className='flex space-x-3'>
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
              variant='outline'
              className='text-white border-white/20 hover:bg-white/10 flex items-center space-x-2'
            >
              {isLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <RefreshCw className='w-4 h-4' />
              )}
              <span>Làm mới</span>
            </Button>
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <Card className='p-6 bg-red-500/10 backdrop-blur-md border-red-500/20'>
            <div className='flex items-center space-x-3'>
              <AlertCircle className='w-6 h-6 text-red-400' />
              <div>
                <h3 className='text-lg font-semibold text-red-400 mb-2'>
                  Lỗi khi tải dữ liệu
                </h3>
                <p className='text-red-400/80 mb-4'>
                  Không thể tải danh sách phản hồi. Vui lòng thử lại.
                </p>
                <p className='text-red-400/60 text-sm mb-4'>
                  Chi tiết lỗi: {error?.message || "Unknown error"}
                </p>
                <Button
                  onClick={() => refetch()}
                  variant='outline'
                  className='text-red-400 border-red-400/20 hover:bg-red-400/10'
                >
                  Thử lại
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl'>
                <Users className='w-6 h-6 text-blue-400' />
              </div>
              <div className='text-right'>
                <p className='text-3xl font-bold text-white'>{stats.total}</p>
                <p className='text-white/70 text-sm'>Tổng phản hồi</p>
              </div>
            </div>
          </Card>

          <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl'>
                <Star className='w-6 h-6 text-yellow-400' />
              </div>
              <div className='text-right'>
                <p className='text-3xl font-bold text-white'>
                  {stats.excellent}
                </p>
                <p className='text-white/70 text-sm'>Xuất sắc (5⭐)</p>
              </div>
            </div>
          </Card>

          <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl'>
                <ThumbsUp className='w-6 h-6 text-green-400' />
              </div>
              <div className='text-right'>
                <p className='text-3xl font-bold text-white'>{stats.good}</p>
                <p className='text-white/70 text-sm'>Tốt (4⭐)</p>
              </div>
            </div>
          </Card>

          <Card className='p-6 bg-white/10  border-white/20'>
            <div className='flex items-center justify-between mb-4'>
              <div className='p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl'>
                <Star className='w-6 h-6 text-purple-400' />
              </div>
              <div className='text-right'>
                <p className='text-3xl font-bold text-white'>
                  {stats.overallAverage.toFixed(1)}/5
                </p>
                <p className='text-white/70 text-sm'>Điểm TB</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          <div className='flex items-center space-x-3 mb-4'>
            <Search className='w-5 h-5 text-vibrant-pink' />
            <h3 className='text-lg font-semibold text-white'>
              Tìm kiếm và lọc
            </h3>
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <input
                type='text'
                placeholder='Tìm kiếm theo email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
              />
            </div>
            <select
              value={voteFilter}
              onChange={(e) => setVoteFilter(e.target.value)}
              className='p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
            >
              <option value=''>Tất cả đánh giá</option>
              <option value='5'>Xuất sắc (5⭐)</option>
              <option value='4'>Tốt (4⭐)</option>
              <option value='3'>Trung bình (3⭐)</option>
              <option value='2'>Kém (2⭐)</option>
              <option value='1'>Rất kém (1⭐)</option>
              <option value='0'>Không đánh giá (0⭐)</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className='p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
            >
              <option value=''>Tất cả thời gian</option>
              <option value='today'>Hôm nay</option>
              <option value='week'>7 ngày qua</option>
              <option value='month'>30 ngày qua</option>
            </select>
          </div>
        </Card>

        {/* Feedback Votes Table */}
        <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='flex items-center space-x-3'>
                <Loader2 className='w-6 h-6 animate-spin text-vibrant-pink' />
                <span className='text-white/70'>
                  Đang tải danh sách phản hồi...
                </span>
              </div>
            </div>
          ) : filteredVotes.length === 0 ? (
            <div className='flex items-center justify-center py-12'>
              <div className='text-center'>
                <MessageSquare className='w-12 h-12 text-white/40 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-white/70 mb-2'>
                  Không tìm thấy phản hồi
                </h3>
                <p className='text-white/50'>
                  {searchTerm || voteFilter || dateFilter
                    ? "Thử thay đổi bộ lọc tìm kiếm"
                    : "Chưa có phản hồi nào trong hệ thống"}
                </p>
              </div>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-white/20'>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Email
                    </th>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Đánh giá
                    </th>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Thời gian
                    </th>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVotes.map((vote: FeedbackVote, index: number) => (
                    <tr
                      key={`${vote.email}-${vote.votedAt}`}
                      className='border-b border-white/10 hover:bg-white/5'
                    >
                      <td className='py-3 px-4 text-white/80 font-medium'>
                        {vote.email}
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center space-x-2'>
                          {getVoteIcon(vote.vote)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getVoteColor(
                              vote.vote
                            )}`}
                          >
                            {vote.vote}⭐
                          </span>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-white/80'>
                        {formatDate(vote.votedAt)}
                      </td>
                      <td className='py-3 px-4'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getVoteColor(
                            vote.vote
                          )}`}
                        >
                          {getVoteLabel(vote.vote)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
