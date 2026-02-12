/**
 * Clean a treatment name string by removing unicode bullets, escaped unicode, and extra whitespace
 */
function cleanTreatmentName(name: string): string {
  return name
    .replace(/[\u2022\u2023\u25E6\u2043\u2219\u2013\u2014\u2019]/g, '') // Remove bullet chars, dashes, smart quotes
    .replace(/\\u[\dA-Fa-f]{4}/g, '')  // Remove escaped unicode like \u2022
    .replace(/^\s*[-•·]\s*/, '')        // Remove leading bullet/dash
    .trim()
}

/** Known category prefixes that get concatenated with treatment names during scraping */
const CATEGORY_PREFIXES = /^(BODY|FACE|SKIN|LASER|INJECTABLE|WELLNESS|AESTHETIC)(?=[A-Z])/

export function parseTreatments(treatments: string | null): string[] {
  if (!treatments) return []

  const trimmed = treatments.trim()
  if (trimmed.length === 0) return []

  // Detect JSON array format: [{"name": "...", ...}, ...]
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) {
        return parsed
          .map((item: unknown) => {
            if (typeof item === 'string') return cleanTreatmentName(item)
            if (typeof item === 'object' && item !== null) {
              const obj = item as Record<string, unknown>
              // Extract 'name' field from objects like {"name":"Anti-Aging Facial","category":"Facial","description":""}
              if (typeof obj.name === 'string') return cleanTreatmentName(obj.name)
              // Fallback: try 'treatment' or 'title' fields
              if (typeof obj.treatment === 'string') return cleanTreatmentName(obj.treatment)
              if (typeof obj.title === 'string') return cleanTreatmentName(obj.title)
            }
            return null
          })
          .filter((t): t is string => t !== null && t.length > 0 && t.length < 200)
      }
    } catch {
      // JSON parse failed, fall through to other parsers
    }
  }

  // Detect single JSON object format: {"name": "...", ...}
  if (trimmed.startsWith('{')) {
    try {
      const obj = JSON.parse(trimmed) as Record<string, unknown>
      if (typeof obj.name === 'string') {
        const cleaned = cleanTreatmentName(obj.name)
        return cleaned.length > 0 ? [cleaned] : []
      }
    } catch {
      // Fall through
    }
  }

  // Pipe-separated values (e.g. "Botox|Fillers|Laser")
  if (trimmed.includes('|')) {
    return trimmed
      .split('|')
      .map(t => cleanTreatmentName(t))
      .filter(t => t.length > 0 && t.length < 100)
  }

  // Newline-separated values
  if (trimmed.includes('\n')) {
    return trimmed
      .split('\n')
      .map(t => cleanTreatmentName(t))
      .filter(t => t.length > 0 && t.length < 100)
  }

  // CamelCase-concatenated values (e.g. "BODYCoolsculptingCooltoneLaser Hair Removal")
  // Detect transitions from lowercase to uppercase that suggest word boundaries
  if (/[a-z][A-Z]/.test(trimmed) && !trimmed.includes(',')) {
    let processed = trimmed
      // Strip known category prefixes like "BODY", "FACE" etc.
      .replace(CATEGORY_PREFIXES, '')
    // Split on lowercase→uppercase transitions
    processed = processed
      .replace(/([a-z])([A-Z])/g, '$1, $2')
      // Also split on sequences like "ABCDef" → "ABC, Def"
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1, $2')
    return processed
      .split(',')
      .map(t => cleanTreatmentName(t))
      .filter(t => t.length > 0 && t.length < 100)
  }

  // Standard comma-separated text handling
  return trimmed
    .split(',')
    .map(t => cleanTreatmentName(t))
    .filter(t => t.length > 0 && t.length < 100)
}

export function getTopTreatments(
  treatments: string | null,
  n: number = 3
): string[] {
  return parseTreatments(treatments).slice(0, n)
}

export const TREATMENT_CATEGORIES = [
  'Botox',
  'Fillers',
  'Laser Hair Removal',
  'Laser Treatments',
  'Facials',
  'Chemical Peels',
  'Body Contouring',
  'Microneedling',
  'Skin Care',
  'PRP',
  'IV Therapy',
  'Coolsculpting',
] as const

export const SERVICE_OPTIONS = [
  'Botox / Injectables',
  'Dermal Fillers',
  'Laser Hair Removal',
  'Laser Skin Treatments',
  'Facials / Skin Care',
  'Chemical Peels',
  'Body Contouring',
  'Microneedling',
  'PRP / Platelet Therapy',
  'Other',
] as const
