interface TreatmentTagProps {
  treatment: string
  clickable?: boolean
  onClick?: () => void
}

function cleanDisplayText(text: string): string {
  return text
    .replace(/[\u2022\u2023\u25E6\u2043\u2219]/g, '') // Remove bullet chars
    .replace(/\\u[\dA-Fa-f]{4}/g, '')                  // Remove escaped unicode
    .replace(/^\s*[-•·]\s*/, '')                        // Remove leading bullets
    .replace(/^["'{[\]}"']+|["'{[\]}"']+$/g, '')        // Remove stray JSON chars
    .trim()
}

export function TreatmentTag({ treatment, clickable = false, onClick }: TreatmentTagProps) {
  const displayText = cleanDisplayText(treatment)

  // Don't render if cleaned text is empty or looks like JSON
  if (!displayText || displayText.startsWith('{') || displayText.startsWith('[') || displayText.includes('"name"') || displayText.includes('"category"')) {
    return null
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#F5E6E0]/80 text-[#B76E79] border border-[#D4AF37]/20 ${clickable ? 'cursor-pointer hover:bg-[#F5E6E0] hover:border-[#D4AF37]/40 transition' : ''}`}
      onClick={clickable ? onClick : undefined}
    >
      {displayText}
    </span>
  )
}
