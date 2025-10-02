"use client"

import EventAnnouncement from "@/src/components/EventAnnouncement"
import FeedbackVoteComponent from "@/src/components/FeedbackVoteComponent"
import { useGetAccountById } from "@/src/services/AccountServices"
import { useUser } from "@/src/stores/tokenStore"
import { useRouter } from "next/navigation"
import React from "react"

const Page = () => {
  const user = useUser()
  const { data } = useGetAccountById(user?.sub!)
  const redirect = useRouter()

  const onJoin = () => {
    if (data) {
      redirect.push(`/all-show/lecturers`)
    } else {
      redirect.push("/user-information")
    }
  }

  return (
    <div className='flex justify-center items-center pt-30 p-10'>
      <EventAnnouncement onJoin={onJoin} />
    </div>
  )
}

export default Page
