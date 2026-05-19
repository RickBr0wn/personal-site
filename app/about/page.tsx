export const metadata = {
  title: 'About | Rick Brown',
}

export default function AboutPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">About</h1>
      </div>

      <div className="max-w-xl space-y-6 text-zinc-400 text-lg leading-relaxed">
        <p>
          I&apos;m Rick Brown, based in the South East of England. I&apos;m self-taught,
          and I&apos;ve been writing code for several years. Not for work, just because
          I love it.
        </p>
        <p>
          I work mostly with TypeScript, React, and Next.js. I&apos;m also building iOS
          apps with Swift and SwiftUI, and making games in Unity 6. I&apos;ve been a
          gamer my whole life, so building my own games feels like the natural next step.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-800">
        <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
          Get in touch
        </h2>
        <a
          href="mailto:info@rickbrown.co.uk"
          className="text-zinc-100 font-medium hover:text-zinc-400 transition-colors"
        >
          info@rickbrown.co.uk
        </a>
      </div>
    </>
  )
}
