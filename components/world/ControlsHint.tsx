'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rick-controls-hint-seen'

export default function ControlsHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(true)

    const hide = () => setVisible(false)
    const timer = setTimeout(hide, 5500)

    const handleInteract = () => hide()
    window.addEventListener('keydown', handleInteract, { once: true })
    window.addEventListener('pointerdown', handleInteract, { once: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleInteract)
      window.removeEventListener('pointerdown', handleInteract)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: '#f5ede0',
        border: '1px solid #d4c5b0',
        borderRadius: '12px',
        padding: '10px 20px',
        fontSize: '12px',
        color: '#7a6552',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
        animation: 'hintIn 0.4s ease',
      }}
    >
      WASD to move · tap or click to walk · approach nodes to explore
      <style>{`
        @keyframes hintIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
