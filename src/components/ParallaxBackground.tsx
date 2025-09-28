"use client"

import Image from "next/image"
import { useMousePosition } from "@/src/hooks/useMousePosition"
import { useClientOnly } from "@/src/hooks/useClientOnly"

export default function ParallaxBackground() {
  const mousePosition = useMousePosition()
  const isClient = useClientOnly()

  // Calculate parallax offsets based on mouse position
  const getParallaxTransform = (intensity: number) => {
    if (!isClient) return { transform: "translate(0px, 0px)" }

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const offsetX = (mousePosition.x - centerX) * intensity
    const offsetY = (mousePosition.y - centerY) * intensity

    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      transition: "transform 0.1s ease-out",
    }
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full -z-1 overflow-hidden'>
      <Image
        src='/images/bgAppUser.png'
        alt='bg'
        width={2000}
        height={2000}
        className='w-full h-full object-cover absolute bg-gradient-to-b from-[black] to-[#65002F] scale-105'
        style={getParallaxTransform(0.02)}
      />
      <Image
        src='/images/bgLeaf.png'
        alt='bg'
        width={2000}
        height={2000}
        className='w-full h-full object-cover absolute top-0 left-0'
        style={getParallaxTransform(0.05)}
      />
    </div>
  )
}
