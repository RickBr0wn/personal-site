import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 leading-tight mb-6">
          Hi, I&apos;m Rick.
        </h1>
        <p className="text-xl text-zinc-600 leading-relaxed mb-10">
          I&apos;m a developer and potter based in the South East of England.
          I code because I love it, and I make things with clay for the same reason.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dev"
            className="px-6 py-3 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            Dev work
          </Link>
          <Link
            href="/pottery"
            className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg text-sm font-medium hover:border-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Pottery
          </Link>
        </div>
      </div>
    </div>
  )
}
