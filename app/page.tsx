import Link from 'next/link'
import Weather from '@/components/Weather'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight mb-6">
          Hi, I&apos;m Rick.
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed mb-10">
          I&apos;m a developer and potter based in the South East of England.
          I code because I love it, and I make things with clay for the same reason.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dev"
            className="px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            Dev work
          </Link>
          <Link
            href="/pottery"
            className="px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg text-sm font-medium hover:border-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Pottery
          </Link>
        </div>
        <Weather />
      </div>
    </div>
  )
}
