import axios from "axios"
import { DEFAULT_API } from "../constants/API"
import {
  LectureVote,
  LectureVoteResponse,
  CreateLectureVoteRequest,
  LectureVoteApiResponse,
} from "../interfaces/LectureVote/LectureVote"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore } from "../stores/tokenStore"

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
        DEFAULT_API + `/Lecture/${lectureId}/votes`,
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // POST - Vote for a lecture
  voteForLecture: async (
    lectureId: string,
    data?: CreateLectureVoteRequest
  ) => {
    return axios
      .post<LectureVoteApiResponse>(
        DEFAULT_API + `/Lecture/${lectureId}/votes`,
        data || {},
        getAuthHeaders()
      )
      .then((res) => res.data)
  },

  // DELETE - Cancel today's vote for a lecture
  cancelTodaysVote: async (lectureId: string) => {
    return axios
      .delete<LectureVoteApiResponse>(
        DEFAULT_API + `/Lecture/${lectureId}/votes`,
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
    mutationFn: ({
      lectureId,
      data,
    }: {
      lectureId: string
      data?: CreateLectureVoteRequest
    }) => LectureVoteApi.voteForLecture(lectureId, data),
  })
}

export const useCancelTodaysVote = () => {
  return useMutation({
    mutationFn: (lectureId: string) =>
      LectureVoteApi.cancelTodaysVote(lectureId),
  })
}

export default LectureVoteApi
