'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useWorldMode } from '@/context/WorldModeContext'
import ControlsHint from '@/components/world/ControlsHint'

const WorldCanvas = dynamic(() => import('@/components/world/WorldCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#c8dce8] flex items-center justify-center">
      <p className="text-stone-600 text-sm">Loading world…</p>
    </div>
  ),
})

export default function Home() {
  const { is3D, toggle, motionReduced } = useWorldMode()

  if (is3D) {
    return (
      <div className="fixed inset-0" style={{ touchAction: 'none' }}>
        <WorldCanvas />
        <ControlsHint />
        <button
          onClick={toggle}
          className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-white/80 border border-stone-300 text-stone-700 rounded-lg text-sm backdrop-blur-sm hover:border-stone-500 transition-colors"
        >
          Classic view
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight mb-6">
          Hi, I&apos;m Rick.
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed mb-10">
          I&apos;m a self-taught developer based in the South East of England.
          I build web apps, iOS apps, and games. Not for work, just because I love it.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dev"
            className="px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            Dev work
          </Link>
          <a
            href="https://github.com/RickBr0wn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg text-sm font-medium hover:border-zinc-400 hover:text-zinc-100 transition-colors"
          >
            GitHub
          </a>
          {!motionReduced && (
            <button
              onClick={toggle}
              className="px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg text-sm font-medium hover:border-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Enter 3D World
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
