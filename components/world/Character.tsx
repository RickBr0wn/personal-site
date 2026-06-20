'use client'

import { useRef, useEffect } from 'react'
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

export default function Character({ characterRef, walkTarget }: CharacterProps) {
  const { scene, animations } = useGLTF('/character.glb')
  const { actions } = useAnimations(animations, characterRef)
  const isWalking = useRef(false)
  const controls = usePlayerControls()

  useEffect(() => {
    // Strip root motion from hips bone so animation doesn't fight our movement code
    animations.forEach(clip => {
      clip.tracks = clip.tracks.filter(track =>
        !(track.name.toLowerCase().includes('hips') && track.name.endsWith('.position'))
      )
    })
    if (actions.idle) actions.idle.reset().fadeIn(0.3).play()
  }, [actions, animations])

  useFrame((_, delta) => {
    if (!characterRef.current) return
    const char = characterRef.current

    _direction.set(0, 0, 0)

    // WASD: world-space directions so Timmy can walk toward or away from camera
    if (controls.forward) _direction.z -= 1
    if (controls.back) _direction.z += 1
    if (controls.left) _direction.x -= 1
    if (controls.right) _direction.x += 1

    const hasKeyInput = _direction.lengthSq() > 0

    // Click-to-walk when no key held
    if (!hasKeyInput && walkTarget.current) {
      const toTarget = walkTarget.current.clone().sub(char.position)
      toTarget.y = 0
      if (toTarget.length() > 0.4) {
        _direction.copy(toTarget).normalize()
      } else {
        walkTarget.current = null
      }
    }

    const moving = _direction.lengthSq() > 0

    if (moving) {
      _direction.normalize()

      // Timmy's natural forward is +Z, so angle uses atan2(x, z) not atan2(x, -z)
      const angle = Math.atan2(_direction.x, _direction.z)
      _targetQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle)
      char.quaternion.slerp(_targetQuat, ROTATION_SPEED * delta)

      char.position.addScaledVector(_direction, WALK_SPEED * delta)
      char.position.x = Math.max(-BOUNDARY, Math.min(BOUNDARY, char.position.x))
      char.position.z = Math.max(-BOUNDARY, Math.min(BOUNDARY, char.position.z))
    }

    // Crossfade animations
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
