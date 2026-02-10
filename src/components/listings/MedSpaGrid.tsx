import { MedSpaCard } from './MedSpaCard'
import { PremiumMedSpaCard } from './PremiumMedSpaCard'
import type { MedSpaCard as MedSpaCardType } from '@/types/database'

interface Props {
  spas: MedSpaCardType[]
  emptyMessage?: string
}

export function MedSpaGrid({ spas, emptyMessage = 'No med spas found.' }: Props) {
  if (spas.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  const premiumSpas = spas.filter(s => s.listing_tier === 'premium' || s.listing_tier === 'enterprise')
  const standardSpas = spas.filter(s => s.listing_tier !== 'premium' && s.listing_tier !== 'enterprise')

  return (
    <div className="space-y-8">
      {/* Premium listings */}
      {premiumSpas.length > 0 && (
        <div>
          <div className="grid gap-6">
            {premiumSpas.map((spa) => (
              <PremiumMedSpaCard key={spa.id} spa={spa} />
            ))}
          </div>
        </div>
      )}

      {/* Standard listings */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {standardSpas.map((spa) => (
          <MedSpaCard key={spa.id} spa={spa} />
        ))}
      </div>
    </div>
  )
}
