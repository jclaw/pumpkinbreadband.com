import type { Metadata } from 'next'
import AlbumCard from '@/components/AlbumCard/AlbumCard'
import { albums } from '@/lib/albums'
import styles from './music.module.css'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Listen to Pumpkin Bread\'s albums: Dear Starling and Pumpkin Bread (self-titled).',
}

export default function MusicPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {albums.map((album) => (
          <AlbumCard key={album.title} album={album} />
        ))}
      </div>
    </div>
  )
}
