'use client'

const PARTICLE_COLORS = ['#833AB4', '#C13584', '#E1306C', '#F77737', '#FCAF45']

export function InstaParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 12,
    opacity: 0.15 + Math.random() * 0.35,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0,
            animation: `instaFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
