'use client'

import Image from 'next/image'
import { useState } from 'react'
import Nav from '@/components/Nav/Nav'
import VideoLightbox from '@/components/VideoLightbox/VideoLightbox'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <section className={styles.hero} aria-label="Hero">
      <Image
        src="/images/home/hero-band.avif"
        alt="Pumpkin Bread band performing outdoors in autumn"
        fill
        priority
        className={styles.bg}
        sizes="100vw"
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <a href="#main" className={`visually-hidden ${styles.skipLink}`}>
          Skip to main content
        </a>

        <Nav variant="light" />

        <div className={styles.centerContent}>
          <Image
            src="/images/home/logo-text.avif"
            alt="Pumpkin Bread"
            width={647}
            height={149}
            className={styles.logoText}
            priority
          />

          <button
            className={styles.watchBtn}
            onClick={() => setLightboxOpen(true)}
            aria-label="Watch video"
          >
            Watch video
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <VideoLightbox
          youtubeId="84lhFUkyBB4"
          title="Pepitas (Dimension Sound Sessions)"
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  )
}
