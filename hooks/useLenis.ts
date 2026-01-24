'use client'

import { useContext, createContext } from 'react'
import Lenis from 'lenis'

// Lenis context type
interface LenisContextType {
  lenis: Lenis | null
}

// Create context
export const LenisContext = createContext<LenisContextType>({ lenis: null })

// Hook to access Lenis instance
export function useLenis() {
  const context = useContext(LenisContext)
  
  if (context === undefined) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  
  return context
}

export default useLenis
