import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'

interface FloorProps {
  onFloorClick?: (point: THREE.Vector3) => void
}

export default function Floor({ onFloorClick }: FloorProps) {
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onFloorClick?.(e.point)
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onClick={handleClick}>
      <planeGeometry args={[76, 76, 24, 24]} />
      <meshToonMaterial color="#8fae7d" gradientMap={gradientMap} />
    </mesh>
  )
}
