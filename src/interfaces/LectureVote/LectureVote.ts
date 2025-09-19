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
