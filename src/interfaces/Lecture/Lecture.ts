export interface Lecture {
  id: string
  name: string
  email: string
  department: string
  quote: string
  avatarUrl: string
  isActive?: boolean
  votes?: Vote[]
}

export interface Vote {
  id: string
  lectureId: string
  lecture: string
  accountId: string
  account: Account
  votedAt: string
}

export interface Account {
  id: string
  email: string
  name: string
  studentCode: string
  semester: number
  votesRemain: number
  department: string
  isAdmin: boolean
  isBanned: boolean
  banReason: string
  provider: number
  providerId: string
  passwordHash: string
  refreshTokens: RefreshToken[]
  votes: string[]
  feedbackVote: AccountFeedbackVote
}

export interface RefreshToken {
  id: string
  token: string
  expires: string
  accountId: string
  account: string
}

export interface AccountFeedbackVote {
  accountId: string
  account: string
  vote: number
  votedAt: string
}

export interface CreateLectureRequest {
  name: string
  email: string
  department: string
  quote: string
  avatarUrl: string
}

export interface UpdateLectureRequest {
  id: string
  name?: string
  email?: string
  department?: string
  quote?: string
  avatarUrl?: string
}

export interface LectureResponse {
  data: Lecture[]
  message: string
}

export interface SingleLectureResponse {
  data: Lecture
  message: string
}
