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
      <ContactForm />
    </div>
  )
}
