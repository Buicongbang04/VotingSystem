"use client"

import { useEffect } from "react"

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime)
          }
          if (entry.entryType === "first-input") {
            const fidEntry = entry as any
            console.log("FID:", fidEntry.processingStart - fidEntry.startTime)
          }
          if (entry.entryType === "layout-shift") {
            const clsEntry = entry as any
            console.log("CLS:", clsEntry.value)
          }
        }
      })

      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
      })

      // Monitor page load time
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming
        console.log(
          "Page Load Time:",
          navigation.loadEventEnd - navigation.loadEventStart
        )
        console.log(
          "DOM Content Loaded:",
          navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart
        )
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return null
}

export default PerformanceMonitor
