import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm/ContactForm'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Pumpkin Bread Band.',
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <p className={styles.intro}>Shoot us a message using the form below!</p>
      <ContactForm />
    </div>
  )
}
