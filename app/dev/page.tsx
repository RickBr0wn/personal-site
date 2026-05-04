export const metadata = {
  title: 'Dev — Rick Brown',
  description: 'Development work and projects by Rick Brown.',
}

const skills = [
  'TypeScript', 'React', 'Next.js', 'Node.js',
  'PostgreSQL', 'MongoDB', 'HTML', 'CSS', 'Unity', 'C#',
]

const projects = [
  {
    title: 'Dino Endless Runner',
    description: 'An endless runner built in Unity 6. My first complete game.',
    href: 'https://rickbr0wn.itch.io/dinoendlessrunner',
    year: '2025',
  },
  {
    title: 'Recipe Finder',
    description: 'Full-stack recipe app. Search millions of dishes, save favourites, build shopping lists, and plan your week with a drag-and-drop meal planner. Built with Next.js, Auth.js, Prisma, and Spoonacular.',
    href: 'https://recipe-finder-rickbrown.vercel.app',
    year: '2025',
  },
  {
    title: 'This site',
    description: 'Personal portfolio built with Next.js 15, Tailwind CSS, and TypeScript.',
    href: 'https://github.com/RickBr0wn/portfolio',
    year: '2025',
  },
  {
    title: 'shadcn-template',
    description: 'Next.js 16 + shadcn/ui + Tailwind CSS v4 starter template with dark mode, App Router, and React 19.',
    href: 'https://github.com/RickBr0wn/shadcn-template',
    year: '2024',
  },
  {
    title: 'secure-gen',
    description: 'Cryptographically secure password and passphrase generator with strength scoring, breach checking, and batch generation. Built with Next.js 16 and React 19.',
    href: 'https://secure-gen-three.vercel.app',
    year: '2024',
  },
  {
    title: 'vite-github-pages-template',
    description: 'Minimal Vite 6 + React 19 + TypeScript 5 template with automatic CI/CD deployment to GitHub Pages via GitHub Actions.',
    href: 'https://rickbr0wn.github.io/vite-github-pages-template/',
    year: '2023',
  },
  {
    title: 'friendly-words-api',
    description: 'Netlify Functions v2 serverless API that returns random friendly word pairs — perfect for generating readable file names, usernames, or project identifiers.',
    href: 'https://friendly-words-api.netlify.app',
    year: '2022',
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
