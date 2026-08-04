import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface GithubCabinProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const DESK_COLOR = '#6b4a30'
const BEZEL_COLOR = '#2a2a2e'
const SCREEN_COLOR = '#0d1f12'
const CODE_LINE_COLOR = '#5fe07a'
const CODE_LINE_WIDTHS = [0.42, 0.5, 0.3, 0.46, 0.36]

const COMMIT_OFFSETS: [number, number, number][] = [
  [0.55, 0.3, -0.6],
  [-0.45, 0.55, -0.75],
  [0.2, 0.75, -0.55],
  [-0.25, 0.4, -0.85],
]

function CommitParticles() {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      child.position.y = COMMIT_OFFSETS[i][1] + Math.sin(t * 0.8 + i * 1.7) * 0.12
    })
  })

  return (
    <group ref={groupRef}>
      {COMMIT_OFFSETS.map((offset, i) => (
        <mesh key={i} position={offset}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color={CODE_LINE_COLOR} />
        </mesh>
      ))}
    </group>
  )
}

function Desk() {
  return (
    <mesh position={[0, 0.25, -0.4]} castShadow receiveShadow>
      <boxGeometry args={[1.6, 0.5, 0.8]} />
      <meshToonMaterial color={DESK_COLOR} gradientMap={gradientMap} />
    </mesh>
  )
}

function Monitor() {
  return (
    <group position={[0, 0.85, -0.55]}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.5, 0.06]} />
        <meshToonMaterial color={BEZEL_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.58, 0.38]} />
        <meshBasicMaterial color={SCREEN_COLOR} />
      </mesh>
      {CODE_LINE_WIDTHS.map((w, i) => (
        <mesh key={i} position={[-0.28 + w / 2, 0.13 - i * 0.07, 0.037]}>
          <planeGeometry args={[w, 0.02]} />
          <meshBasicMaterial color={CODE_LINE_COLOR} />
        </mesh>
      ))}
      <mesh position={[0, -0.32, 0]} castShadow>
        <boxGeometry args={[0.1, 0.14, 0.1]} />
        <meshToonMaterial color={BEZEL_COLOR} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

export default function GithubCabin({ node, characterRef, onWalkTo }: GithubCabinProps) {
  return (
    <DioramaBase position={node.position} platformSize={[2.4, 2.4]}>
      <Desk />
      <CommitParticles />
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={2.2}>
        <Monitor />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
