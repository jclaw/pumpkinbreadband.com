import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection/HeroSection'

export const metadata: Metadata = {
  description:
    'The official website of Pumpkin Bread, a folk quintet based in Boston, MA.',
}

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
    </main>
  )
}
