import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News',
}

export default function News() {
  return (
    <div className="page-wrapper">
      <h1>News</h1>
    </div>
  )
}
