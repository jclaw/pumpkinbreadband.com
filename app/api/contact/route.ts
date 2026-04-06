import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
console.log('Resend initialized with API key:', process.env.RESEND_API_KEY ? '***' : 'not set')

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, subject, message, _honeypot } = body

  // Honeypot: bots fill in the hidden field; real users leave it empty.
  // Return 200 silently so bots think it worked.
  if (typeof _honeypot === 'string' && _honeypot.length > 0) {
    return NextResponse.json({ ok: true })
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL_TO ?? 'pumpkinbread714@gmail.com'
  const from = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev'
  const cc = process.env.CONTACT_EMAIL_CC
    ? process.env.CONTACT_EMAIL_CC.split(',').map((e) => e.trim()).filter(Boolean)
    : undefined

  try {
    console.log('Sending contact email with Resend:', { to, from, cc, name, email, subject })
    await resend.emails.send({
      from,
      to,
      ...(cc && { cc }),
      replyTo: email,
      subject: subject?.trim()
        ? `[Contact] ${subject.trim()}`
        : `[Contact] Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '(none)'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
