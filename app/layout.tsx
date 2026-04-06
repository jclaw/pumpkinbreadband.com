import type { Metadata } from 'next'
import { Roboto, Playfair_Display } from 'next/font/google'
import Footer from '@/components/Footer/Footer'
import '@/styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pumpkinbreadband.com'),
  title: {
    default: 'Pumpkin Bread: The Band | Modern Folk Music | Boston, MA',
    template: '%s | Pumpkin Bread: The Band',
  },
  description:
    'Pumpkin Bread is a folk quintet based in Boston, MA that plays original acoustic music, blending influences from traditional folk songs and fiddle tunes with modern sensibilities and intricate arrangements.',
  keywords: ['pumpkin bread band', 'folk music', 'boston folk band'],
  openGraph: {
    siteName: 'Pumpkin Bread Band',
    type: 'website',
    images: ['/images/home/hero-band.avif'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/home/hero-band.avif'],
  },
  icons: {
    icon: '/img/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${playfairDisplay.variable}`}>
      <body>
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>
        {children}
        <Footer />
      </body>
    </html>
  )
}
