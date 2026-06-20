import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

// Fixed world-space offset: above and slightly south so Timmy can walk toward camera
const CAMERA_OFFSET = new THREE.Vector3(0, 3.5, 8)
const LERP_FACTOR = 0.06
const _targetPos = new THREE.Vector3()
const _lookAt = new THREE.Vector3()

interface CameraRigProps {
  characterRef: React.RefObject<Group | null>
}

export default function CameraRig({ characterRef }: CameraRigProps) {
  const { camera } = useThree()

  useFrame(() => {
    if (!characterRef.current) return
    const charPos = characterRef.current.position

    _targetPos.copy(charPos).add(CAMERA_OFFSET)
    camera.position.lerp(_targetPos, LERP_FACTOR)

    _lookAt.set(charPos.x, charPos.y + 1, charPos.z)
    camera.lookAt(_lookAt)
  })

  return null
}
