export const metadata = {
  title: 'Dev — Rick Brown',
  description: 'Development work and projects by Rick Brown.',
}

const skills = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'PostgreSQL', 'MongoDB', 'HTML', 'CSS',
]

const projects = [
  {
    title: 'This site',
    description: 'Personal portfolio built with Next.js 15, Tailwind CSS, and TypeScript.',
    href: 'https://github.com/RickBr0wn/portfolio',
    year: '2025',
  },
]

export default function DevPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">Dev</h1>
        <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
          I&apos;ve been learning to code for several years. Self-taught, and I love it.
          I mostly work with the TypeScript and React ecosystem.
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

      <section>
        <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
          Projects
        </h2>
        <div className="space-y-6">
          {projects.map(project => (
            <div key={project.title}>
              <div className="flex items-baseline justify-between mb-1">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-100 hover:text-zinc-400 transition-colors"
                >
                  {project.title} ↗
                </a>
                <span className="text-sm text-zinc-600 ml-4 shrink-0">{project.year}</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
