"use client"

import EventAnnouncement from "@/src/components/EventAnnouncement"
import { useGetAccountById } from "@/src/services/AccountServices"
import { useUser } from "@/src/stores/tokenStore"
import { useRouter } from "next/navigation"
import React from "react"

const Page = () => {
  const user = useUser()
  const { data } = useGetAccountById(user?.sub!)
  const redirect = useRouter()

  const onJoin = () => {
    console.log(data)

    if (data?.studentCode) {
      redirect.push("/")
    } else {
      redirect.push("/user-information")
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <EventAnnouncement onJoin={onJoin} />
    </div>
  )
}

export default Page
