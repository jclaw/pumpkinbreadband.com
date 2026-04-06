'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/news', label: 'News' },
  { href: '/media', label: 'Media' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface NavProps {
  variant?: 'light' | 'dark'
}

export default function Nav({ variant = 'dark' }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className={`${styles.nav} ${styles[variant]}`} aria-label="Main navigation">
      <ul className={styles.list}>
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <li key={href} className={isActive ? styles.active : undefined}>
              <Link href={href} aria-current={isActive ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
