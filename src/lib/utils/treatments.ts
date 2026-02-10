export function parseTreatments(treatments: string | null): string[] {
  if (!treatments) return []
  // Handle comma-separated text
  return treatments
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0 && t.length < 100) // Filter out garbage
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
