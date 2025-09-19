export interface FeedbackVote {
  email: string
  vote: number
  votedAt: string
}

export interface CreateFeedbackVoteRequest {
  vote: number
}

export interface UpdateFeedbackVoteRequest {
  vote: number
}
