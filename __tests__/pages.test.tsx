import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation for any client components
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

import NewsPage from '@/app/(pages)/news/page'
import MusicPage from '@/app/(pages)/music/page'
import AboutPage from '@/app/(pages)/about/page'
import ContactPage from '@/app/(pages)/contact/page'

describe('News page', () => {
  it('renders without crashing', () => {
    render(<NewsPage />)
  })

  it('renders all 6 blog post cards', () => {
    render(<NewsPage />)
    // Each post is an <article>, so check we get 6
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('renders post titles as links', () => {
    render(<NewsPage />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders the BCMFest post', () => {
    render(<NewsPage />)
    expect(screen.getByText(/BCMFest 2018/)).toBeInTheDocument()
  })

  it('renders the Dear Starling post', () => {
    render(<NewsPage />)
    expect(screen.getByText(/"Dear Starling" released!/)).toBeInTheDocument()
  })
})

describe('Music page', () => {
  it('renders without crashing', () => {
    render(<MusicPage />)
  })

  it('renders both album titles', () => {
    render(<MusicPage />)
    expect(screen.getByText('Dear Starling')).toBeInTheDocument()
    expect(screen.getByText('Pumpkin Bread')).toBeInTheDocument()
  })

  it('renders Listen buttons for each album', () => {
    render(<MusicPage />)
    const listenLinks = screen.getAllByRole('link', { name: 'Listen' })
    expect(listenLinks).toHaveLength(2)
  })
})

describe('About page', () => {
  it('renders without crashing', () => {
    render(<AboutPage />)
  })

  it('renders all five member names', () => {
    render(<AboutPage />)
    expect(screen.getByText('Steven Manwaring')).toBeInTheDocument()
    expect(screen.getByText('Jackson Clawson')).toBeInTheDocument()
    expect(screen.getByText('Maura Shawn Scanlin')).toBeInTheDocument()
    expect(screen.getByText('Aidan Scrimgeour')).toBeInTheDocument()
    expect(screen.getByText('Conor Hearn')).toBeInTheDocument()
  })

  it('renders the band biography quote', () => {
    render(<AboutPage />)
    expect(screen.getByText(/Pure progressive folk fusion/)).toBeInTheDocument()
  })

  it('renders the sponsor acknowledgement', () => {
    render(<AboutPage />)
    expect(screen.getByAltText('Nine Athens Music')).toBeInTheDocument()
  })
})

describe('Contact page', () => {
  it('renders without crashing', () => {
    render(<ContactPage />)
  })

  it('renders the contact form', () => {
    render(<ContactPage />)
    expect(screen.getByRole('form', { name: 'Contact form' })).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    render(<ContactPage />)
    expect(screen.getByPlaceholderText('Name *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()
  })

  it('renders the Send button', () => {
    render(<ContactPage />)
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })
})
