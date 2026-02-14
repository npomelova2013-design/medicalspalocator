function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAFAFA;">
  <div style="background: white; border-radius: 16px; overflow: hidden; border: 1px solid #eee;">
    <div style="text-align: center; padding: 24px 20px; background: linear-gradient(135deg, #833AB4, #E1306C); ">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">Medical Spa Locator</h1>
    </div>
    <div style="padding: 32px 24px;">
      ${content}
    </div>
    <div style="border-top: 1px solid #eee; padding: 16px 24px; text-align: center;">
      <p style="color: #999; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Medical Spa Locator. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
}

function stepsBox(steps: string[]): string {
  return `<div style="background: #F0E6F6; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="color: #833AB4; font-weight: 600; margin: 0 0 12px 0; font-size: 14px;">What happens next?</p>
    ${steps.map((step, i) => `<p style="color: #555; margin: 8px 0 0 0; font-size: 14px; line-height: 1.5;"><strong style="color: #833AB4;">Step ${i + 1}:</strong> ${step}</p>`).join('')}
  </div>`
}

export function getLeadConfirmationHtml(firstName: string): string {
  return emailWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Thanks for your request, ${firstName}!</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      We've received your consultation request and a local med spa specialist will be in touch shortly.
    </p>
    ${stepsBox([
      'We review your preferences and treatment interests.',
      'A specialist contacts you to discuss your goals.',
      'Get matched with a top-rated med spa near you.',
    ])}
    <p style="color: #999; font-size: 13px; line-height: 1.5;">
      If you have any questions in the meantime, simply reply to this email.
    </p>
  `)
}

export function getClaimConfirmationHtml(name: string, businessName: string): string {
  return emailWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Claim request received!</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Hi ${name}, we've received your request to claim <strong>${businessName}</strong> on Medical Spa Locator.
    </p>
    ${stepsBox([
      'We verify your ownership details and business information.',
      'Our team reaches out to confirm your identity.',
      'You gain full control of your listing — update info, add photos, and receive leads.',
    ])}
    <p style="color: #999; font-size: 13px; line-height: 1.5;">
      This typically takes <strong>24 hours</strong>. We'll email you once your listing is activated.
    </p>
  `)
}

export function getListingConfirmationHtml(ownerName: string, businessName: string): string {
  return emailWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Listing request received!</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Hi ${ownerName}, thanks for submitting <strong>${businessName}</strong> to Medical Spa Locator.
    </p>
    ${stepsBox([
      'We review your business information and services.',
      'Our team reaches out to gather additional details if needed.',
      'Your med spa goes live on our directory and starts receiving patient inquiries.',
    ])}
    <p style="color: #999; font-size: 13px; line-height: 1.5;">
      This typically takes <strong>48 hours</strong>. We'll email you once your listing is live.
    </p>
  `)
}

export function getUpgradeConfirmationHtml(name: string, plan: string): string {
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1)
  return emailWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Welcome to ${planLabel}, ${name}!</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Your subscription is now active. Your listing has been upgraded and you'll start seeing results immediately.
    </p>
    ${stepsBox([
      'Your listing is now boosted with priority placement in search results.',
      'Complete your profile — add photos, a video, and your special offers.',
      'Start receiving patient inquiries directly through your listing.',
    ])}
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://medicalspalocator.com/admin" style="display: inline-block; background: linear-gradient(135deg, #833AB4, #E1306C); color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Manage Your Listing
      </a>
    </div>
    <p style="color: #999; font-size: 13px; line-height: 1.5;">
      Need help getting started? Just reply to this email and we'll assist you.
    </p>
  `)
}

interface AdminNotificationData {
  name: string | null
  email: string | null
  phone: string | null
  source: string
  serviceInterest: string | null
  city?: string | null
  notes?: string | null
}

export function getAdminNotificationHtml(data: AdminNotificationData): string {
  const rows = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Source', value: data.source },
    { label: 'Service Interest', value: data.serviceInterest },
    { label: 'City', value: data.city },
    { label: 'Notes', value: data.notes },
  ].filter(r => r.value)

  const tableRows = rows.map(r =>
    `<tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #999; font-size: 13px; font-weight: 600; white-space: nowrap; vertical-align: top;">${r.label}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #333; font-size: 14px;">${r.value}</td>
    </tr>`
  ).join('')

  return emailWrapper(`
    <h2 style="color: #262626; margin: 0 0 8px 0; font-size: 20px;">New Lead Received</h2>
    <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">
      A new <strong style="color: #E1306C;">${data.source.replace(/_/g, ' ')}</strong> submission just came in.
    </p>
    <table style="width: 100%; border-collapse: collapse; background: #FAFAFA; border-radius: 8px; overflow: hidden;">
      ${tableRows}
    </table>
    <div style="margin-top: 24px; text-align: center;">
      <a href="https://web-five-navy-28.vercel.app/admin/leads" style="display: inline-block; background: linear-gradient(135deg, #833AB4, #E1306C); color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
        View in Dashboard
      </a>
    </div>
  `)
}
