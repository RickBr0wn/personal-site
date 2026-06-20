import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import type { SpeechNodeData } from './worldConfig'

const COOLDOWN_MS = 30_000

interface SpeechNodeProps {
  node: SpeechNodeData
  characterRef: React.RefObject<Group | null>
  onTrigger: () => void
}

export default function SpeechNode({ node, characterRef, onTrigger }: SpeechNodeProps) {
  const nodePos = useRef(new THREE.Vector3(...node.position)).current
  const wasNear = useRef(false)
  const lastTriggered = useRef(0)

  useFrame(() => {
    if (!characterRef.current) return
    const dist = characterRef.current.position.distanceTo(nodePos)
    const near = dist < node.radius

    if (near && !wasNear.current) {
      const now = Date.now()
      if (now - lastTriggered.current > COOLDOWN_MS) {
        lastTriggered.current = now
        onTrigger()
      }
    }
    wasNear.current = near
  })

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <mesh position={node.position}>
      <sphereGeometry args={[node.radius, 12, 8]} />
      <meshBasicMaterial color="#ff69b4" wireframe opacity={0.4} transparent />
    </mesh>
  )
}
