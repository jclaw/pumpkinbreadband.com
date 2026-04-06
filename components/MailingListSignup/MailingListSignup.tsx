'use client'

import { useState } from 'react'
import styles from './MailingListSignup.module.css'

export default function MailingListSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className={styles.section} aria-label="Mailing list signup">
      <div className={styles.inner}>
        <h2 className={styles.heading}>Join the mailing list</h2>
        {submitted ? (
          <p className={styles.success}>Thanks for signing up!</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor="mailing-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="mailing-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              aria-required="true"
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
