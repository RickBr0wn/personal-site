import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from './worldConfig'
import { PROXIMITY_RADIUS } from './worldConfig'
import ProjectPanel from './ProjectPanel'

interface ProjectNodeProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

export default function ProjectNode({ node, characterRef, onWalkTo }: ProjectNodeProps) {
  const wasNear = useRef(false)
  const [isNear, setIsNear] = useState(false)
  const nodePos = useMemo(() => new THREE.Vector3(...node.position), [node.position])

  const gradientMap = useMemo(() => {
    const map = new THREE.DataTexture(new Uint8Array([80, 200]), 2, 1)
    map.needsUpdate = true
    return map
  }, [])

  useFrame(() => {
    if (!characterRef.current) return
    const dist = characterRef.current.position.distanceTo(nodePos)
    const near = dist < PROXIMITY_RADIUS
    if (near !== wasNear.current) {
      wasNear.current = near
      setIsNear(near)
    }
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onWalkTo(nodePos.clone())
  }

  return (
    <group position={node.position} onClick={handleClick}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 2, 8]} />
        <meshToonMaterial color="#7a5c2e" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 2.3, 0]} castShadow>
        <boxGeometry args={[1.4, 0.5, 0.1]} />
        <meshToonMaterial color={node.color} gradientMap={gradientMap} />
      </mesh>
      <Html position={[0, 2.3, 0.06]} center transform zIndexRange={[10, 0]}>
        <div style={{
          fontSize: '14px',
          color: 'white',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          userSelect: 'none',
        }}>
          {node.label}
        </div>
      </Html>
      {isNear && <ProjectPanel node={node} />}
    </group>
  )
}
