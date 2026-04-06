import type { Metadata } from 'next'
import { Roboto, Playfair_Display } from 'next/font/google'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pumpkin Bread: The Band | Modern Folk Music | Boston, MA',
    template: '%s | Pumpkin Bread: The Band',
  },
  keywords: ['pumpkin bread band website', 'pumpkin bread band'],
  openGraph: {
    siteName: 'pumpkinbread',
    type: 'website',
    images: ['/img/PumpkinBread-1983a-web.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/PumpkinBread-1983a-web.jpg'],
  },
  icons: {
    icon: '/img/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${playfairDisplay.variable}`}>
      <body>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  )
}
