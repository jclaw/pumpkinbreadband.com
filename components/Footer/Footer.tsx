import MailingListSignup from '@/components/MailingListSignup/MailingListSignup'
import styles from './Footer.module.css'

const socialLinks = [
  { href: 'https://www.facebook.com/pumpkinbreadband', label: 'Facebook' },
  { href: 'https://www.instagram.com/pumpkinbreadband', label: 'Instagram' },
  { href: 'https://www.youtube.com/channel/UCRU48CdQvowONIwSh9Li1mg', label: 'YouTube' },
  { href: 'https://pumpkinbread.bandcamp.com/', label: 'Bandcamp' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      {/* <MailingListSignup /> */}
      <div className={styles.bottom}>
        <div className={styles.inner}>
          <nav className={styles.social} aria-label="Social media links">
            {socialLinks.map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </nav>
          <p className={styles.copyright}>© {year} by Pumpkin Bread Band</p>
        </div>
      </div>
    </footer>
  )
}
