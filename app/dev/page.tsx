export const metadata = {
  title: 'Dev | Rick Brown',
  description: 'Development work and projects by Rick Brown.',
}

const skills = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'PostgreSQL', 'MongoDB', 'HTML', 'CSS', 'Unity', 'C#',
  'Swift', 'SwiftUI', 'AppKit',
]

const groups = [
  {
    label: 'Web',
    projects: [
      {
        title: 'hackshell.io',
        description: 'Managed Kali Linux boxes for HTB and CTF players. Browser terminal plus SSH via Tailscale, no local setup required.',
        href: 'https://hackshell-psi.vercel.app/',
        github: 'https://github.com/RickBr0wn/hackshell.io',
        year: '2026',
      },
      {
        title: 'horse-racing',
        description: 'Multiplayer horse racing party game. Players bet fake money on simulated races controlled by a host.',
        href: 'https://horse-racing-five.vercel.app',
        github: 'https://github.com/RickBr0wn/horse-racing',
        year: '2026',
      },
      {
        title: 'leafy-living',
        description: 'Website for Leafy Living, a small UK brand about plants, handmade pots, and simple ways to make your home greener.',
        href: 'http://leafy-living.com',
        github: 'https://github.com/RickBr0wn/leafy-living',
        year: '2026',
      },
    ],
  },
  {
    label: 'iOS',
    projects: [
      {
        title: 'nurchi',
        description: 'Raise a virtual pet. Keep it fed, keep it happy, try not to let it die. Built with Swift and SwiftUI.',
        href: 'https://github.com/RickBr0wn/nurchi',
        year: '2026',
      },
      {
        title: 'claynote',
        description: 'iOS app for tracking pottery pieces through the making process, from first throw to final glaze. Built with Swift.',
        href: 'https://github.com/RickBr0wn/claynote',
        year: '2026',
      },
    ],
  },
  {
    label: 'macOS',
    projects: [
      {
        title: 'caffeine',
        description: 'Menu bar app that keeps your display awake. Toggle on/off, set a countdown timer, and integrates with Siri and Shortcuts.',
        href: 'https://github.com/RickBr0wn/caffeine',
        year: '2026',
      },
    ],
  },
]

export default function DevPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">Dev</h1>
        <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
          I&apos;m self-taught, and a few years in. I work across three areas: web apps
          with TypeScript and React, iOS apps with Swift and SwiftUI, and games with
          Unity 6. I build things because I love it, not because it&apos;s my job.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
          Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span
              key={skill}
              className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
          Open Source
        </h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-zinc-500 mb-2">
              <a
                href="https://github.com/processing/p5.js-web-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                p5.js Web Editor
              </a>
            </p>
            <div className="space-y-3">
              <div>
                <a
                  href="https://github.com/processing/p5.js-web-editor/pull/1146"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-100 hover:text-zinc-400 transition-colors"
                >
                  Add ability to toggle line numbers in accessibility settings ↗
                </a>
              </div>
              <div>
                <a
                  href="https://github.com/processing/p5.js-web-editor/pull/1147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-100 hover:text-zinc-400 transition-colors"
                >
                  Add toast notification when creating a new file ↗
                </a>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-500 mb-2">
              <a
                href="https://github.com/nmap/nmap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Nmap
              </a>
            </p>
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <a
                  href="https://github.com/nmap/nmap/issues/3324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-100 hover:text-zinc-400 transition-colors"
                >
                  Fix implicit HTML decoding bug in nselib/url; add html_encode and html_decode ↗
                </a>
                <span className="text-xs text-zinc-600 shrink-0">pending review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {groups.map(group => (
          <section key={group.label}>
            <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
              {group.label}
            </h2>
            <div className="space-y-6">
              {group.projects.map(project => (
                <div key={project.title}>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="flex items-baseline gap-3">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-zinc-100 hover:text-zinc-400 transition-colors"
                      >
                        {project.title} ↗
                      </a>
                      {'github' in project && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                    <span className="text-sm text-zinc-600 ml-4 shrink-0">{project.year}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-800">
        <a
          href="https://github.com/RickBr0wn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          More projects on GitHub ↗
        </a>
      </div>
    </>
  )
}
