'use client'

import { useEffect } from 'react'
import { Html } from '@react-three/drei'
import type { ProjectNodeData } from './worldConfig'

export default function ProjectPanel({ node }: { node: ProjectNodeData }) {
  const hasLiveSite = node.live !== node.github

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') {
        const url = hasLiveSite ? node.live : node.github
        window.open(url, '_blank', 'noopener,noreferrer')
      }
      if (e.key.toLowerCase() === 'r' && hasLiveSite) {
        window.open(node.github, '_blank', 'noopener,noreferrer')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [node, hasLiveSite])

  return (
    <Html position={[0, 3.5, 0]} center zIndexRange={[10, 0]}>
      <div
        style={{
          width: '210px',
          pointerEvents: 'all',
          background: '#f5ede0',
          border: '1px solid #d4c5b0',
          borderRadius: '12px',
          padding: '14px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
        onPointerDown={e => e.stopPropagation()}
      >
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#3d2e1e', marginBottom: '4px' }}>
          {node.label}
        </p>
        <p style={{ fontSize: '11px', color: '#7a6552', lineHeight: 1.4, marginBottom: '10px' }}>
          {node.oneliner}
        </p>
        <div style={{ display: 'flex', gap: '6px' }}>
          <a
            href={hasLiveSite ? node.live : node.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '11px',
              padding: '5px 8px',
              background: '#5a4a3a',
              color: '#f5ede0',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <span style={{ opacity: 0.5, fontSize: '10px', marginRight: '3px' }}>[E]</span>
            {hasLiveSite ? (node.liveLabel ?? 'Live') : 'Visit'}
          </a>
          {hasLiveSite && (
            <a
              href={node.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '11px',
                padding: '5px 8px',
                border: '1px solid #d4c5b0',
                color: '#7a6552',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{ opacity: 0.5, fontSize: '10px', marginRight: '3px' }}>[R]</span>
              {node.githubLabel ?? 'GitHub'}
            </a>
          )}
        </div>
      </div>
    </Html>
  )
}
