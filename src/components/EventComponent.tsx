"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const EventComponent = ({
  children,
  to,
}: {
  children: React.ReactNode
  to: string
}) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(to)}
      className='relative overflow-hidden bg-gradient-to-r from-transparent to-vibrant-pink p-4 rounded-3xl border-gradient w-full hover:bg-vibrant-pink transition-all duration-300'
    >
      <div className='absolute backdrop-blur-3xl -z-3 inset-0' />

      <div className='absolute bottom-0 right-0 translate-x-1/3 translate-y-4 -z-2'>
        <Image
          src='/images/bgAppUser.png'
          alt='Event Background'
          width={400}
          height={400}
          className=''
        />
      </div>

      <div className='flex flex-col gap-2 p-4'>{children}</div>
    </div>
  )
}

export default EventComponent
