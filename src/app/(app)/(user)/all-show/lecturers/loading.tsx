import { LoadingGrid } from "@/src/components/ui/loading"

export default function Loading() {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto px-4 pt-10'>
        {/* Header skeleton */}
        <div className='mb-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          <div className='h-8 bg-gray-300 rounded w-64 animate-pulse' />
          <div className='h-10 bg-gray-300 rounded w-24 animate-pulse' />
        </div>

        {/* Search and filter skeleton */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8 items-center'>
          <div className='h-10 bg-gray-300 rounded w-48 animate-pulse' />
          <div className='h-10 bg-gray-300 rounded w-64 animate-pulse' />
          <div className='w-12 h-12 bg-gray-300 rounded animate-pulse' />
        </div>

        {/* Loading grid */}
        <LoadingGrid count={8} />
      </div>
    </div>
  )
}
