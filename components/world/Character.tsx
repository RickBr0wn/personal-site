'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'
import { usePlayerControls } from './usePlayerControls'
import { FENCE_HALF } from './Fence'

const WALK_SPEED = 4
const ROTATION_SPEED = 10
const BOUNDARY = FENCE_HALF - 0.4

interface CharacterProps {
  characterRef: React.RefObject<Group | null>
  walkTarget: React.MutableRefObject<THREE.Vector3 | null>
}

const _direction = new THREE.Vector3()
const _targetQuat = new THREE.Quaternion()
const _UP = new THREE.Vector3(0, 1, 0)
const _toTarget = new THREE.Vector3()

const gradientMap = (() => {
  const map = new THREE.DataTexture(new Uint8Array([60, 160]), 2, 1)
  map.needsUpdate = true
  return map
})()

export default function Character({ characterRef, walkTarget }: CharacterProps) {
  const { scene, animations } = useGLTF('/character.glb')

  const strippedAnimations = useMemo(() =>
    animations.map(clip => {
      const cloned = clip.clone()
      cloned.tracks = cloned.tracks.filter(
        track => !(track.name.toLowerCase().includes('hips') && track.name.endsWith('.position'))
      )
      return cloned
    }),
    [animations]
  )

  const { actions } = useAnimations(strippedAnimations, characterRef)
  const isWalking = useRef(false)
  const controls = usePlayerControls()

  useEffect(() => {
    if (actions.idle) actions.idle.reset().fadeIn(0.3).play()
  }, [actions])

  // Match the flat toon-shaded environment instead of Mixamo's default PBR look.
  useEffect(() => {
    scene.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return
      const current = child.material as THREE.MeshStandardMaterial
      if (!(current instanceof THREE.MeshToonMaterial)) {
        child.material = new THREE.MeshToonMaterial({
          color: current.color ?? new THREE.Color('#ffffff'),
          map: current.map ?? null,
          gradientMap,
        })
      }
      child.castShadow = true
      child.receiveShadow = true
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!characterRef.current) return
    const char = characterRef.current

    _direction.set(0, 0, 0)

    if (controls.forward) _direction.z -= 1
    if (controls.back) _direction.z += 1
    if (controls.left) _direction.x -= 1
    if (controls.right) _direction.x += 1

    const hasKeyInput = _direction.lengthSq() > 0

    if (!hasKeyInput && walkTarget.current) {
      _toTarget.copy(walkTarget.current).sub(char.position)
      _toTarget.y = 0
      if (_toTarget.length() > 0.4) {
        _direction.copy(_toTarget).normalize()
      } else {
        walkTarget.current = null
      }
    }

    const moving = _direction.lengthSq() > 0

    if (moving) {
      _direction.normalize()

      const angle = Math.atan2(_direction.x, _direction.z)
      _targetQuat.setFromAxisAngle(_UP, angle)
      char.quaternion.slerp(_targetQuat, ROTATION_SPEED * delta)

      char.position.addScaledVector(_direction, WALK_SPEED * delta)
      char.position.x = Math.max(-BOUNDARY, Math.min(BOUNDARY, char.position.x))
      char.position.z = Math.max(-BOUNDARY, Math.min(BOUNDARY, char.position.z))
      if (walkTarget.current) {
        walkTarget.current.x = Math.max(-BOUNDARY, Math.min(BOUNDARY, walkTarget.current.x))
        walkTarget.current.z = Math.max(-BOUNDARY, Math.min(BOUNDARY, walkTarget.current.z))
      }
    }

    if (moving !== isWalking.current) {
      isWalking.current = moving
      if (moving) {
        actions.idle?.fadeOut(0.2)
        actions.walk?.reset().fadeIn(0.2).play()
      } else {
        actions.walk?.fadeOut(0.2)
        actions.idle?.reset().fadeIn(0.2).play()
      }
    }
  })

  return (
    <group ref={characterRef}>
      <primitive object={scene} />
    </group>
  )
}
