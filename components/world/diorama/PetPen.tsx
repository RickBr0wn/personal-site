import type * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface PetPenProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const POST_COLOR = '#8b6340'
const RAIL_COLOR = '#a07848'
const BODY_COLOR = '#c96a92'
const BOWL_COLOR = '#8a8070'

const PEN_POSTS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2
  const radius = 1.3
  return [Math.cos(angle) * radius, Math.sin(angle) * radius] as [number, number]
})

function Pen() {
  return (
    <>
      {PEN_POSTS.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.25, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.5, 6]} />
          <meshToonMaterial color={POST_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
      {PEN_POSTS.map(([x, z], i) => {
        const [nx, nz] = PEN_POSTS[(i + 1) % PEN_POSTS.length]
        const midX = (x + nx) / 2
        const midZ = (z + nz) / 2
        const length = Math.hypot(nx - x, nz - z)
        const angle = Math.atan2(nx - x, nz - z)
        return (
          <mesh key={`r-${i}`} position={[midX, 0.35, midZ]} rotation={[0, angle, 0]} castShadow>
            <boxGeometry args={[0.05, 0.05, length]} />
            <meshToonMaterial color={RAIL_COLOR} gradientMap={gradientMap} />
          </mesh>
        )
      })}
    </>
  )
}

function FoodBowl() {
  return (
    <mesh position={[0.6, 0.06, 0.3]} castShadow receiveShadow>
      <cylinderGeometry args={[0.16, 0.12, 0.12, 10]} />
      <meshToonMaterial color={BOWL_COLOR} gradientMap={gradientMap} />
    </mesh>
  )
}

function Blob() {
  return (
    <group position={[-0.2, 0, -0.2]}>
      <mesh position={[0, 0.24, 0]} scale={[1, 0.85, 1]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshToonMaterial color={BODY_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-0.1, 0.36, 0.24]}>
        <sphereGeometry args={[0.06, 8, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.36, 0.24]}>
        <sphereGeometry args={[0.06, 8, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.1, 0.35, 0.28]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshBasicMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.1, 0.35, 0.28]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshBasicMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

export default function PetPen({ node, characterRef, onWalkTo }: PetPenProps) {
  return (
    <DioramaBase position={node.position} platformSize={[2.8, 2.8]}>
      <Pen />
      <FoodBowl />
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={1.1}>
        <Blob />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
