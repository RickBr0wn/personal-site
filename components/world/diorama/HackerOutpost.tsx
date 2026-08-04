import * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface HackerOutpostProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const TENT_COLOR = '#3f4a3a'
const POLE_COLOR = '#4a4a4a'
const BEZEL_COLOR = '#232326'
const SCREEN_COLOR = '#081a12'
const TEXT_COLOR = '#4ef0c4'
const DISH_COLOR = '#9aa0a6'
const CABLE_COLOR = '#1e1e20'

const TEXT_LINE_WIDTHS = [0.38, 0.24, 0.44, 0.3]

const CABLE_POSITIONS: [number, number, number, number][] = [
  // x, z, length, rotationY
  [0.5, 0.5, 0.5, 0.4],
  [0.7, 0.1, 0.4, -0.6],
  [-0.6, 0.4, 0.45, 1.1],
]

function Tent() {
  return (
    <group position={[-0.6, 0, -0.6]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 1.1, 3]} />
        <meshToonMaterial color={TENT_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

function SatelliteDish() {
  return (
    <group position={[0.8, 0, -0.9]} rotation={[0, -0.4, 0]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1, 6]} />
        <meshToonMaterial color={POLE_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[Math.PI * 0.65, 0, 0]} castShadow>
        <sphereGeometry args={[0.3, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color={DISH_COLOR} gradientMap={gradientMap} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Cables() {
  return (
    <>
      {CABLE_POSITIONS.map(([x, z, length, rotY], i) => (
        <mesh key={i} position={[x, 0.02, z]} rotation={[Math.PI / 2, 0, rotY]}>
          <cylinderGeometry args={[0.03, 0.03, length, 5]} />
          <meshToonMaterial color={CABLE_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
    </>
  )
}

function Terminal() {
  return (
    <group position={[0, 0.55, 0.3]} rotation={[-0.1, 0, 0]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.05, 0.7, 0.4]} />
        <meshToonMaterial color={BEZEL_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0.03, 0.35, 0]}>
        <planeGeometry args={[0.32, 0.55]} />
        <meshBasicMaterial color={SCREEN_COLOR} />
      </mesh>
      {TEXT_LINE_WIDTHS.map((w, i) => (
        <mesh key={i} position={[0.032, 0.5 - i * 0.1, -0.16 + w / 2]}>
          <planeGeometry args={[w, 0.02]} />
          <meshBasicMaterial color={TEXT_COLOR} />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.35, 0.3, 0.03]} />
        <meshToonMaterial color={BEZEL_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

export default function HackerOutpost({ node, characterRef, onWalkTo }: HackerOutpostProps) {
  return (
    <DioramaBase position={node.position} elevated platformSize={[2.8, 2.8]}>
      <Tent />
      <SatelliteDish />
      <Cables />
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={1.6}>
        <Terminal />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
