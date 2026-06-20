export const PROXIMITY_RADIUS = 2.5

export type ProjectNodeData = {
  id: string
  label: string
  oneliner: string
  live: string
  github: string
  position: [number, number, number]
  color: string
  liveLabel?: string
  githubLabel?: string
}

export const WORLD_NODES: ProjectNodeData[] = [
  {
    id: 'hackshell',
    label: 'hackshell',
    oneliner: 'Browser terminal for HTB and CTF players. SSH via Tailscale, no local setup.',
    live: 'https://hackshell-psi.vercel.app/',
    github: 'https://github.com/RickBr0wn/hackshell.io',
    position: [8, 0, 0],
    color: '#4f7ba3',
  },
  {
    id: 'horse-racing',
    label: 'horse-racing',
    oneliner: 'Multiplayer horse racing party game. Bet fake money, pick your horse.',
    live: 'https://horse-racing-five.vercel.app',
    github: 'https://github.com/RickBr0wn/horse-racing',
    position: [5, 0, 6],
    color: '#c9853a',
  },
  {
    id: 'leafy-living',
    label: 'leafy living',
    oneliner: 'A UK brand about plants, handmade pots, and making your home greener.',
    live: 'http://leafy-living.com',
    github: 'https://github.com/RickBr0wn/leafy-living',
    position: [-5, 0, 6],
    color: '#5a8a4a',
  },
  {
    id: 'nurchi',
    label: 'nurchi',
    oneliner: 'Raise a virtual pet. Keep it fed, keep it happy, try not to let it die.',
    live: 'https://github.com/RickBr0wn/nurchi',
    github: 'https://github.com/RickBr0wn/nurchi',
    position: [5, 0, -7],
    color: '#b06080',
  },
  {
    id: 'claynote',
    label: 'claynote',
    oneliner: 'Tracking pottery pieces from first touch to final glaze.',
    live: 'https://github.com/RickBr0wn/claynote',
    github: 'https://github.com/RickBr0wn/claynote',
    position: [-5, 0, -7],
    color: '#b05a3a',
  },
  {
    id: 'caffeine',
    label: 'caffeine',
    oneliner: 'Keeps your Mac display awake. Menu bar toggle, timer, Siri support.',
    live: 'https://github.com/RickBr0wn/caffeine',
    github: 'https://github.com/RickBr0wn/caffeine',
    position: [-8, 0, 0],
    color: '#5a7a9a',
  },
  {
    id: 'github',
    label: 'GitHub',
    oneliner: 'The rest of the work lives here.',
    live: 'https://github.com/RickBr0wn',
    github: 'https://github.com/RickBr0wn',
    position: [0, 0, -9],
    color: '#8a8070',
  },
  {
    id: 'open-source',
    label: 'open source',
    oneliner: 'Merged PRs to p5.js Web Editor. Nmap fix pending review.',
    live: 'https://github.com/processing/p5.js-web-editor/pulls?q=author%3ARickBr0wn',
    github: 'https://github.com/nmap/nmap/issues/3324',
    position: [0, 0, 8],
    color: '#7a5a9a',
    liveLabel: 'p5.js',
    githubLabel: 'Nmap',
  },
]

export type SpeechNodeData = {
  id: string
  position: [number, number, number]
  radius: number
}

export const SPEECH_NODES: SpeechNodeData[] = [
  { id: 's1', position: [6.5, 0, 3], radius: 2 },
  { id: 's2', position: [0, 0, 6], radius: 2 },
  { id: 's3', position: [-6.5, 0, 3], radius: 2 },
  { id: 's4', position: [-6.5, 0, -3.5], radius: 2 },
  { id: 's5', position: [-2.5, 0, -8], radius: 2 },
  { id: 's6', position: [2.5, 0, -8], radius: 2 },
  { id: 's7', position: [6.5, 0, -3.5], radius: 2 },
  { id: 's8', position: [0, 0, -2], radius: 2 },
]

export const SPEECH_LINES = [
  "Self-taught. Started with YouTube tutorials. Didn't stop.",
  'I build for web, iOS, and occasionally make games.',
  'Based in South East England.',
  "TypeScript is my daily driver. Swift when I'm on Apple platforms.",
  'I made a Unity game once. Then another. Then a few more.',
  'I also make pottery. Keeps me sane.',
  'Open source contributor. Small PRs, real impact.',
  'Drop me a line: info@rickbrown.co.uk',
]
