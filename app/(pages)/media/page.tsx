import type { Metadata } from 'next'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import { videos } from '@/lib/videos'
import styles from './media.module.css'

export const metadata: Metadata = {
  title: 'Media',
  description: 'Watch Pumpkin Bread videos: Pepitas, Catch the Crow, Corner of My Mind, and more.',
}

export default function MediaPage() {
  return (
    <div className={styles.page}>
      <VideoPlayer videos={videos} />
    </div>
  )
}
