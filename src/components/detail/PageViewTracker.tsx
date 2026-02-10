'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/queries/analytics'

export function PageViewTracker({ medSpaId }: { medSpaId: string }) {
  useEffect(() => {
    trackEvent({
      event_type: 'page_view',
      med_spa_id: medSpaId,
      page_path: window.location.pathname,
      referrer: document.referrer || undefined,
    })
  }, [medSpaId])

  return null
}
