import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav/Nav'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

import { usePathname } from 'next/navigation'
const mockUsePathname = vi.mocked(usePathname)

describe('Nav', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders all six navigation links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Music' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'News' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Media' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('marks the current page as active with aria-current', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not mark non-current pages as active', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
  })

  it.each([
    ['/music', 'Music'],
    ['/news', 'News'],
    ['/media', 'Media'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ])('marks "%s" link as active when on that path', (pathname, label) => {
    mockUsePathname.mockReturnValue(pathname)
    render(<Nav />)
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('links point to correct hrefs', () => {
    render(<Nav />)
    const expectedHrefs = ['/', '/music', '/news', '/media', '/about', '/contact']
    const links = screen.getAllByRole('link')
    expectedHrefs.forEach((href, i) => {
      expect(links[i]).toHaveAttribute('href', href)
    })
  })

  it('has a navigation landmark', () => {
    render(<Nav />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
