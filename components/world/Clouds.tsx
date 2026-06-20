import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

const CLOUD_DEFS = [
  { start: [-18, 11, -12], speed: 0.9, scale: 1.2 },
  { start: [6, 13, -18], speed: 0.6, scale: 1.0 },
  { start: [-4, 10, 8], speed: 1.1, scale: 0.85 },
  { start: [22, 12, -6], speed: 0.7, scale: 1.3 },
  { start: [-24, 11, -20], speed: 0.8, scale: 1.0 },
  { start: [12, 14, 14], speed: 1.0, scale: 0.9 },
]

const BLOB_OFFSETS: [number, number, number][] = [
  [0, 0, 0],
  [0.9, 0.15, 0],
  [-0.8, 0.1, 0],
  [0.4, 0.35, 0.3],
  [-0.3, 0.3, -0.3],
  [0.5, -0.1, 0.4],
]

function Cloud({ start, speed, scale }: (typeof CLOUD_DEFS)[0]) {
  const groupRef = useRef<Group>(null)
  const startX = start[0]

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.position.x += delta * speed
    if (groupRef.current.position.x > 32) {
      groupRef.current.position.x = -32
    }
  })

  return (
    <group ref={groupRef} position={start as [number, number, number]} scale={scale}>
      {BLOB_OFFSETS.map((offset, i) => (
        <mesh key={i} position={offset}>
          <sphereGeometry args={[0.8 - i * 0.04, 7, 5]} />
          <meshToonMaterial color="#f0f4f8" />
        </mesh>
      ))}
    </group>
  )
}

export default function Clouds() {
  return (
    <>
      {CLOUD_DEFS.map((def, i) => (
        <Cloud key={i} {...def} />
      ))}
    </>
  )
}
