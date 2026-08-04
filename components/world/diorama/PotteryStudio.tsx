import type * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface PotteryStudioProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const KILN_COLOR = '#7a5344'
const GLOW_COLOR = '#f2803a'
const SHELF_COLOR = '#8a6a48'
const POT_COLOR = '#b05a3a'
const WHEEL_STONE_COLOR = '#9a8e7e'
const WHEEL_DISC_COLOR = '#6e6458'
const SHELF_POT_COUNT = 3

function Kiln() {
  return (
    <group position={[-0.8, 0, -0.8]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.55, 1, 8]} />
        <meshToonMaterial color={KILN_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <coneGeometry args={[0.4, 0.3, 8]} />
        <meshToonMaterial color={KILN_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.35, 0.5]}>
        <circleGeometry args={[0.16, 10]} />
        <meshBasicMaterial color={GLOW_COLOR} />
      </mesh>
    </group>
  )
}

function Shelf() {
  return (
    <group position={[0.9, 0, -0.7]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.06, 0.3]} />
        <meshToonMaterial color={SHELF_COLOR} gradientMap={gradientMap} />
      </mesh>
      {Array.from({ length: SHELF_POT_COUNT }, (_, i) => (
        <mesh key={i} position={[-0.22 + i * 0.22, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.09, 0.15, 8]} />
          <meshToonMaterial color={POT_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
      {[-0.3, -0.6].map((x, i) => (
        <mesh key={`leg-${i}`} position={[x, 0.25, 0]} castShadow>
          <boxGeometry args={[0.05, 0.5, 0.28]} />
          <meshToonMaterial color={SHELF_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  )
}

function Wheel() {
  return (
    <group position={[0.1, 0, 0.5]}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.4, 10]} />
        <meshToonMaterial color={WHEEL_STONE_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.44, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.06, 16]} />
        <meshToonMaterial color={WHEEL_DISC_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.12, 10]} />
        <meshToonMaterial color={POT_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

export default function PotteryStudio({ node, characterRef, onWalkTo }: PotteryStudioProps) {
  return (
    <DioramaBase position={node.position} elevated platformSize={[2.8, 2.8]}>
      <Kiln />
      <Shelf />
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={1.2}>
        <Wheel />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
