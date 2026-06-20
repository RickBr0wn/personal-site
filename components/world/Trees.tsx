import { useMemo } from 'react'
import * as THREE from 'three'

function rand(seed: number) {
  return (((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1) + 1) % 1
}

const gradientMap = (() => {
  const map = new THREE.DataTexture(new Uint8Array([80, 200]), 2, 1)
  map.needsUpdate = true
  return map
})()

const CANOPY_COLORS = ['#4a7a35', '#3d6b2a', '#527a3a', '#456e30']
const TRUNK_COLOR = '#6b4423'

const TREES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + rand(i * 3) * 0.5
  const radius = 11 + rand(i * 7) * 9
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
