import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogPostCard from '@/components/BlogPostCard/BlogPostCard'
import { posts, getPost, getRecentPosts, formatDate } from '@/lib/posts'

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

const samplePost = posts[0]

describe('BlogPostCard', () => {
  it('renders post title', () => {
    render(<BlogPostCard post={samplePost} />)
    expect(screen.getByText(samplePost.title)).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<BlogPostCard post={samplePost} />)
    expect(screen.getByText(formatDate(samplePost.date))).toBeInTheDocument()
  })

  it('renders the excerpt in full mode', () => {
    render(<BlogPostCard post={samplePost} />)
    expect(screen.getByText(samplePost.excerpt)).toBeInTheDocument()
  })

  it('does not render excerpt in compact mode', () => {
    render(<BlogPostCard post={samplePost} compact />)
    expect(screen.queryByText(samplePost.excerpt)).not.toBeInTheDocument()
  })

  it('links to the correct post URL', () => {
    render(<BlogPostCard post={samplePost} />)
    const links = screen.getAllByRole('link')
    expect(links.some((l) => l.getAttribute('href') === `/news/${samplePost.slug}`)).toBe(true)
  })
})

describe('Post data helpers', () => {
  it('has 6 posts in the data', () => {
    expect(posts).toHaveLength(6)
  })

  it('finds a post by slug', () => {
    const post = getPost('bcmfest-2018')
    expect(post).toBeDefined()
    expect(post?.title).toContain('BCMFest')
  })

  it('returns undefined for unknown slug', () => {
    expect(getPost('nonexistent')).toBeUndefined()
  })

  it('getRecentPosts excludes the current post', () => {
    const recent = getRecentPosts('bcmfest-2018', 3)
    expect(recent.every((p) => p.slug !== 'bcmfest-2018')).toBe(true)
  })

  it('getRecentPosts respects count', () => {
    const recent = getRecentPosts(undefined, 2)
    expect(recent).toHaveLength(2)
  })

  it('formatDate returns a readable date string', () => {
    expect(formatDate('2019-03-08')).toMatch(/Mar/)
    expect(formatDate('2019-03-08')).toMatch(/2019/)
  })
})
