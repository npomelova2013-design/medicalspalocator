'use client'

import { Phone } from 'lucide-react'
import { formatPhone, formatPhoneHref } from '@/lib/utils/formatting'
import { trackEvent } from '@/lib/queries/analytics'

interface ClickToCallProps {
  phone: string | null
  medSpaId?: string
  className?: string
  showIcon?: boolean
  variant?: 'link' | 'button'
}

export function ClickToCall({ phone, medSpaId, className = '', showIcon = true, variant = 'link' }: ClickToCallProps) {
  if (!phone) return null

  const handleClick = () => {
    if (medSpaId) {
      trackEvent({
        event_type: 'phone_click',
        med_spa_id: medSpaId,
        page_path: window.location.pathname,
      })
    }
  }

  if (variant === 'button') {
    return (
      <a
        href={formatPhoneHref(phone)}
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B76E79] text-white rounded-full hover:from-[#B76E79] hover:to-[#D4AF37] transition-all font-medium shadow-md shadow-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/30 ${className}`}
      >
        <Phone className="w-4 h-4" />
        {formatPhone(phone)}
      </a>
    )
  }

  return (
    <a
      href={formatPhoneHref(phone)}
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-[#B76E79] hover:text-[#D4AF37] font-medium transition ${className}`}
    >
      {showIcon && <Phone className="w-4 h-4" />}
      {formatPhone(phone)}
    </a>
  )
}
