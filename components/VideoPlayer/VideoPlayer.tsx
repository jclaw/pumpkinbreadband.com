'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Video } from '@/lib/videos'
import { getYoutubeThumbnail } from '@/lib/videos'
import styles from './VideoPlayer.module.css'

interface VideoPlayerProps {
  videos: Video[]
}

export default function VideoPlayer({ videos }: VideoPlayerProps) {
  const [activeId, setActiveId] = useState(videos[0]?.id)
  const active = videos.find((v) => v.id === activeId) ?? videos[0]

  return (
    <div className={styles.wrapper}>
      <div className={styles.featured}>
        <div className={styles.embedWrap}>
          <iframe
            key={active.youtubeId}
            src={`https://www.youtube.com/embed/${active.youtubeId}`}
            title={active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.embed}
          />
        </div>
        <p className={styles.featuredTitle}>{active.title}</p>
      </div>

      <ul className={styles.grid} role="list">
        {videos.map((video) => (
          <li key={video.id}>
            <button
              className={`${styles.thumb} ${video.id === activeId ? styles.thumbActive : ''}`}
              onClick={() => setActiveId(video.id)}
              aria-label={`Play: ${video.title}`}
              aria-pressed={video.id === activeId}
            >
              <div className={styles.thumbImgWrap}>
                <Image
                  src={getYoutubeThumbnail(video.youtubeId)}
                  alt=""
                  fill
                  className={styles.thumbImg}
                  sizes="200px"
                />
                <div className={styles.playOverlay} aria-hidden>▶</div>
              </div>
              <span className={styles.thumbTitle}>{video.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
