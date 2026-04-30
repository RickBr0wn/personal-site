'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dev', label: 'Dev' },
  { href: '/pottery', label: 'Pottery' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-stone-50/80 backdrop-blur-sm border-b border-zinc-200">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
        >
          Rick Brown
        </Link>
        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname === href
                  ? 'text-zinc-900 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
