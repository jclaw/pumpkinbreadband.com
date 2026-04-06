import styles from './mediaLayout.module.css'

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.darkBg}>{children}</div>
}
