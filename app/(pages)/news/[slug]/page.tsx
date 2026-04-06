import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogPostCard from '@/components/BlogPostCard/BlogPostCard'
import { posts, getPost, getRecentPosts, formatDate } from '@/lib/posts'
import styles from './post.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const recent = getRecentPosts(post.slug, 3)
  const shareUrl = `https://pumpkinbreadband.com/news/${post.slug}`
  const shareTitle = encodeURIComponent(post.title)

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/news">All Posts</Link>
      </div>

      <article className={styles.article}>
        <header className={styles.header}>
          <time className={styles.date} dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <h1 className={styles.title}>{post.title}</h1>
        </header>

        <div className={styles.imageWrap}>
          <Image
            src={post.image}
            alt={post.title}
            width={860}
            height={484}
            className={styles.image}
            priority
          />
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.share} aria-label="Share this post">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
            aria-label="Share on Facebook"
          >
            f
          </a>
          <a
            href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
            aria-label="Share on X"
          >
            𝕏
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
            aria-label="Share on LinkedIn"
          >
            in
          </a>
        </div>
      </article>

      {recent.length > 0 && (
        <section className={styles.recent} aria-label="Recent posts">
          <div className={styles.recentHeader}>
            <h2 className={styles.recentTitle}>Recent Posts</h2>
            <Link href="/news" className={styles.seeAll}>See All</Link>
          </div>
          <div className={styles.recentGrid}>
            {recent.map((p) => (
              <BlogPostCard key={p.slug} post={p} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
