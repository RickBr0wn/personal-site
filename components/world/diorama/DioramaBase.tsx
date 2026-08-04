import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'

interface DioramaBaseProps {
  position: [number, number, number]
  rotationY?: number
  elevated?: boolean
  platformSize?: [number, number]
  children: React.ReactNode
}

const PLATFORM_HEIGHT = 0.4
const PLATFORM_COLOR = '#8a7256'
const STEP_COLOR = '#9c8060'
const STEP_COUNT = 3
const STEP_DEPTH = 0.5

export default function DioramaBase({
  position,
  rotationY = 0,
  elevated = false,
  platformSize = [4, 4],
  children,
}: DioramaBaseProps) {
  const [width, depth] = platformSize

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {elevated && (
        <>
          <mesh position={[0, PLATFORM_HEIGHT / 2, 0]} receiveShadow castShadow>
            <boxGeometry args={[width, PLATFORM_HEIGHT, depth]} />
            <meshToonMaterial color={PLATFORM_COLOR} gradientMap={gradientMap} />
          </mesh>
          {Array.from({ length: STEP_COUNT }, (_, i) => {
            const stepFromTop = STEP_COUNT - i
            const stepHeight = (PLATFORM_HEIGHT * stepFromTop) / (STEP_COUNT + 1)
            const stepZ = depth / 2 + STEP_DEPTH * i + STEP_DEPTH / 2
            return (
              <mesh key={i} position={[0, stepHeight / 2, stepZ]} receiveShadow castShadow>
                <boxGeometry args={[width * 0.6, stepHeight, STEP_DEPTH]} />
                <meshToonMaterial color={STEP_COLOR} gradientMap={gradientMap} />
              </mesh>
            )
          })}
        </>
      )}
      <group position={[0, elevated ? PLATFORM_HEIGHT : 0, 0]}>{children}</group>
    </group>
  )
}
