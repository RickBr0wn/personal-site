'use client'

import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, KeyboardControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'
import Floor from './Floor'
import Character from './Character'
import CameraRig from './CameraRig'
import ProjectNode from './ProjectNode'
import SpeechNode from './SpeechNode'
import SpeechBubble from './SpeechBubble'
import { WORLD_NODES, SPEECH_NODES, SPEECH_LINES } from './worldConfig'
import Trees from './Trees'
import Rocks from './Rocks'
import Clouds from './Clouds'
import Fence from './Fence'
import Hills from './Hills'

useGLTF.preload('/character.glb')

const keyMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'back', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
]

const shuffled = [...SPEECH_LINES].sort(() => Math.random() - 0.5)

export default function WorldCanvas() {
  const characterRef = useRef<Group>(null)
  const walkTarget = useRef<THREE.Vector3 | null>(null)
  const [activeSpeechLine, setActiveSpeechLine] = useState<string | null>(null)
  const speechQueue = useRef<string[]>(shuffled)
  const speechIndex = useRef(0)
  const speechTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isBubbleActive = useRef(false)

  const handleFloorClick = (point: THREE.Vector3) => {
    walkTarget.current = new THREE.Vector3(point.x, 0, point.z)
  }

  const handleWalkTo = (pos: THREE.Vector3) => {
    walkTarget.current = pos
  }

  useEffect(() => {
    return () => { if (speechTimeout.current) clearTimeout(speechTimeout.current) }
  }, [])

  const handleSpeechTrigger = useCallback(() => {
    if (isBubbleActive.current) return
    if (speechIndex.current >= speechQueue.current.length) {
      speechQueue.current = [...SPEECH_LINES].sort(() => Math.random() - 0.5)
      speechIndex.current = 0
    }
    const line = speechQueue.current[speechIndex.current++]
    isBubbleActive.current = true
    setActiveSpeechLine(line)
    speechTimeout.current = setTimeout(() => {
      setActiveSpeechLine(null)
      isBubbleActive.current = false
    }, 4000)
  }, [])

  return (
    <KeyboardControls map={keyMap}>
      <Canvas
        shadows
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 5, 10] }}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#c8dce8']} />
        <fog attach="fog" args={['#d4e4f0', 15, 40]} />
        <ambientLight intensity={0.9} color="#fff8f0" />
        <directionalLight
          position={[3, 8, 5]}
          intensity={0.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <Hills />
        <Floor onFloorClick={handleFloorClick} />
        <Fence />
        <Trees />
        <Rocks />
        <Clouds />
        <Suspense fallback={null}>
          <Character characterRef={characterRef} walkTarget={walkTarget} />
        </Suspense>
        <CameraRig characterRef={characterRef} />
        {WORLD_NODES.map(node => (
          <ProjectNode
            key={node.id}
            node={node}
            characterRef={characterRef}
            onWalkTo={handleWalkTo}
          />
        ))}
        {SPEECH_NODES.map(node => (
          <SpeechNode
            key={node.id}
            node={node}
            characterRef={characterRef}
            onTrigger={handleSpeechTrigger}
          />
        ))}
        {activeSpeechLine && (
          <SpeechBubble characterRef={characterRef} line={activeSpeechLine} />
        )}
        <Preload all />
      </Canvas>
    </KeyboardControls>
  )
}
