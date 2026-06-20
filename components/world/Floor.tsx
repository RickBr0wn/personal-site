import { useMemo } from 'react'
import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'

interface FloorProps {
  onFloorClick?: (point: THREE.Vector3) => void
}

export default function Floor({ onFloorClick }: FloorProps) {
  const gradientMap = useMemo(() => {
    const map = new THREE.DataTexture(new Uint8Array([90, 180]), 2, 1)
    map.needsUpdate = true
    return map
  }, [])

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onFloorClick?.(e.point)
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onClick={handleClick}>
      <planeGeometry args={[60, 60, 20, 20]} />
      <meshToonMaterial color="#8fae7d" gradientMap={gradientMap} />
    </mesh>
  )
}
