import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav/Nav'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <Link href="/" aria-label="Pumpkin Bread – Home">
          <Image
            src="/images/home/logo-loaf.avif"
            alt="Pumpkin Bread logo"
            width={126}
            height={78}
            className={styles.logo}
            priority
          />
        </Link>
      </div>
      <Nav variant="dark" />
    </header>
  )
}
