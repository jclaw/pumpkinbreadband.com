import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockUsePathname = jest.mocked(usePathname)

describe('Navbar', () => {
  it('renders all navigation links', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'News' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Media' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('marks the current page as active', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)

    const homeItem = screen.getByRole('link', { name: 'Home' }).closest('li')
    expect(homeItem).toHaveClass('active')
  })

  it('does not mark non-current pages as active', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)

    for (const name of ['News', 'Media', 'About', 'Contact']) {
      const item = screen.getByRole('link', { name }).closest('li')
      expect(item).not.toHaveClass('active')
    }
  })

  it.each([
    ['/news', 'News'],
    ['/media', 'Media'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ])('marks "%s" as active when on that page', (pathname, label) => {
    mockUsePathname.mockReturnValue(pathname)
    render(<Navbar />)

    const activeItem = screen.getByRole('link', { name: label }).closest('li')
    expect(activeItem).toHaveClass('active')

    const homeItem = screen.getByRole('link', { name: 'Home' }).closest('li')
    expect(homeItem).not.toHaveClass('active')
  })

  it('links point to the correct hrefs', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news')
    expect(screen.getByRole('link', { name: 'Media' })).toHaveAttribute('href', '/media')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })
})
