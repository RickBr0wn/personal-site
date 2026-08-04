import type * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface GreenhouseProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const FRAME_COLOR = '#4a4a42'
const GLASS_COLOR = '#a9d9b8'
const POT_COLOR = '#b0603a'
const LEAF_COLORS = ['#5a8a4a', '#4d7a3d', '#679656']
const VINE_COLOR = '#4d7a3d'

const SMALL_POTS: [number, number][] = [
  [0.9, 0.5],
  [1.1, -0.3],
  [-0.9, -0.6],
]

function GreenhouseFrame() {
  return (
    <group position={[0, 0, -0.9]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.2, 1.2]} />
        <meshToonMaterial color={GLASS_COLOR} gradientMap={gradientMap} transparent opacity={0.45} />
      </mesh>
      {[-0.9, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 1.2, 1.2]} />
          <meshToonMaterial color={FRAME_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.8, 0.06, 1.2]} />
        <meshToonMaterial color={FRAME_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.9, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.1, 0.5, 4]} />
        <meshToonMaterial color={FRAME_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

function Vines() {
  return (
    <>
      {[[-0.85, -1.4, 0.2] as const, [0.88, -1.35, -0.15] as const].map((p, i) => (
        <mesh key={i} position={[p[0], 0.5, p[1]]} rotation={[0, 0, i === 0 ? 0.18 : -0.18]}>
          <cylinderGeometry args={[0.025, 0.025, 1, 5]} />
          <meshToonMaterial color={VINE_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
    </>
  )
}

function SmallPot({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.1, 0.24, 8]} />
        <meshToonMaterial color={POT_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshToonMaterial color={LEAF_COLORS[Math.floor(Math.abs(x * 7)) % LEAF_COLORS.length]} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

function BigPot() {
  return (
    <group position={[0, 0, 0.6]}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.2, 0.44, 10]} />
        <meshToonMaterial color={POT_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.62, 0]} castShadow>
        <sphereGeometry args={[0.3, 10, 8]} />
        <meshToonMaterial color={LEAF_COLORS[0]} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0.18, 0.75, 0.1]} castShadow>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshToonMaterial color={LEAF_COLORS[1]} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

export default function Greenhouse({ node, characterRef, onWalkTo }: GreenhouseProps) {
  return (
    <DioramaBase position={node.position} platformSize={[2.8, 2.8]}>
      <GreenhouseFrame />
      <Vines />
      {SMALL_POTS.map((p, i) => (
        <SmallPot key={i} x={p[0]} z={p[1]} />
      ))}
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={1.3}>
        <BigPot />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
