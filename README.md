# rickbrown.co.uk

![Portfolio screenshot](public/screenshot-portfolio-website.png)

Personal site for Rick Brown: developer and potter based in the South East of England.

The homepage is an interactive 3D world built with React Three Fiber. A Mixamo character roams a scene containing trees, rocks, hills, clouds, and a fence. Project nodes are placed in the world and open a detail panel when clicked.

## Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) — 3D rendering
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — React renderer for Three.js
- [Drei](https://github.com/pmndrs/drei) — helpers and abstractions for R3F

## Pages

- `/` — Interactive 3D world homepage with a walkable character and clickable project nodes
- `/dev` — Development projects and skills
- `/pottery` — Pottery gallery
- `/about` — About

## Controls (3D world)

| Input | Action |
|---|---|
| `W` / `↑` | Walk forward |
| `S` / `↓` | Walk backward |
| `A` / `←` | Turn left |
| `D` / `→` | Turn right |
| Click a project node | Open project detail panel |

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pottery images

Drop images into `public/pottery/` and update `data/pottery.ts` with the filenames.

## Deployment

Deployed on [Vercel](https://vercel.com).

## License

MIT — see [LICENSE.md](LICENSE.md).
