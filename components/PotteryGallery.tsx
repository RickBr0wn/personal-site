'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { PotteryPiece } from '@/data/pottery'

interface Props {
  pieces: PotteryPiece[]
}

export default function PotteryGallery({ pieces }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() =>
    setSelected(i => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(() =>
    setSelected(i => (i !== null && i < pieces.length - 1 ? i + 1 : i)), [pieces.length])

  useEffect(() => {
    if (selected === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected, close, prev, next])

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {pieces.map((piece, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 group"
          >
            <Image
              src={piece.src}
              alt={piece.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl"
            style={{ height: '80vh' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={pieces[selected].src}
              alt={pieces[selected].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-6 text-white/70 hover:text-white text-3xl leading-none"
          >
            ×
          </button>

          {selected > 0 && (
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none"
            >
              ‹
            </button>
          )}

          {selected < pieces.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
