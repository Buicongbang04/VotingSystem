import EventComponent from "@/src/components/EventComponent"
import React from "react"

const page = () => {
  return (
    <>
      <div className='flex p-10 gap-6'>
        <EventComponent>
          <h1 className='text-white text-4xl font-bold'>TOP 10</h1>
          <div className='text-white text-2xl '>Giảng viên</div>
          <div className='text-white text-2xl '>Truyền cảm hứng 2023</div>
        </EventComponent>
        <EventComponent>
          <h1 className='text-white text-4xl font-bold'>TOP 10</h1>
          <div className='text-white text-2xl '>Giảng viên</div>
          <div className='text-white text-2xl '>Truyền cảm hứng 2024</div>
        </EventComponent>
      </div>
      <div className='p-10'>
        <EventComponent>asd</EventComponent>
      </div>
    </>
  )
}

export default page
