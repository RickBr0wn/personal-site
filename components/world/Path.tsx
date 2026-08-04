import { WORLD_NODES } from './worldConfig'
import { toonGradientMap as gradientMap } from '@/lib/world/toonGradient'

const PATH_WIDTH = 1.4
const PATH_THICKNESS = 0.02
const PATH_COLOR = '#b8996c'

export default function Path() {
  return (
    <>
      {WORLD_NODES.map(node => {
        const [x, , z] = node.position
        const length = Math.sqrt(x * x + z * z)
        const angle = Math.atan2(x, z)
        return (
          <mesh
            key={node.id}
            position={[x / 2, 0.015, z / 2]}
            rotation={[0, angle, 0]}
            receiveShadow
          >
            <boxGeometry args={[PATH_WIDTH, PATH_THICKNESS, length]} />
            <meshToonMaterial color={PATH_COLOR} gradientMap={gradientMap} />
          </mesh>
        )
      })}
    </>
  )
}
