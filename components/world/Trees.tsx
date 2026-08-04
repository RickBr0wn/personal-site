import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'

function rand(seed: number) {
  return (((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1) + 1) % 1
}

const CANOPY_COLORS = ['#4a7a35', '#3d6b2a', '#527a3a', '#456e30']
const TRUNK_COLOR = '#6b4423'

const TREE_COUNT = 44

const TREES = Array.from({ length: TREE_COUNT }, (_, i) => {
  const angle = (i / TREE_COUNT) * Math.PI * 2 + rand(i * 3) * 0.5
  const radius = 22 + rand(i * 7) * 14
  const scale = 0.75 + rand(i * 11) * 0.7
  const rotY = rand(i * 13) * Math.PI * 2
  const color = CANOPY_COLORS[i % CANOPY_COLORS.length]
  return {
    position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
    scale,
    rotY,
    color,
  }
})

function Tree({ position, scale, rotY, color }: (typeof TREES)[0]) {
  return (
    <group position={position} scale={scale} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 5]} />
        <meshToonMaterial color={TRUNK_COLOR} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <coneGeometry args={[0.65, 1.1, 5]} />
        <meshToonMaterial color={color} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 1.95, 0]} castShadow>
        <coneGeometry args={[0.45, 0.95, 5]} />
        <meshToonMaterial color={color} gradientMap={gradientMap} />
      </mesh>
    </group>
  )
}

export default function Trees() {
  return (
    <>
      {TREES.map((tree, i) => (
        <Tree key={i} {...tree} />
      ))}
    </>
  )
}
