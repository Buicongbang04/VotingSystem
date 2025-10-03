import Image from "next/image"

type Rule = {
  hearts: number
  // Cho phép 1 dòng text HOẶC 2 trường instructors/category
  text?: string
  instructors?: string
  category?: string
}

type StageCardProps = {
  title: string
  subtitle?: string
  rules: Rule[]
  className?: string
}

export function StageCard({
  title,
  subtitle,
  rules,
  className = "",
}: StageCardProps) {
  return (
    <div
      className={`relative rounded-[32px] overflow-hidden flex flex-col items-center justify-center w-full sm:w-[60px] md:w-[240px] lg:w-[300px] ${className} border-gradient`}
      style={{
        background:
          "linear-gradient(90deg, rgba(245, 75, 175, 0) 0%, #F54BAF 100%)",
        borderImage: "linear-gradient(80deg, #C81568 0%, #FEE9F3 100%) 1",
      }}
    >
      <div className='absolute inset-0 -z-2 backdrop-blur-md ' />
      <div className='relative p-6 sm:p-2 md:p-4'>
        <h3 className='text-center text-white text-md sm:text-lg font-bold mb-1'>
          {title}
        </h3>
        {subtitle && (
          <p className='text-center text-white/90 text-lg sm:text-xl mb-4'>
            {subtitle}
          </p>
        )}

        <div className='space-y-3 sm:space-y-4'>
          {rules.map((rule, idx) => (
            <div key={idx} className='text-center'>
              <div className='flex justify-center mb-1 sm:mb-2'>
                {Array.from({ length: rule.hearts }).map((_, i) => (
                  <span
                    key={i}
                    className='text-pink-400 text-lg sm:text-xl md:text-2xl mx-1'
                    style={{ textShadow: "0 0 10px rgba(255,255,255,0.6)" }}
                  >
                    <Image
                      src='/images/heart.png'
                      alt='heart'
                      width={50}
                      height={50}
                      draggable={false}
                    />
                  </span>
                ))}
              </div>

              {rule.text ? (
                <p className='text-pink-100 italic text-sm sm:text-base whitespace-pre-line'>
                  {rule.text}
                </p>
              ) : (
                <>
                  <p className='text-pink-100 italic text-md sm:text-lg'>
                    {rule.instructors}
                  </p>
                  <p className='text-pink-100/90 italic text-lg sm:text-xl'>
                    {rule.category}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
