import axiosInstance from "../lib/axios"
import {
  FeedbackVote,
  CreateFeedbackVoteRequest,
  UpdateFeedbackVoteRequest,
} from "../interfaces/FeedbackVote/FeedbackVote"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore } from "../stores/tokenStore"
import { useIsAuthenticated } from "../stores/tokenStore"

// API Response type
interface FeedbackVoteResponse {
  data: FeedbackVote[]
  messages?: string[]
}

const FeedbackVoteApi = {
  // GET - Get all website feedback votes
  getAllFeedbackVotes: async () => {
    return axiosInstance
      .get<FeedbackVoteResponse>("/FeedbackVote")
      .then((res) => res.data)
  },

  // POST - Create my website feedback vote
  createFeedbackVote: async (data: CreateFeedbackVoteRequest) => {
    return axiosInstance
      .post<FeedbackVote>("/FeedbackVote", data)
      .then((res) => res.data)
  },

  // PATCH - Update my website feedback vote
  updateFeedbackVote: async (data: UpdateFeedbackVoteRequest) => {
    return axiosInstance
      .patch<FeedbackVote>("/FeedbackVote", data)
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetAllFeedbackVotes = () => {
  const isAuthenticated = useIsAuthenticated()

  return useQuery({
    queryKey: ["feedbackVotes"],
    queryFn: () => FeedbackVoteApi.getAllFeedbackVotes(),
    enabled: isAuthenticated,
  })
}

// React Query hooks for mutation operations
export const useCreateFeedbackVote = () => {
  return useMutation({
    mutationFn: (data: CreateFeedbackVoteRequest) =>
      FeedbackVoteApi.createFeedbackVote(data),
  })
}

export const useUpdateFeedbackVote = () => {
  return useMutation({
    mutationFn: (data: UpdateFeedbackVoteRequest) =>
      FeedbackVoteApi.updateFeedbackVote(data),
  })
}

export default FeedbackVoteApi
