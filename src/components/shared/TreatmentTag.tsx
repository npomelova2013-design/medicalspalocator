interface TreatmentTagProps {
  treatment: string
  clickable?: boolean
  onClick?: () => void
}

export function TreatmentTag({ treatment, clickable = false, onClick }: TreatmentTagProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#F5E6E0]/80 text-[#B76E79] border border-[#D4AF37]/20 ${clickable ? 'cursor-pointer hover:bg-[#F5E6E0] hover:border-[#D4AF37]/40 transition' : ''}`}
      onClick={clickable ? onClick : undefined}
    >
      {treatment}
    </span>
  )
}
