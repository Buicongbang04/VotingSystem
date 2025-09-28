import axios from "axios"
import { DEFAULT_API } from "../constants/API"
import {
  LectureVote,
  LectureVoteResponse,
  CreateLectureVoteRequest,
  LectureVoteApiResponse,
} from "../interfaces/LectureVote/LectureVote"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore, useIsAuthenticated } from "../stores/tokenStore"

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = useTokenStore.getState().accessToken
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

const LectureVoteApi = {
  // GET - Get today's votes by lecture
  getTodaysVotesByLecture: async (lectureId: string) => {
    return axios
      .get<LectureVote[]>(
        DEFAULT_API + `/Lectures/${lectureId}/votes`,
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // POST - Vote for a lecture
  voteForLecture: async (lectureId: string) => {
    return axios
      .post<LectureVoteApiResponse>(
        DEFAULT_API + `/Lectures/${lectureId}/votes`,
        {},
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // DELETE - Cancel today's vote for a lecture
  cancelTodaysVote: async (lectureId: string) => {
    return axios
      .delete<LectureVoteApiResponse>(
        DEFAULT_API + `/Lectures/${lectureId}/votes`,
        getAuthHeaders()
      )
      .then((res) => res.data)
  },
}

// React Query hooks for GET operations
export const useGetTodaysVotesByLecture = (lectureId: string) => {
  const isAuthenticated = useTokenStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ["lectureVotes", lectureId, "today"],
    queryFn: () => LectureVoteApi.getTodaysVotesByLecture(lectureId),
    enabled: isAuthenticated && !!lectureId,
  })
}

// React Query hooks for mutation operations
export const useVoteForLecture = () => {
  return useMutation({
    mutationFn: ({ lectureId }: { lectureId: string }) =>
      LectureVoteApi.voteForLecture(lectureId),
  })
}

export const useCancelTodaysVote = () => {
  return useMutation({
    mutationFn: (lectureId: string) =>
      LectureVoteApi.cancelTodaysVote(lectureId),
  })
}

export default LectureVoteApi
