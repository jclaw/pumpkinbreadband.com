import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import About from '@/app/about/page'
import Contact from '@/app/contact/page'
import News from '@/app/news/page'
import Media from '@/app/media/page'

describe('Pages', () => {
  it('Home renders the band name heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'Pumpkin Bread Band' })).toBeInTheDocument()
  })

  it('About renders a heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
  })

  it('Contact renders a heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  it('News renders a heading', () => {
    render(<News />)
    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument()
  })

  it('Media renders a heading', () => {
    render(<Media />)
    expect(screen.getByRole('heading', { name: 'Media' })).toBeInTheDocument()
  })
})
