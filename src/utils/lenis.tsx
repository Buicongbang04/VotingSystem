"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function LenisProvider({
  children,
  disabled = false,
}: {
  children: ReactNode
  disabled?: boolean
}) {
  useEffect(() => {
    if (disabled) {
      // Don't initialize Lenis if disabled
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Expose Lenis instance globally for Framer Motion
    ;(window as any).lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [disabled])

  return <>{children}</>
}
