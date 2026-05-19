export const metadata = {
  title: 'About — Rick Brown',
}

export default function AboutPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">About</h1>
      </div>

      <div className="max-w-xl space-y-6 text-zinc-400 text-lg leading-relaxed">
        <p>
          I&apos;m Rick Brown, based in the South East of England.
        </p>
        <p>
          I&apos;ve been teaching myself to code for several years. I work mostly with
          TypeScript, React, and Next.js, and I build things because I genuinely enjoy it.
          I&apos;m also learning Unity — I&apos;ve been a gamer my whole life and making
          my own games feels like a natural next step.
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
