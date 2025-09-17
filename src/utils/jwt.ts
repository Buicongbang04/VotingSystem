export interface DecodedToken {
  sub?: string // user ID
  email?: string
  name?: string
  role?: string
  iat?: number // issued at
  exp?: number // expiration
  [key: string]: any
}

/**
 * Decode JWT token without verification (client-side only)
 * Note: This is for display purposes only. Server-side verification is required for security.
 */
export function decodeJWT(token: string): DecodedToken | null {
  try {
    // JWT has 3 parts separated by dots: header.payload.signature
    const parts = token.split(".")

    if (parts.length !== 3) {
      throw new Error("Invalid JWT format")
    }

    // Decode the payload (second part)
    const payload = parts[1]

    // Add padding if needed for base64 decoding
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4)

    // Decode base64
    const decodedPayload = atob(paddedPayload)

    // Parse JSON
    return JSON.parse(decodedPayload)
  } catch (error) {
    console.error("Error decoding JWT:", error)
    return null
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token)

  if (!decoded || !decoded.exp) {
    return true // Consider invalid tokens as expired
  }

  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}

/**
 * Check if JWT token is valid (not expired and properly formatted)
 */
export function isTokenValid(token: string): boolean {
  if (!token || typeof token !== "string") {
    return false
  }

  const decoded = decodeJWT(token)
  if (!decoded) {
    return false
  }

  return !isTokenExpired(token)
}

/**
 * Get time until token expires in seconds
 */
export function getTokenTimeToExpiry(token: string): number {
  const decoded = decodeJWT(token)

  if (!decoded || !decoded.exp) {
    return 0
  }

  const currentTime = Math.floor(Date.now() / 1000)
  return Math.max(0, decoded.exp - currentTime)
}
