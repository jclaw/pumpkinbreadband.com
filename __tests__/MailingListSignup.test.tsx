import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MailingListSignup from '@/components/MailingListSignup/MailingListSignup'

describe('MailingListSignup', () => {
  it('renders the heading', () => {
    render(<MailingListSignup />)
    expect(screen.getByText('Join the mailing list')).toBeInTheDocument()
  })

  it('renders the email input and subscribe button', () => {
    render(<MailingListSignup />)
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('shows success message after submission with email', async () => {
    render(<MailingListSignup />)
    await userEvent.type(screen.getByPlaceholderText('Email Address'), 'test@example.com')
    const form = screen.getByPlaceholderText('Email Address').closest('form')!
    fireEvent.submit(form)

    expect(await screen.findByText(/thanks for signing up/i)).toBeInTheDocument()
  })

  it('does not show success if email is empty', () => {
    render(<MailingListSignup />)
    const form = screen.getByPlaceholderText('Email Address').closest('form')!
    fireEvent.submit(form)
    expect(screen.queryByText(/thanks for signing up/i)).not.toBeInTheDocument()
  })
})
