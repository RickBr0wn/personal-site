import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import { WorldModeProvider } from '@/context/WorldModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rick Brown',
  description: 'Developer and potter based in the South East of England.',
  metadataBase: new URL('https://rickbrown.co.uk'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <WorldModeProvider>
          <Nav />
          <main className="max-w-4xl mx-auto px-6 py-16">
            {children}
          </main>
          <footer className="max-w-4xl mx-auto px-6 py-8 border-t border-zinc-800 mt-8">
            <p className="text-sm text-zinc-600">© {new Date().getFullYear()} Rick Brown</p>
          </footer>
        </WorldModeProvider>
      </body>
    </html>
  )
}
