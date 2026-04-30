export const metadata = {
  title: 'About — Rick Brown',
}

export default function AboutPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">About</h1>
      </div>

      <div className="max-w-xl space-y-6 text-zinc-600 text-lg leading-relaxed">
        <p>
          I&apos;m Rick Brown, based in the South East of England. I spend my time
          writing code and making things with clay — not necessarily in that order.
        </p>
        <p>
          I&apos;ve been teaching myself to code for several years. I work mostly with
          TypeScript, React, and Next.js, and I build things because I genuinely enjoy it.
        </p>
        <p>
          Pottery came later, and it&apos;s become something I love in equal measure.
          There&apos;s something satisfying about making a physical object from nothing —
          something about putting your hands in clay and seeing what emerges.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-200">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Get in touch
        </h2>
        <a
          href="mailto:info@rickbrown.co.uk"
          className="text-zinc-900 font-medium hover:text-zinc-500 transition-colors"
        >
          info@rickbrown.co.uk
        </a>
      </div>
    </>
  )
}
