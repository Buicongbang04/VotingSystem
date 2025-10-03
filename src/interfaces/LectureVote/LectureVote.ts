export interface LectureVote {
  email: string
  votedAt: string
}

export interface LectureVoteResponse {
  data: LectureVote[]
  message?: string
}

export interface CreateLectureVoteRequest {
  // No additional fields needed for POST request based on the API documentation
}

export interface LectureVoteApiResponse {
  data?: any
  message?: string
}

export interface VoteHistoryParams {
  page?: number
  pageSize?: number
}

export interface VoteHistoryItem {
  lectureName: string
  departmentName: string
  votedAt: string
}

export interface VoteHistoryResponse {
  data: {
    items: VoteHistoryItem[]
    totalCount: number
    page: number
    pageSize: number
    totalPages: number
  }
  message: string
}
