import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh, Group } from 'three'
import type { ProjectNodeData } from './worldConfig'
import { PROXIMITY_RADIUS } from './worldConfig'
import ProjectPanel from './ProjectPanel'

interface ProjectNodeProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

export default function ProjectNode({ node, characterRef, onWalkTo }: ProjectNodeProps) {
  const meshRef = useRef<Mesh>(null)
  const wasNear = useRef(false)
  const [isNear, setIsNear] = useState(false)
  const nodePos = useMemo(() => new THREE.Vector3(...node.position), [node.position])

  const gradientMap = useMemo(() => {
    const map = new THREE.DataTexture(new Uint8Array([80, 200]), 2, 1)
    map.needsUpdate = true
    return map
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1.5 + Math.sin(clock.elapsedTime * 1.5 + nodePos.x) * 0.15
    }

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
    <group position={node.position}>
      <mesh ref={meshRef} onClick={handleClick} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshToonMaterial color={node.color} gradientMap={gradientMap} emissive={node.color} emissiveIntensity={0.3} />
      </mesh>
      {isNear && <ProjectPanel node={node} />}
    </group>
  )
}
