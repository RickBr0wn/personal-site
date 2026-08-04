import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import PillLabel from './PillLabel'

interface WorkshopShedProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const WALL_COLOR = '#8a7256'
const ROOF_COLOR = '#5a4632'
const EASEL_COLOR = '#a07848'
const CANVAS_COLOR = '#f5ede0'
const GLASS_RIM_COLOR = '#7a5c2e'
const GLASS_LENS_COLOR = '#bcdff5'

function openLink(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function Shed() {
  return (
    <group position={[0, 0, -0.8]}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.4, 1.6]} />
        <meshToonMaterial color={WALL_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.7, 0.7, 4]} />
        <meshToonMaterial color={ROOF_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

interface EaselProps {
  label: string
  onClick: (e: ThreeEvent<MouseEvent>) => void
}

function Easel({ label, onClick }: EaselProps) {
  return (
    <group position={[-0.9, 0, 0.6]} onClick={onClick}>
      <mesh position={[0, 0.6, 0]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.55, 0.7, 0.04]} />
        <meshToonMaterial color={CANVAS_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-0.22, 0.25, 0.1]} rotation={[0, 0, 0.35]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 5]} />
        <meshToonMaterial color={EASEL_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0.22, 0.25, 0.1]} rotation={[0, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 5]} />
        <meshToonMaterial color={EASEL_COLOR} gradientMap={gradientMap} />
      </mesh>
      <PillLabel position={[0, 1.15, 0]} text={label} />
    </group>
  )
}

interface MagnifyingGlassProps {
  label: string
  onClick: (e: ThreeEvent<MouseEvent>) => void
}

function MagnifyingGlass({ label, onClick }: MagnifyingGlassProps) {
  return (
    <group position={[0.9, 0.55, 0.6]} onClick={onClick}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.22, 0.05, 8, 16]} />
        <meshToonMaterial color={GLASS_RIM_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.2, 16]} />
        <meshBasicMaterial color={GLASS_LENS_COLOR} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.3, -0.3, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.45, 6]} />
        <meshToonMaterial color={GLASS_RIM_COLOR} gradientMap={gradientMap} />
      </mesh>
      <PillLabel position={[0, 0.6, 0]} text={label} />
    </group>
  )
}

export default function WorkshopShed({ node }: WorkshopShedProps) {
  const handleEaselClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    openLink(node.live)
  }
  const handleGlassClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    openLink(node.github)
  }

  return (
    <DioramaBase position={node.position} platformSize={[2.6, 2.6]}>
      <Shed />
      <Easel label={node.liveLabel ?? 'Live'} onClick={handleEaselClick} />
      <MagnifyingGlass label={node.githubLabel ?? 'GitHub'} onClick={handleGlassClick} />
      <PillLabel position={[0, 2.1, -0.8]} text={node.label} />
    </DioramaBase>
  )
}
