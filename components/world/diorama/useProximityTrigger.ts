import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import type { Group } from 'three'
import { PROXIMITY_RADIUS } from '../worldConfig'

export function useProximityTrigger(
  nodePos: THREE.Vector3,
  characterRef: React.RefObject<Group | null>,
  radius: number = PROXIMITY_RADIUS
) {
  const wasNear = useRef(false)
  const [isNear, setIsNear] = useState(false)

  useFrame(() => {
    if (!characterRef.current) return
    const dist = characterRef.current.position.distanceTo(nodePos)
    const near = dist < radius
    if (near !== wasNear.current) {
      wasNear.current = near
      setIsNear(near)
    }
  })

  return isNear
}
