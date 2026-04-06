import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/posts'
import styles from './BlogPostCard.module.css'

interface BlogPostCardProps {
  post: Post
  compact?: boolean
}

export default function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <Link href={`/news/${post.slug}`} className={styles.imageLink} tabIndex={-1} aria-hidden>
        <div className={styles.imageWrap}>
          <Image
            src={post.image}
            alt=""
            fill
            className={styles.image}
            sizes={compact ? '200px' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>
      </Link>
      <div className={styles.body}>
        <time className={styles.date} dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h2 className={styles.title}>
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h2>
        {!compact && <p className={styles.excerpt}>{post.excerpt}</p>}
      </div>
    </article>
  )
}
