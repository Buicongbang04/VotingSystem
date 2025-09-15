import React from "react"

const TextBox = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`w-full bg-gradient-to-r from-purple-300/20 to-transparent p-6 py-7 text-white flex flex-col gap-5 items-center justify-center ${className}`}
    >
      {children}
    </div>
  )
}

export default TextBox
