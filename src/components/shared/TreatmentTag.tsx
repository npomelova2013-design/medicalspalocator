interface TreatmentTagProps {
  treatment: string
  clickable?: boolean
  onClick?: () => void
}

export function TreatmentTag({ treatment, clickable = false, onClick }: TreatmentTagProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-teal-50/80 text-teal-700 border border-teal-100 ${clickable ? 'cursor-pointer hover:bg-teal-100 hover:border-teal-200 transition' : ''}`}
      onClick={clickable ? onClick : undefined}
    >
      {treatment}
    </span>
  )
}
