import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'
import DioramaBase from './DioramaBase'
import DioramaHeroProp from './DioramaHeroProp'

interface CoffeeCartProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

const CART_COLOR = '#5a4a3a'
const WHEEL_COLOR = '#2a2a28'
const AWNING_COLOR = '#b06080'
const CUP_COLOR = '#f5ede0'
const COFFEE_COLOR = '#4a2e1c'
const STEAM_COLOR = '#ffffff'

const STEAM_OFFSETS: [number, number, number][] = [
  [0.03, 0, 0],
  [-0.03, 0.12, 0.02],
]

function Cart() {
  return (
    <group position={[0, 0, -0.5]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.6, 0.6]} />
        <meshToonMaterial color={CART_COLOR} gradientMap={gradientMap} />
      </mesh>
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.14, 0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.08, 10]} />
          <meshToonMaterial color={WHEEL_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
      <mesh position={[0, 0.9, 0]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.06, 0.7]} />
        <meshToonMaterial color={AWNING_COLOR} gradientMap={gradientMap} />
      </mesh>
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={`p-${i}`} position={[x, 0.65, 0.25]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.5, 5]} />
          <meshToonMaterial color={CART_COLOR} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  )
}

function Steam() {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      const cycle = (t * 0.4 + i * 0.5) % 1
      child.position.y = STEAM_OFFSETS[i][1] + cycle * 0.35
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = 0.5 * (1 - cycle)
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.32, 0]}>
      {STEAM_OFFSETS.map((offset, i) => (
        <mesh key={i} position={offset}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={STEAM_COLOR} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Cup() {
  return (
    <group position={[0, 0.7, -0.2]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.16, 10]} />
        <meshToonMaterial color={CUP_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.095, 10]} />
        <meshBasicMaterial color={COFFEE_COLOR} />
      </mesh>
      <Steam />
    </group>
  )
}

export default function CoffeeCart({ node, characterRef, onWalkTo }: CoffeeCartProps) {
  return (
    <DioramaBase position={node.position} platformSize={[2.4, 2.4]}>
      <Cart />
      <DioramaHeroProp node={node} characterRef={characterRef} onWalkTo={onWalkTo} labelHeight={1.4}>
        <Cup />
      </DioramaHeroProp>
    </DioramaBase>
  )
}
