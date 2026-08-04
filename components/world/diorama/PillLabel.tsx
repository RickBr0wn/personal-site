import { Html } from '@react-three/drei'

interface PillLabelProps {
  position?: [number, number, number]
  text: string
}

export default function PillLabel({ position = [0, 0, 0], text }: PillLabelProps) {
  return (
    <Html position={position} center zIndexRange={[10, 0]}>
      <div
        style={{
          background: '#f5ede0',
          border: '1px solid #d4c5b0',
          borderRadius: '999px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: 600,
          color: '#3d2e1e',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.14)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {text}
      </div>
    </Html>
  )
}
