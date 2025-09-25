import React from "react"

interface PageProps {
  params: {
    id: string
  }
}

const page = ({ params }: PageProps) => {
  const { id } = params

  return (
    <div>
      <h1>Inspiring Instructor Awards 2025</h1>
      <p>ID: {id}</p>
    </div>
  )
}

export default page
