import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'

function rand(seed: number) {
  return (((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1) + 1) % 1
}

const HILL_COLORS = ['#6a9a5a', '#5e8a4e', '#72a462', '#5a7e4a']

const HILL_COUNT = 14

const HILLS = Array.from({ length: HILL_COUNT }, (_, i) => {
  const angle = (i / HILL_COUNT) * Math.PI * 2 + rand(i * 5) * 0.4
  const radius = 34 + rand(i * 9) * 12
  const width = 10 + rand(i * 13) * 6
  const height = 3.5 + rand(i * 17) * 2.5
  const depth = 8 + rand(i * 21) * 4
  return {
    position: [Math.cos(angle) * radius, -height * 0.35, Math.sin(angle) * radius] as [number, number, number],
    scale: [width, height, depth] as [number, number, number],
    color: i % HILL_COLORS.length,
  }
})

export default function Hills() {
  return (
    <>
      {HILLS.map((hill, i) => (
        <mesh key={i} position={hill.position} scale={hill.scale} receiveShadow>
          <sphereGeometry args={[1, 10, 7]} />
          <meshToonMaterial color={HILL_COLORS[hill.color]} gradientMap={gradientMap} />
        </mesh>
      ))}
    </>
  )
}
