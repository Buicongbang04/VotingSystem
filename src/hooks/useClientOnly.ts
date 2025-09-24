import { useEffect, useState } from "react"

export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

// Helper hook for client-side only values
export function useClientValue<T>(
  clientValue: T,
  serverValue: T | null = null
): T | null {
  const isClient = useClientOnly()
  return isClient ? clientValue : serverValue
}
