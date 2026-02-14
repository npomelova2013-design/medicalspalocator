// ─── Email outreach templates ────────────────────────────────────

function outreachWrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAFAFA;">
  <div style="background: white; border-radius: 16px; overflow: hidden; border: 1px solid #eee;">
    <div style="text-align: center; padding: 24px 20px; background: linear-gradient(135deg, #833AB4, #E1306C);">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">Medical Spa Locator</h1>
    </div>
    <div style="padding: 32px 24px;">
      ${content}
    </div>
    <div style="border-top: 1px solid #eee; padding: 16px 24px; text-align: center;">
      <p style="color: #999; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Medical Spa Locator</p>
      <p style="color: #bbb; font-size: 11px; margin: 4px 0 0 0;">You received this because your business is listed on our directory.</p>
    </div>
  </div>
</body>
</html>`
}

export function getOutreachEmail1Html(businessName: string, city: string, profileViews: number): string {
  return outreachWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Hi ${businessName} Team,</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Did you know that <strong>${businessName}</strong> has been viewed <strong style="color: #E1306C;">${profileViews} times</strong> on Medical Spa Locator?
    </p>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Patients in <strong>${city}</strong> are actively searching for med spas like yours. Right now, your listing is a basic profile — but with a <strong>Premium upgrade</strong>, you could be capturing these leads directly.
    </p>
    <div style="background: linear-gradient(135deg, #F0E6F6, #FFF0F5); border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="color: #833AB4; font-weight: 600; margin: 0 0 12px 0; font-size: 14px;">With Premium, you get:</p>
      <p style="color: #555; margin: 4px 0; font-size: 14px;">✨ Priority placement in search results</p>
      <p style="color: #555; margin: 4px 0; font-size: 14px;">📸 Photo gallery & video showcase</p>
      <p style="color: #555; margin: 4px 0; font-size: 14px;">⭐ Verified badge to build patient trust</p>
      <p style="color: #555; margin: 4px 0; font-size: 14px;">📊 Analytics dashboard with lead tracking</p>
      <p style="color: #555; margin: 4px 0; font-size: 14px;">📞 Click-to-call tracking & lead forms</p>
    </div>
    <div style="text-align: center; margin: 28px 0 16px;">
      <a href="https://medicalspalocator.com/pricing" style="display: inline-block; background: linear-gradient(135deg, #833AB4, #E1306C); color: white; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: 600; font-size: 15px;">
        See Premium Plans →
      </a>
    </div>
    <p style="color: #999; font-size: 13px; text-align: center;">Plans start at just $97/month</p>
  `)
}

export function getOutreachEmail2Html(businessName: string): string {
  return outreachWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Quick follow-up, ${businessName}</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      I reached out last week about your listing on Medical Spa Locator. Just wanted to share a few results other med spas have seen after upgrading:
    </p>
    <div style="background: #FAFAFA; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <p style="color: #333; margin: 8px 0; font-size: 14px; line-height: 1.5;"><strong style="color: #E1306C;">3x more profile views</strong> with priority search placement</p>
      <p style="color: #333; margin: 8px 0; font-size: 14px; line-height: 1.5;"><strong style="color: #E1306C;">40% more calls</strong> from click-to-call buttons</p>
      <p style="color: #333; margin: 8px 0; font-size: 14px; line-height: 1.5;"><strong style="color: #E1306C;">Higher trust signals</strong> with verified badge and reviews</p>
    </div>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Would you like to schedule a quick 10-minute call to see how Premium could work for ${businessName}? Just reply to this email with a time that works.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://medicalspalocator.com/pricing" style="display: inline-block; background: linear-gradient(135deg, #833AB4, #E1306C); color: white; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: 600; font-size: 15px;">
        View Plans & Pricing →
      </a>
    </div>
  `)
}

export function getOutreachEmail3Html(businessName: string): string {
  return outreachWrapper(`
    <h2 style="color: #262626; margin: 0 0 12px 0; font-size: 22px;">Last chance for the launch offer</h2>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      Hi ${businessName} team, this is my last note about upgrading your listing. We're offering our <strong>launch pricing</strong> to early adopters — but it won't last forever.
    </p>
    <div style="background: linear-gradient(135deg, #833AB4, #E1306C); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
      <p style="color: white; font-size: 18px; font-weight: 700; margin: 0;">Lock in at $97/mo</p>
      <p style="color: white/80; font-size: 13px; margin: 4px 0 0 0; opacity: 0.8;">Before prices increase</p>
    </div>
    <p style="color: #666; line-height: 1.6; font-size: 15px;">
      No contracts, cancel anytime. Upgrade today and start getting more patients from your listing.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://medicalspalocator.com/pricing" style="display: inline-block; background: linear-gradient(135deg, #833AB4, #E1306C); color: white; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: 600; font-size: 15px;">
        Upgrade Now →
      </a>
    </div>
  `)
}

// ─── SMS outreach templates ────────────────────────────────────

export function getOutreachSMS1(businessName: string, views: number): string {
  return `Hi ${businessName}! Your listing on MedSpaLocator.com has ${views}+ views. Upgrade to Premium for priority placement & lead capture starting at $97/mo. Details: medicalspalocator.com/pricing`
}

export function getOutreachSMS2(businessName: string): string {
  return `Hi ${businessName}, following up on your MedSpaLocator listing. Premium members see 3x more patient inquiries. Lock in launch pricing before it increases: medicalspalocator.com/pricing`
}
