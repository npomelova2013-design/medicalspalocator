import twilio from 'twilio'

let _client: ReturnType<typeof twilio> | null = null

function getTwilioClient() {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null
  if (!_client) _client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  return _client
}

export async function sendSMS(to: string, body: string): Promise<boolean> {
  const client = getTwilioClient()
  if (!client) {
    console.warn('Twilio not configured — skipping SMS')
    return false
  }
  const from = process.env.TWILIO_PHONE_NUMBER
  if (!from) {
    console.warn('TWILIO_PHONE_NUMBER not set — skipping SMS')
    return false
  }

  try {
    await client.messages.create({ to, from, body })
    return true
  } catch (err) {
    console.error('SMS send failed:', err instanceof Error ? err.message : err)
    return false
  }
}
