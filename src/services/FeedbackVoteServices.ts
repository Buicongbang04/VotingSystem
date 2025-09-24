import axios from "axios"
import { DEFAULT_API } from "../constants/API"
import {
  FeedbackVote,
  CreateFeedbackVoteRequest,
  UpdateFeedbackVoteRequest,
} from "../interfaces/FeedbackVote/FeedbackVote"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore } from "../stores/tokenStore"
import { useIsAuthenticated } from "../stores/accountStore"

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = useTokenStore.getState().accessToken
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

const FeedbackVoteApi = {
  // GET - Get all website feedback votes
  getAllFeedbackVotes: async () => {
    return axios
      .get<FeedbackVote[]>(DEFAULT_API + "/FeedbackVote", getAuthHeaders())
      .then((res) => res.data)
  },

  // POST - Create my website feedback vote
  createFeedbackVote: async (data: CreateFeedbackVoteRequest) => {
    return axios
      .post<FeedbackVote>(DEFAULT_API + "/FeedbackVote", data, getAuthHeaders())
      .then((res) => res.data)
  },

  // PATCH - Update my website feedback vote
  updateFeedbackVote: async (data: UpdateFeedbackVoteRequest) => {
    return axios
      .patch<FeedbackVote>(
        DEFAULT_API + "/FeedbackVote",
        data,
        getAuthHeaders()
      )
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
