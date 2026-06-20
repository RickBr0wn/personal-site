'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type WorldModeContextType = {
  is3D: boolean
  toggle: () => void
  motionReduced: boolean
}

const WorldModeContext = createContext<WorldModeContextType>({
  is3D: false,
  toggle: () => {},
  motionReduced: false,
})

export function WorldModeProvider({ children }: { children: ReactNode }) {
  const [is3D, setIs3D] = useState(false)
  const [motionReduced, setMotionReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setMotionReduced(mediaQuery.matches)

    if (!mediaQuery.matches) {
      const stored = localStorage.getItem('rick-world-mode')
      if (stored === '3d') setIs3D(true)
    }
  }, [])

  const toggle = () => {
    if (motionReduced) return
    setIs3D(prev => {
      const next = !prev
      localStorage.setItem('rick-world-mode', next ? '3d' : 'flat')
      return next
    })
  }

  return (
    <WorldModeContext.Provider value={{ is3D, toggle, motionReduced }}>
      {children}
    </WorldModeContext.Provider>
  )
}

export function useWorldMode() {
  return useContext(WorldModeContext)
}
