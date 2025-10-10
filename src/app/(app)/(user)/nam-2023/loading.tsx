import { LoadingGrid } from "@/src/components/ui/loading"

export default function Loading() {
  return (
    <div className='min-h-screen relative px-2 sm:px-4'>
      {/* Header skeleton */}
      <div className='pt-4 sm:pt-8 mb-8'>
        <div className='mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
          <div className='h-32 sm:h-40 md:h-48 lg:h-56 bg-gray-300 rounded-lg animate-pulse' />
        </div>
      </div>

      {/* Top 3 skeleton */}
      <div className='flex justify-center items-end gap-1 sm:gap-2 md:gap-4 mb-8 sm:mb-12 px-2 sm:px-4'>
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className={`relative transition-all duration-300 ${
              index === 2
                ? "transform scale-105 sm:scale-110 z-20"
                : "transform scale-90 sm:scale-95 z-10"
            }`}
          >
            <div
              className={`h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-300 rounded-2xl sm:rounded-3xl animate-pulse ${
                index === 2
                  ? "w-32 sm:w-40 md:w-56 lg:w-64"
                  : "w-28 sm:w-36 md:w-48 lg:w-56"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Other lecturers skeleton */}
      <section className='relative mb-6 sm:mb-8 px-2 sm:px-4'>
        <div className='w-full'>
          <div className='h-6 sm:h-8 bg-gray-300 rounded w-48 mx-auto mb-4 sm:mb-6 animate-pulse' />

          <div className='flex gap-2 sm:gap-4 md:gap-6 pb-4 overflow-x-hidden'>
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className='relative flex-shrink-0 w-28 sm:w-36 md:w-48 lg:w-56 h-40 sm:h-48 md:h-56 bg-gray-300 rounded-2xl sm:rounded-3xl animate-pulse'
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
