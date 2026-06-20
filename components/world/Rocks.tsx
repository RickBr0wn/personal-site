import * as THREE from 'three'

function rand(seed: number) {
  return (((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1) + 1) % 1
}

const gradientMap = (() => {
  const map = new THREE.DataTexture(new Uint8Array([60, 160]), 2, 1)
  map.needsUpdate = true
  return map
})()

const ROCK_COLORS = ['#8a7e6e', '#7a7060', '#9a8e7e', '#6e6458']

const ROCKS = Array.from({ length: 14 }, (_, i) => {
  const angle = rand(i * 17 + 1) * Math.PI * 2
  const radius = 4 + rand(i * 19 + 3) * 6
  const scale: [number, number, number] = [
    0.18 + rand(i * 23) * 0.42,
    0.14 + rand(i * 29) * 0.3,
    0.16 + rand(i * 31) * 0.38,
  ]
  const rotation: [number, number, number] = [
    rand(i * 37) * Math.PI,
    rand(i * 41) * Math.PI * 2,
    rand(i * 43) * Math.PI,
  ]
  const color = ROCK_COLORS[i % ROCK_COLORS.length]
  return {
    position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
    scale,
    rotation,
    color,
  }
})

export default function Rocks() {
  return (
    <>
      {ROCKS.map((rock, i) => (
        <mesh key={i} position={rock.position} scale={rock.scale} rotation={rock.rotation} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshToonMaterial color={rock.color} gradientMap={gradientMap} />
        </mesh>
      ))}
    </>
  )
}
