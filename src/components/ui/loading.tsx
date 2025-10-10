import React from "react"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const LoadingSpinner: React.FC<LoadingProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}
    />
  )
}

export const LoadingCard: React.FC = () => {
  return (
    <div className='relative w-full rounded-3xl overflow-hidden border-gradient animate-pulse'>
      {/* Image skeleton */}
      <div className='relative h-sm bg-gray-300' />

      {/* Content skeleton */}
      <div className='bg-gradient-to-r from-transparent to-vibrant-pink p-4 h-40 flex flex-col justify-between'>
        <div className='space-y-2'>
          <div className='h-4 bg-white/20 rounded w-3/4' />
          <div className='h-3 bg-white/20 rounded w-1/2' />
          <div className='h-3 bg-white/20 rounded w-2/3' />
        </div>

        <div className='flex items-center justify-between mt-2'>
          <div className='h-8 bg-white/20 rounded-2xl w-16' />
          <div className='h-8 bg-white/20 rounded-2xl w-8' />
        </div>
      </div>
    </div>
  )
}

export const LoadingGrid: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  )
}

export default LoadingSpinner
