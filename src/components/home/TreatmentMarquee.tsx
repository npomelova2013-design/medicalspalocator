const TREATMENTS = [
  'Botox', 'Fillers', 'Laser Hair Removal', 'Facials', 'Chemical Peels',
  'Body Contouring', 'Microneedling', 'CoolSculpting', 'PRP Therapy', 'HydraFacial',
  'Lip Augmentation', 'Skin Tightening', 'IV Therapy', 'Dermaplaning',
]

export function TreatmentMarquee() {
  // Duplicate to create seamless loop
  const items = [...TREATMENTS, ...TREATMENTS]

  return (
    <section className="relative bg-[#5C1A33] py-8 overflow-hidden" aria-label="Treatments">
      <div className="marquee-track whitespace-nowrap">
        {items.map((treatment, i) => (
          <span key={`${treatment}-${i}`} className="inline-flex items-center">
            <span className="font-serif italic text-2xl md:text-4xl text-[#D4AF37]/30 font-semibold tracking-editorial px-6 md:px-10">
              {treatment}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]/20 flex-shrink-0" />
          </span>
        ))}
      </div>
    </section>
  )
}
