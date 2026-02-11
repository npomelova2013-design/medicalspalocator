import { Crown } from 'lucide-react'

interface PremiumBadgeProps {
  tier: string
  size?: 'sm' | 'md'
}

export function PremiumBadge({ tier, size = 'md' }: PremiumBadgeProps) {
  if (tier === 'free') return null

  const config: Record<string, { label: string; className: string }> = {
    premium: { label: 'Featured', className: 'bg-gradient-to-r from-[#833AB4]/15 to-[#833AB4]/5 text-[#833AB4] border-[#833AB4]/30' },
    enterprise: { label: 'Enterprise', className: 'bg-gradient-to-r from-[#E1306C]/15 to-[#1a1a2e]/10 text-[#E1306C] border-[#E1306C]/30' },
    claimed: { label: 'Claimed', className: 'bg-gradient-to-r from-[#F0E6F6] to-[#F0E6F6]/50 text-[#E1306C] border-[#E1306C]/20' },
  }

  const { label, className } = config[tier] || config.claimed

  return (
    <span className={`inline-flex items-center border rounded-full ${className} ${size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'} font-medium`}>
      {tier === 'premium' || tier === 'enterprise' ? <Crown className="w-3 h-3 mr-1" /> : null}
      {label}
    </span>
  )
}
