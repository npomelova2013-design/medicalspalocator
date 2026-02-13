import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<boolean> {
  const resend = getResend()
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping email')
    return false
  }
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const { error } = await resend.emails.send({
      from: `Medical Spa Locator <${fromEmail}>`,
      to,
      subject,
      html,
    })
    if (error) {
      console.error('Resend email error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Email send failed:', err instanceof Error ? err.message : err)
    return false
  }
}

export async function notifyAdmin(subject: string, html: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || ''
  if (!adminEmail) {
    console.warn('ADMIN_EMAIL not set — skipping admin notification')
    return false
  }
  return sendEmail({ to: adminEmail, subject, html })
}
