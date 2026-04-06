'use client'

import { useEffect, useRef } from 'react'
import styles from './VideoLightbox.module.css'

interface VideoLightboxProps {
  youtubeId: string
  title: string
  onClose: () => void
}

export default function VideoLightbox({ youtubeId, title, onClose }: VideoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <div
      ref={dialogRef}
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${title}`}
    >
      <div className={styles.modal}>
        <button
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close video"
        >
          ✕
        </button>
        <div className={styles.videoWrap}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        </div>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  )
}
