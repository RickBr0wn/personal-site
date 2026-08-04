import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'

const TRUNK_COLOR = '#5c3a1f'
const CANOPY_COLORS = ['#3f6b2c', '#4d7a35', '#356024', '#487232']

const LANDMARK_POSITION: [number, number, number] = [-3.5, 0, -7]

const CANOPY_LOBES: {
  position: [number, number, number]
  radius: number
  height: number
  color: string
}[] = [
  { position: [0, 6.4, 0], radius: 2.6, height: 3.6, color: CANOPY_COLORS[0] },
  { position: [1.6, 5.2, 0.6], radius: 1.9, height: 2.8, color: CANOPY_COLORS[1] },
  { position: [-1.7, 5.0, -0.4], radius: 1.9, height: 2.8, color: CANOPY_COLORS[2] },
  { position: [0.3, 4.6, -1.8], radius: 1.7, height: 2.5, color: CANOPY_COLORS[3] },
  { position: [-0.4, 4.4, 1.7], radius: 1.7, height: 2.5, color: CANOPY_COLORS[1] },
]

export default function Landmark() {
  return (
    <group position={LANDMARK_POSITION}>
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.85, 4, 7]} />
        <meshToonMaterial color={TRUNK_COLOR} gradientMap={gradientMap} />
      </mesh>
      {CANOPY_LOBES.map((lobe, i) => (
        <mesh key={i} position={lobe.position} castShadow>
          <coneGeometry args={[lobe.radius, lobe.height, 7]} />
          <meshToonMaterial color={lobe.color} gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  )
}
