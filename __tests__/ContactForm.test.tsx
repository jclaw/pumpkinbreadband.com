import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm/ContactForm'

function mockFetch(ok: boolean, body: object = {}) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(body),
    })
  )
}

async function fillAndSubmit({
  name = 'Alice',
  email = 'alice@example.com',
  subject = 'Hello',
  message = 'Just saying hi',
} = {}) {
  if (name) await userEvent.type(screen.getByPlaceholderText('Name *'), name)
  if (email) await userEvent.type(screen.getByPlaceholderText('Email *'), email)
  if (subject) await userEvent.type(screen.getByPlaceholderText('Subject'), subject)
  if (message) await userEvent.type(screen.getByPlaceholderText('Message'), message)
  fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('validation', () => {
    it('shows validation errors when submitted empty', async () => {
      render(<ContactForm />)
      fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

      await waitFor(() => {
        expect(screen.getByText('Name is required.')).toBeInTheDocument()
        expect(screen.getByText('Email is required.')).toBeInTheDocument()
        expect(screen.getByText('Message is required.')).toBeInTheDocument()
      })
    })

    it('shows email format error for invalid email', async () => {
      render(<ContactForm />)
      await userEvent.type(screen.getByPlaceholderText('Email *'), 'not-an-email')
      fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
      })
    })

    it('clears error when user starts typing in that field', async () => {
      render(<ContactForm />)
      fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))
      await waitFor(() => expect(screen.getByText('Name is required.')).toBeInTheDocument())

      await userEvent.type(screen.getByPlaceholderText('Name *'), 'Alice')
      expect(screen.queryByText('Name is required.')).not.toBeInTheDocument()
    })
  })

  describe('intro text', () => {
    it('shows the intro message before submission', () => {
      render(<ContactForm />)
      expect(screen.getByText(/shoot us a message/i)).toBeInTheDocument()
    })

    it('hides the intro message after submission', async () => {
      mockFetch(true)
      render(<ContactForm />)
      await fillAndSubmit()
      await waitFor(() => {
        expect(screen.queryByText(/shoot us a message/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('submission', () => {
    beforeEach(() => {
      mockFetch(true)
    })

    it('shows success message after valid submission', async () => {
      render(<ContactForm />)
      await fillAndSubmit()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/thanks for reaching out/i)
      })
    })

    it('hides the form after successful submission', async () => {
      render(<ContactForm />)
      await fillAndSubmit()

      await waitFor(() => {
        expect(screen.queryByRole('form')).not.toBeInTheDocument()
      })
    })

    it('sends _honeypot as empty string in the request body', async () => {
      render(<ContactForm />)
      await fillAndSubmit()

      await waitFor(() => expect(screen.queryByRole('form')).not.toBeInTheDocument())

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const body = JSON.parse(fetchCall[1]!.body as string)
      expect(body._honeypot).toBe('')
    })

    it('disables the submit button while sending', async () => {
      let resolveRequest!: (v: unknown) => void
      vi.stubGlobal(
        'fetch',
        vi.fn().mockReturnValue(new Promise((res) => { resolveRequest = res }))
      )

      render(<ContactForm />)
      await fillAndSubmit()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
      })

      resolveRequest({ ok: true, json: () => Promise.resolve({}) })
    })
  })

  describe('error handling', () => {
    it('shows server error message when API returns an error', async () => {
      mockFetch(false, { error: 'Failed to send message. Please try again.' })
      render(<ContactForm />)
      await fillAndSubmit()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/failed to send/i)
      })
    })

    it('shows generic error message on network failure', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
      render(<ContactForm />)
      await fillAndSubmit()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/network error/i)
      })
    })
  })

  describe('honeypot field', () => {
    it('renders the honeypot input as hidden from assistive tech', () => {
      render(<ContactForm />)
      const honeypotContainer = screen.getByLabelText('Website', { selector: 'input' }).closest('div')
      expect(honeypotContainer).toHaveAttribute('aria-hidden', 'true')
    })

    it('honeypot input has tabIndex -1', () => {
      render(<ContactForm />)
      expect(screen.getByLabelText('Website', { selector: 'input' })).toHaveAttribute('tabindex', '-1')
    })
  })
})
