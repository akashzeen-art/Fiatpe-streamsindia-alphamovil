import { motion } from 'framer-motion';

const ORBS = [
  { color: 'rgba(124, 58, 237, 0.35)', size: 500, x: '10%', y: '15%', delay: 0 },
  { color: 'rgba(236, 72, 153, 0.3)', size: 400, x: '75%', y: '25%', delay: 2 },
  { color: 'rgba(6, 182, 212, 0.25)', size: 450, x: '50%', y: '60%', delay: 4 },
  { color: 'rgba(245, 158, 11, 0.2)', size: 350, x: '20%', y: '70%', delay: 1 },
  { color: 'rgba(16, 185, 129, 0.2)', size: 300, x: '85%', y: '75%', delay: 3 },
];

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: `${(i * 37 + 13) % 100}%`,
  y: `${(i * 53 + 7) % 100}%`,
  size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
  delay: (i * 0.3) % 5,
  duration: 2 + (i % 4),
}));

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(88, 28, 135, 0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(219, 39, 119, 0.15) 0%, transparent 50%), #050208',
        }}
      />

      {/* Floating color orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -50, 30, -20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Twinkling particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background:
              p.id % 4 === 0
                ? '#c084fc'
                : p.id % 4 === 1
                  ? '#f472b6'
                  : p.id % 4 === 2
                    ? '#22d3ee'
                    : '#fbbf24',
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
