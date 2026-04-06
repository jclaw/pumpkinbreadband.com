'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSending(true)
    setServerError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _honeypot: honeypot }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setServerError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.success} role="alert">
        <p>Thanks for reaching out! We'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <>
      <p className={styles.intro}>Shoot us a message using the form below!</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {/* Honeypot — hidden from real users, bots fill it in */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className="visually-hidden">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? styles.inputError : styles.input}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span id="name-error" className={styles.error} role="alert">{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className="visually-hidden">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : styles.input}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <span id="email-error" className={styles.error} role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-subject" className="visually-hidden">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className={errors.subject ? styles.inputError : styles.input}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && <span id="subject-error" className={styles.error} role="alert">{errors.subject}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className="visually-hidden">Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          className={errors.message ? styles.inputError : styles.input}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <span id="message-error" className={styles.error} role="alert">{errors.message}</span>}
      </div>

      {serverError && (
        <p className={styles.serverError} role="alert">{serverError}</p>
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? 'Sending…' : 'Send'}
      </button>
    </form>
    </>
  )
}
