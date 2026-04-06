import type { Metadata } from 'next'
import BlogPostCard from '@/components/BlogPostCard/BlogPostCard'
import { posts } from '@/lib/posts'
import styles from './news.module.css'

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and press coverage from Pumpkin Bread.',
}

export default function NewsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
