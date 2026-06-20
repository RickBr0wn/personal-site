import * as THREE from 'three'

const gradientMap = (() => {
  const map = new THREE.DataTexture(new Uint8Array([70, 160]), 2, 1)
  map.needsUpdate = true
  return map
})()

const POST_COLOR = '#8b6340'
const RAIL_COLOR = '#a07848'
export const FENCE_HALF = 10

const POST_SPACING = 2
const POST_HEIGHT = 1.1
const RAIL_LOW = 0.38
const RAIL_HIGH = 0.74
const RAIL_THICKNESS = 0.07

type Segment = {
  postPositions: [number, number, number][]
  railPositions: [number, number, number][]
  railRotY: number
  railLength: number
}

function buildSide(
  axis: 'x' | 'z',
  fixedVal: number,
  from: number,
  to: number
): Segment {
  const postPositions: [number, number, number][] = []
  const railPositions: [number, number, number][] = []
  const count = Math.round((to - from) / POST_SPACING)
  for (let i = 0; i <= count; i++) {
    const t = from + i * POST_SPACING
    postPositions.push(
      axis === 'x' ? [t, 0, fixedVal] : [fixedVal, 0, t]
    )
  }
  for (let i = 0; i < count; i++) {
    const mid = from + (i + 0.5) * POST_SPACING
    railPositions.push(
      axis === 'x' ? [mid, 0, fixedVal] : [fixedVal, 0, mid]
    )
  }
  return {
    postPositions,
    railPositions,
    railRotY: axis === 'z' ? Math.PI / 2 : 0,
    railLength: POST_SPACING,
  }
}

const SIDES: Segment[] = [
  buildSide('x', -FENCE_HALF, -FENCE_HALF, FENCE_HALF),
  buildSide('x',  FENCE_HALF, -FENCE_HALF, FENCE_HALF),
  buildSide('z', -FENCE_HALF, -FENCE_HALF, FENCE_HALF),
  buildSide('z',  FENCE_HALF, -FENCE_HALF, FENCE_HALF),
]

export default function Fence() {
  return (
    <>
      {SIDES.flatMap((side, si) => [
        ...side.postPositions.map((pos, pi) => (
          <mesh key={`p-${si}-${pi}`} position={[pos[0], POST_HEIGHT / 2, pos[2]]} castShadow receiveShadow>
            <cylinderGeometry args={[0.07, 0.09, POST_HEIGHT, 4]} />
            <meshToonMaterial color={POST_COLOR} gradientMap={gradientMap} />
          </mesh>
        )),
        ...side.railPositions.flatMap((pos, ri) => [
          <mesh
            key={`rl-${si}-${ri}`}
            position={[pos[0], RAIL_LOW, pos[2]]}
            rotation={[0, side.railRotY, 0]}
            castShadow
          >
            <boxGeometry args={[side.railLength, RAIL_THICKNESS, RAIL_THICKNESS]} />
            <meshToonMaterial color={RAIL_COLOR} gradientMap={gradientMap} />
          </mesh>,
          <mesh
            key={`rh-${si}-${ri}`}
            position={[pos[0], RAIL_HIGH, pos[2]]}
            rotation={[0, side.railRotY, 0]}
            castShadow
          >
            <boxGeometry args={[side.railLength, RAIL_THICKNESS, RAIL_THICKNESS]} />
            <meshToonMaterial color={RAIL_COLOR} gradientMap={gradientMap} />
          </mesh>,
        ]),
      ])}
    </>
  )
}
