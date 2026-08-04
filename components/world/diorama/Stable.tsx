import type * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface StableProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const WALL_COLOR = '#8a5a3a'
const ROOF_COLOR = '#5c3a24'
const DOOR_COLOR = '#c9853a'
const POST_COLOR = '#7a5c3e'
const FLAG_POLE_COLOR = '#6e6458'
const FLAG_COLOR = '#c9853a'

const PADDOCK_POSTS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2
  const radius = 1.6
  return [Math.cos(angle) * radius, 0.4, 1.2 + Math.sin(angle) * radius * 0.6] as [number, number, number]
})

function StableBuilding() {
  return (
    <group position={[-0.5, 0, -0.8]}>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.3, 1.2]} />
        <meshToonMaterial color={WALL_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.3, 0.7, 4]} />
        <meshToonMaterial color={ROOF_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

function PaddockFence() {
  return (
    <>
      {PADDOCK_POSTS.map((pos, i) => (
        <mesh key={i} position={pos} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.4, 6]} />
          <meshToonMaterial color={POST_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
    </>
  )
}

function FinishFlag() {
  return (
    <group position={[1.2, 0, -0.4]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
        <meshToonMaterial color={FLAG_POLE_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0.22, 1, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[0.22, 0.4, 3]} />
        <meshToonMaterial color={FLAG_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

function StableDoor() {
  return (
    <mesh position={[0.32, 0.5, -0.21]} castShadow>
      <boxGeometry args={[0.5, 0.9, 0.05]} />
      <meshToonMaterial color={DOOR_COLOR} gradientMap={gradientMap} />
    </mesh>
  )
}

export default function Stable({ node, characterRef, onWalkTo }: StableProps) {
  return (
    <DioramaBase position={node.position} platformSize={[3, 3]}>
      <StableBuilding />
      <PaddockFence />
      <FinishFlag />
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={1.8}>
        <StableDoor />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
