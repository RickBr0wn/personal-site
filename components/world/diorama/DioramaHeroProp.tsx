import { useMemo } from 'react'
import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import ProjectPanel from '../ProjectPanel'
import { useProximityTrigger } from './useProximityTrigger'
import PillLabel from './PillLabel'

interface DioramaHeroPropProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
  labelHeight?: number
  children: React.ReactNode
}

/**
 * Renders inside an already-positioned DioramaBase (local origin, not node.position) —
 * proximity/walk-to still use the node's absolute world position since the character is
 * never nested under a diorama's transform.
 */
export default function DioramaHeroProp({
  node,
  characterRef,
  onWalkTo,
  labelHeight = 2.4,
  children,
}: DioramaHeroPropProps) {
  const nodePos = useMemo(() => new THREE.Vector3(...node.position), [node.position])
  const isNear = useProximityTrigger(nodePos, characterRef)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onWalkTo(nodePos.clone())
  }

  return (
    <group onClick={handleClick}>
      {children}
      <PillLabel position={[0, labelHeight, 0]} text={node.label} />
      {isNear && <ProjectPanel node={node} />}
    </group>
  )
}
