"use client"

import Image from "next/image"
import { useMousePosition } from "@/src/hooks/useMousePosition"
import { useClientOnly } from "@/src/hooks/useClientOnly"
import { useGetWebImageByNamePublic } from "@/src/services/WebImageServices"
import { memo, useMemo } from "react"

const ParallaxBackground = memo(() => {
  const mousePosition = useMousePosition()
  const isClient = useClientOnly()

  // Fetch background images from API
  const { data: backgroundData } = useGetWebImageByNamePublic("background")
  const { data: background1Data } = useGetWebImageByNamePublic("background1")

  // Extract image URLs with fallback
  const backgroundUrl =
    backgroundData?.data?.imageUrl || "/images/bgAppUser.png"
  const background1Url = background1Data?.data?.imageUrl || "/images/bgLeaf.png"

  // Calculate parallax offsets based on mouse position with memoization
  const getParallaxTransform = useMemo(() => {
    return (intensity: number) => {
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
  }, [isClient, mousePosition.x, mousePosition.y])

  return (
    <div className='absolute top-0 left-0 w-full h-full -z-1 overflow-hidden'>
      <Image
        src={backgroundUrl}
        alt='bg'
        width={2000}
        height={2000}
        className='w-full h-full object-cover absolute bg-gradient-to-b from-[black] to-[#65002F] scale-105 brightness-50'
        style={getParallaxTransform(0.02)}
        priority
        sizes='100vw'
      />
      <Image
        src={background1Url}
        alt='bg'
        width={2000}
        height={2000}
        className='w-full h-full object-cover absolute top-0 left-0'
        style={getParallaxTransform(0.05)}
        priority
        sizes='100vw'
      />
    </div>
  )
})

ParallaxBackground.displayName = "ParallaxBackground"

export default ParallaxBackground
