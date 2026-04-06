import { vi, describe, it, expect, beforeEach } from 'vitest'

// vi.mock is hoisted before imports, so mockSend must be declared with vi.hoisted
const mockSend = vi.hoisted(() => vi.fn())

vi.mock('resend', () => ({
  // Must be a regular function (not arrow) to work with `new`
  Resend: function () {
    return { emails: { send: mockSend } }
  },
}))

import { POST } from '@/app/api/contact/route'

function makeRequest(body: object) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Alice',
  email: 'alice@example.com',
  subject: 'Hello',
  message: 'Just saying hi',
  _honeypot: '',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null })
  })

  describe('honeypot', () => {
    it('returns 200 silently and skips sending when honeypot is filled', async () => {
      const res = await POST(makeRequest({ ...validBody, _honeypot: 'http://spam.com' }))
      expect(res.status).toBe(200)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('does not trigger when _honeypot is empty string', async () => {
      const res = await POST(makeRequest({ ...validBody, _honeypot: '' }))
      expect(res.status).toBe(200)
      expect(mockSend).toHaveBeenCalledTimes(1)
    })

    it('does not trigger when _honeypot is absent', async () => {
      const { _honeypot: _, ...bodyWithout } = validBody
      const res = await POST(makeRequest(bodyWithout))
      expect(res.status).toBe(200)
      expect(mockSend).toHaveBeenCalledTimes(1)
    })
  })

  describe('validation', () => {
    it('returns 400 when name is empty', async () => {
      const res = await POST(makeRequest({ ...validBody, name: '' }))
      expect(res.status).toBe(400)
      expect(await res.json()).toMatchObject({ error: 'Missing required fields.' })
    })

    it('returns 400 when email is empty', async () => {
      const res = await POST(makeRequest({ ...validBody, email: '   ' }))
      expect(res.status).toBe(400)
    })

    it('returns 400 when message is empty', async () => {
      const res = await POST(makeRequest({ ...validBody, message: '' }))
      expect(res.status).toBe(400)
    })

    it('subject is not required — falls back to name-based subject', async () => {
      const res = await POST(makeRequest({ ...validBody, subject: '' }))
      expect(res.status).toBe(200)
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ subject: '[Contact] Message from Alice' })
      )
    })
  })

  describe('email sending', () => {
    it('returns 200 and sends email for a valid submission', async () => {
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(200)
      expect(mockSend).toHaveBeenCalledTimes(1)
    })

    it('prefixes subject with [Contact]', async () => {
      await POST(makeRequest(validBody))
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ subject: '[Contact] Hello' })
      )
    })

    it('sets replyTo to the sender email', async () => {
      await POST(makeRequest(validBody))
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ replyTo: 'alice@example.com' })
      )
    })

    it('returns 500 when Resend throws', async () => {
      mockSend.mockRejectedValue(new Error('API down'))
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(500)
      expect(await res.json()).toMatchObject({ error: expect.stringContaining('Failed') })
    })
  })
})
