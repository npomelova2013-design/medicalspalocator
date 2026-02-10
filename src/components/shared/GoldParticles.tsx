'use client'

export function GoldParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 12,
    opacity: 0.15 + Math.random() * 0.35,
    drift: -15 + Math.random() * 30,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            left: p.left,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            opacity: 0,
            animation: `goldFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
