'use client'

import { useKeyboardControls } from '@react-three/drei'

export type Controls = 'forward' | 'back' | 'left' | 'right'

export function usePlayerControls() {
  const forward = useKeyboardControls<Controls>(s => s.forward)
  const back = useKeyboardControls<Controls>(s => s.back)
  const left = useKeyboardControls<Controls>(s => s.left)
  const right = useKeyboardControls<Controls>(s => s.right)

  return { forward, back, left, right }
}
