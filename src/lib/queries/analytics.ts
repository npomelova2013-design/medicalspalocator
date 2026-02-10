import type { AnalyticsEvent } from '@/types/database'

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
  } catch {
    // Silently fail - analytics should never block UX
  }
}
