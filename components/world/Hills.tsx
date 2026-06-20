import * as THREE from 'three'

const gradientMap = (() => {
  const map = new THREE.DataTexture(new Uint8Array([70, 180]), 2, 1)
  map.needsUpdate = true
  return map
})()

const HILL_COLORS = ['#6a9a5a', '#5e8a4e', '#72a462', '#5a7e4a']

const HILLS = [
  { position: [0, -1.5, -28] as [number, number, number],   scale: [14, 5, 10] as [number, number, number],  color: 0 },
  { position: [-20, -2, -24] as [number, number, number],   scale: [11, 4, 8] as [number, number, number],   color: 1 },
  { position: [20, -1.8, -22] as [number, number, number],  scale: [12, 4.5, 9] as [number, number, number], color: 2 },
  { position: [-26, -2, -10] as [number, number, number],   scale: [10, 3.5, 8] as [number, number, number], color: 3 },
  { position: [26, -2, -8] as [number, number, number],     scale: [11, 4, 9] as [number, number, number],   color: 0 },
  { position: [-24, -2, 10] as [number, number, number],    scale: [10, 3.5, 8] as [number, number, number], color: 1 },
  { position: [24, -2, 12] as [number, number, number],     scale: [11, 4, 8] as [number, number, number],   color: 2 },
  { position: [0, -1.8, 26] as [number, number, number],    scale: [13, 4.5, 9] as [number, number, number], color: 3 },
]

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
