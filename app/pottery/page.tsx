import PotteryGallery from '@/components/PotteryGallery'
import { potteryPieces } from '@/data/pottery'

export const metadata = {
  title: 'Pottery — Rick Brown',
  description: 'A collection of pottery pieces made by Rick Brown.',
}

export default function PotteryPage() {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Pottery</h1>
        <p className="text-lg text-zinc-600 max-w-xl leading-relaxed">
          I started making pottery a couple of years ago and it quickly became something
          I love. There&apos;s something grounding about working with clay.
        </p>
      </div>
      <PotteryGallery pieces={potteryPieces} />
    </>
  )
}
