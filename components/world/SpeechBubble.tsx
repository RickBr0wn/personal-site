import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

interface SpeechBubbleProps {
  characterRef: React.RefObject<Group | null>
  line: string
}

export default function SpeechBubble({ characterRef, line }: SpeechBubbleProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!characterRef.current || !groupRef.current) return
    groupRef.current.position.copy(characterRef.current.position)
  })

  return (
    <group ref={groupRef}>
      <Html position={[0, 3, 0]} center zIndexRange={[20, 0]}>
        <div style={{ position: 'relative', pointerEvents: 'none' }}>
          <div
            style={{
              minWidth: '180px',
              maxWidth: '220px',
              background: '#f5ede0',
              border: '1px solid #d4c5b0',
              borderRadius: '12px',
              padding: '10px 14px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              animation: 'speechFadeIn 0.25s ease',
            }}
          >
            <p style={{ fontSize: '12px', color: '#3d2e1e', lineHeight: 1.45, margin: 0 }}>{line}</p>
            <div style={{
              position: 'absolute',
              bottom: '-9px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '9px solid #d4c5b0',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-7px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #f5ede0',
            }} />
          </div>
        </div>
        <style>{`
          @keyframes speechFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Html>
    </group>
  )
}
