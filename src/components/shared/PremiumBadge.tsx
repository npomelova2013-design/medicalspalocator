import { Crown } from 'lucide-react'

interface PremiumBadgeProps {
  tier: string
  size?: 'sm' | 'md'
}

export function PremiumBadge({ tier, size = 'md' }: PremiumBadgeProps) {
  if (tier === 'free') return null

  const config: Record<string, { label: string; className: string }> = {
    premium: { label: 'Featured', className: 'bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 text-[#D4AF37] border-[#D4AF37]/30' },
    enterprise: { label: 'Enterprise', className: 'bg-gradient-to-r from-[#B76E79]/15 to-[#5C1A33]/10 text-[#B76E79] border-[#B76E79]/30' },
    claimed: { label: 'Claimed', className: 'bg-gradient-to-r from-[#F5E6E0] to-[#F5E6E0]/50 text-[#B76E79] border-[#B76E79]/20' },
  }

  const { label, className } = config[tier] || config.claimed

  return (
    <span className={`inline-flex items-center border rounded-full ${className} ${size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'} font-medium`}>
      {tier === 'premium' || tier === 'enterprise' ? <Crown className="w-3 h-3 mr-1" /> : null}
      {label}
    </span>
  )
}
