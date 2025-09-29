import axiosInstance from "../lib/axios"
import {
  LectureVote,
  LectureVoteResponse,
  CreateLectureVoteRequest,
  LectureVoteApiResponse,
} from "../interfaces/LectureVote/LectureVote"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTokenStore, useIsAuthenticated } from "../stores/tokenStore"

const LectureVoteApi = {
  // GET - Get today's votes by lecture
  getTodaysVotesByLecture: async (lectureId: string) => {
    return axiosInstance
      .get<LectureVote[]>(`/Lectures/${lectureId}/votes`)
      .then((res) => res.data)
  },

  // POST - Vote for a lecture
  voteForLecture: async (lectureId: string) => {
    return axiosInstance
      .post<LectureVoteApiResponse>(`/Lectures/${lectureId}/votes`, {})
      .then((res) => res.data)
  },

  // DELETE - Cancel today's vote for a lecture
  cancelTodaysVote: async (lectureId: string) => {
    return axiosInstance
      .delete<LectureVoteApiResponse>(`/Lectures/${lectureId}/votes`)
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
