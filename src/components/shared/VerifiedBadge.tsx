import { CheckCircle2 } from 'lucide-react'

export function VerifiedBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[#833AB4] ${className}`}>
      <CheckCircle2 className="w-4 h-4 fill-[#833AB4] text-white" />
      <span className="text-xs font-medium">Verified</span>
    </span>
  )
}
