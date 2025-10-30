import axiosInstance from "../lib/axios"
import { useMutation } from "@tanstack/react-query"

const ExportApi = {
  // GET - Download voting report (Excel/CSV) as a file
  downloadVotingReport: async () => {
    return axiosInstance
      .get("/Export/voting-report", {
        responseType: "blob",
        timeout: 60000,
      })
      .then((res) => {
        const blob = new Blob([res.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url

        const contentDisposition = (res.headers as any)["content-disposition"]
        let filename = "voting_report.xlsx"

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^";]+)"?/)
          if (match && match[1]) filename = match[1]
        }

        link.setAttribute("download", filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

        return { success: true, filename }
      })
  },
}

export const useDownloadVotingReport = () => {
  return useMutation({
    mutationFn: () => ExportApi.downloadVotingReport(),
  })
}

export default ExportApi
