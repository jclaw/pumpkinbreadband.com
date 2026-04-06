import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Pumpkin Bread is a folk quintet based in Boston, MA that plays original acoustic music, blending influences from traditional folk songs and fiddle tunes with modern sensibilities and intricate arrangements.',
}

export default function Home() {
  return (
    <div className="page-wrapper">
      <h1>Pumpkin Bread Band</h1>
    </div>
  )
}
