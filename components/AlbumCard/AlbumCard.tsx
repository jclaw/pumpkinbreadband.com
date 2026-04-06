import type { Album } from '@/lib/albums'
import styles from './AlbumCard.module.css'

interface AlbumCardProps {
  album: Album
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const embedSrc = `https://bandcamp.com/EmbeddedPlayer/album=${album.bandcampAlbumId}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`

  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{album.title}</h2>
      <div className={styles.embedWrap}>
        <iframe
          className={styles.embed}
          src={embedSrc}
          seamless
          title={`${album.title} by Pumpkin Bread`}
        >
          <a href={album.bandcampUrl}>{album.title} by Pumpkin Bread</a>
        </iframe>
      </div>
      <a
        href={album.listenUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.listenBtn}
      >
        Listen
      </a>
    </article>
  )
}
