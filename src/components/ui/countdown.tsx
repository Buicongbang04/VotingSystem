"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CountdownProps {
  targetDate: Date
  onComplete?: () => void
  className?: string
  showLabels?: boolean
  variant?: "default" | "compact" | "minimal"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      targetDate,
      onComplete,
      className,
      showLabels = true,
      variant = "default",
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    const [isComplete, setIsComplete] = React.useState(false)

    React.useEffect(() => {
      const calculateTimeLeft = (): TimeLeft => {
        const difference = targetDate.getTime() - new Date().getTime()

        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }
        } else {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
      }

      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft()
        setTimeLeft(newTimeLeft)

        if (
          newTimeLeft.days === 0 &&
          newTimeLeft.hours === 0 &&
          newTimeLeft.minutes === 0 &&
          newTimeLeft.seconds === 0
        ) {
          setIsComplete(true)
          onComplete?.()
          clearInterval(timer)
        }
      }, 1000)

      // Initial calculation
      setTimeLeft(calculateTimeLeft())

      return () => clearInterval(timer)
    }, [targetDate, onComplete])

    if (isComplete) {
      return (
        <div ref={ref} className={cn("text-center", className)}>
          <div className='text-2xl font-bold text-green-600'>Time's Up!</div>
        </div>
      )
    }

    const TimeUnit = ({ value, label }: { value: number; label: string }) => {
      if (variant === "minimal") {
        return (
          <div className='text-center'>
            <div className='text-2xl font-bold'>
              {value.toString().padStart(2, "0")}
            </div>
            {showLabels && (
              <div className='text-xs text-muted-foreground'>{label}</div>
            )}
          </div>
        )
      }

      if (variant === "compact") {
        return (
          <div className='text-center'>
            <div className='text-lg font-semibold'>
              {value.toString().padStart(2, "0")}
            </div>
            {showLabels && (
              <div className='text-xs text-muted-foreground'>{label}</div>
            )}
          </div>
        )
      }

      // Default variant
      return (
        <div className='flex flex-col items-center space-y-2'>
          <div className='bg-card border rounded-lg p-4 min-w-[80px] text-center shadow-sm'>
            <div className='text-3xl font-bold text-foreground'>
              {value.toString().padStart(2, "0")}
            </div>
          </div>
          {showLabels && (
            <div className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>
              {label}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
      >
        <div
          className={cn(
            "flex items-center space-x-4",
            variant === "compact" && "space-x-2",
            variant === "minimal" && "space-x-6"
          )}
        >
          <TimeUnit value={timeLeft.days} label='Days' />
          {variant !== "minimal" && (
            <div className='text-2xl font-bold text-muted-foreground'>:</div>
          )}
          <TimeUnit value={timeLeft.hours} label='Hours' />
          {variant !== "minimal" && (
            <div className='text-2xl font-bold text-muted-foreground'>:</div>
          )}
          <TimeUnit value={timeLeft.minutes} label='Minutes' />
          {variant !== "minimal" && (
            <div className='text-2xl font-bold text-muted-foreground'>:</div>
          )}
          <TimeUnit value={timeLeft.seconds} label='Seconds' />
        </div>
      </div>
    )
  }
)

Countdown.displayName = "Countdown"

export { Countdown }
