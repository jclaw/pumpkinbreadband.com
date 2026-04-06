import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm/ContactForm'

describe('ContactForm validation', () => {
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

  it('shows success message after valid submission', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByPlaceholderText('Name *'), 'Alice')
    await userEvent.type(screen.getByPlaceholderText('Email *'), 'alice@example.com')
    await userEvent.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await userEvent.type(screen.getByPlaceholderText('Message'), 'Just saying hi')

    fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/thanks for reaching out/i)
    })
  })

  it('hides the form after successful submission', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByPlaceholderText('Name *'), 'Alice')
    await userEvent.type(screen.getByPlaceholderText('Email *'), 'alice@example.com')
    await userEvent.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await userEvent.type(screen.getByPlaceholderText('Message'), 'Message text')

    fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))

    await waitFor(() => {
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
  })
})
