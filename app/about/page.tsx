import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <div className="page-wrapper">
      <h1>About</h1>
    </div>
  )
}
