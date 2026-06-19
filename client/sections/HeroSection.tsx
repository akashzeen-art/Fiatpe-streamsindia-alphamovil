// Hero Section — StreamsIndia: Premium cinematic OTT hero
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Film, Star, Users, Zap, ChevronRight } from 'lucide-react';

const ALL_POSTERS = Array.from({ length: 24 }, (_, i) => `/potrait_new_desicontent/${i + 1}.png`);

const ARC_POSTERS = [
  { src: '/potrait_new_desicontent/1.png',  rotate: -28, x: -42, z: 0,  scale: 0.82 },
  { src: '/potrait_new_desicontent/5.png',  rotate: -18, x: -28, z: 20, scale: 0.88 },
  { src: '/potrait_new_desicontent/9.png',  rotate: -8,  x: -14, z: 40, scale: 0.94 },
  { src: '/potrait_new_desicontent/13.png', rotate: 0,   x: 0,   z: 60, scale: 1.05 },
  { src: '/potrait_new_desicontent/17.png', rotate: 8,   x: 14,  z: 40, scale: 0.94 },
  { src: '/potrait_new_desicontent/21.png', rotate: 18,  x: 28,  z: 20, scale: 0.88 },
  { src: '/potrait_new_desicontent/24.png', rotate: 28,  x: 42,  z: 0,  scale: 0.82 },
];

const LEFT_LANE  = ALL_POSTERS.slice(0, 10);
const RIGHT_LANE = ALL_POSTERS.slice(10, 20);
const MARQUEE    = ALL_POSTERS.slice(0, 12);

const GENRES = ['Thriller', 'Crime', 'Drama', 'Action', 'Mystery', 'Suspense'];

const STATS = [
  { icon: Users, value: '500K+', label: 'Viewers' },
  { icon: Film,  value: '200+',  label: 'Titles' },
  { icon: Star,  value: '4.9',   label: 'Rating' },
  { icon: Zap,   value: '24/7',  label: 'Live' },
];

const TITLE = 'StreamsIndia';
const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#';

interface HeroSectionProps { onEnter?: () => void; }

function PosterThumb({ src, className = '' }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 shadow-2xl ${className}`} style={{ aspectRatio: '2/3' }}>
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg sm:rounded-xl" />
    </div>
  );
}

function VerticalLane({ posters, direction, speed = 30 }: { posters: string[]; direction: 'up' | 'down'; speed?: number }) {
  const doubled = [...posters, ...posters];
  return (
    <motion.div
      className="flex flex-col gap-3"
      animate={{ y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {doubled.map((src, i) => (
        <motion.div key={`${src}-${i}`} whileHover={{ scale: 1.06, rotate: direction === 'up' ? 2 : -2 }} className="w-[68px] sm:w-[80px] md:w-[92px]">
          <PosterThumb src={src} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  const [glitching, setGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(TITLE);
  const [genreIdx, setGenreIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 18 });

  const contentX = useTransform(smoothX, [-0.5, 0.5], ['-14px', '14px']);
  const contentY = useTransform(smoothY, [-0.5, 0.5], ['-10px', '10px']);
  const arcRotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const arcRotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setGlitching(true);
      let frame = 0;
      const interval = setInterval(() => {
        if (frame < 5) {
          setGlitchText(TITLE.split('').map(c =>
            Math.random() > 0.55 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : c
          ).join(''));
          frame++;
        } else {
          setGlitchText(TITLE);
          setGlitching(false);
          clearInterval(interval);
        }
      }, 45);
    }, 7000);
    const genreTimer = setInterval(() => setGenreIdx(i => (i + 1) % GENRES.length), 2200);
    return () => { clearInterval(glitchTimer); clearInterval(genreTimer); };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic vignette — keeps video visible, frames center */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_20%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Ambient light sweeps */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none opacity-30"
        animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'linear-gradient(115deg, transparent 40%, rgba(168,85,247,0.15) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Neon horizon line */}
      <div className="absolute bottom-[7vh] left-0 right-0 h-px z-[4] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      <motion.div
        className="absolute bottom-[7vh] left-1/2 -translate-x-1/2 w-32 h-px z-[4]"
        style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #06b6d4, transparent)' }}
        animate={{ width: ['80px', '160px', '80px'], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* ── 3D Poster Arc ── */}
      <motion.div
        className="absolute inset-0 z-[8] pointer-events-none flex items-center justify-center"
        style={{ perspective: 1200, rotateX: arcRotateX, rotateY: arcRotateY }}
      >
        <div className="relative w-full max-w-5xl h-[55vh] flex items-end justify-center pb-[18vh]">
          {ARC_POSTERS.map((p, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 w-[72px] sm:w-[88px] md:w-[100px] hidden md:block"
              style={{
                transform: `translateX(${p.x}vw) translateZ(${p.z}px) rotateY(${p.rotate}deg) scale(${p.scale})`,
                transformStyle: 'preserve-3d',
                zIndex: p.z,
              }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <PosterThumb src={p.src} className="shadow-purple-500/20" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Side poster lanes */}
      <motion.div className="absolute inset-0 z-[9] pointer-events-none hidden sm:block">
        <div className="absolute left-3 md:left-6 top-[14vh] bottom-[20vh] overflow-hidden w-[68px] sm:w-[80px] md:w-[92px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
          <VerticalLane posters={LEFT_LANE} direction="up" speed={28} />
        </div>
        <div className="absolute right-3 md:right-6 top-[14vh] bottom-[20vh] overflow-hidden w-[68px] sm:w-[80px] md:w-[92px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
          <VerticalLane posters={RIGHT_LANE} direction="down" speed={32} />
        </div>
      </motion.div>

      {/* Letterbox cinematic open */}
      <motion.div
        className="absolute top-0 inset-x-0 bg-black z-20 pointer-events-none"
        initial={{ height: '48vh' }} animate={{ height: '6vh' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-black z-20 pointer-events-none"
        initial={{ height: '48vh' }} animate={{ height: '6vh' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      {/* Orbital rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(88vw,680px)] h-[min(88vw,680px)] rounded-full border border-purple-500/15 z-[5] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72vw,520px)] h-[min(72vw,520px)] rounded-full border border-dashed border-pink-500/10 z-[5] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Center stage ── */}
      <motion.div
        className="relative z-30 w-full max-w-2xl mx-auto px-4 sm:px-6"
        style={{ x: contentX, y: contentY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glass stage panel */}
        <div className="relative rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl px-6 sm:px-10 py-8 sm:py-10 shadow-[0_0_80px_rgba(124,58,237,0.2)]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

          <div className="relative text-center">
            {/* Logo + live */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-5"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.img
                // src="/logo.png" alt="StreamsIndia"
                className="h-8 sm:h-10 w-auto object-contain"
                animate={{ filter: ['drop-shadow(0 0 8px rgba(168,85,247,0.4))', 'drop-shadow(0 0 16px rgba(236,72,153,0.6))', 'drop-shadow(0 0 8px rgba(168,85,247,0.4))'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/40 bg-red-500/15 text-[8px] sm:text-[9px] font-orbitron uppercase tracking-[0.3em] text-red-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live
              </span>
            </motion.div>

            {/* Title */}
            <div className="relative mb-3 select-none">
              <motion.h1
                className="font-bebas font-black leading-[0.9] relative"
                style={{ fontSize: 'clamp(3.8rem, 16vw, 7.5rem)', letterSpacing: '-0.01em' }}
              >
                <AnimatePresence>
                  {glitching && (
                    <>
                      <motion.span className="absolute inset-0 gradient-text-hero" style={{ clipPath: 'inset(15% 0 35% 0)', transform: 'translateX(-4px)', color: '#22d3ee' }}
                        initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}>{glitchText}</motion.span>
                      <motion.span className="absolute inset-0 gradient-text-hero" style={{ clipPath: 'inset(55% 0 5% 0)', transform: 'translateX(4px)', color: '#f472b6' }}
                        initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}>{glitchText}</motion.span>
                    </>
                  )}
                </AnimatePresence>
                <span className="gradient-text-hero">
                  {glitching ? glitchText : TITLE}
                </span>
              </motion.h1>
              <motion.div
                className="h-0.5 mx-auto mt-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
                initial={{ width: 0 }} animate={{ width: '60%' }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </div>

            {/* Rotating genre */}
            <div className="h-6 mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={genreIdx}
                  className="text-[10px] sm:text-xs font-orbitron uppercase tracking-[0.5em] text-purple-300"
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {GENRES[genreIdx]} · Originals
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              className="text-gray-200/90 text-sm sm:text-base mb-7 max-w-sm mx-auto leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            >
              India's thriller, crime & drama —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 font-medium">
                unlimited streaming
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
            >
              <motion.button
                onClick={onEnter}
                className="relative group w-full sm:w-auto overflow-hidden"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-80 blur-md group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_100%] animate-gradient-x text-white font-orbitron font-bold uppercase text-xs sm:text-sm rounded-2xl min-h-[48px] border border-white/20">
                  <Play size={16} className="fill-white" />
                  Start Watching
                  <ChevronRight size={14} className="opacity-70" />
                </span>
              </motion.button>
              <motion.button
                onClick={onEnter}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl min-h-[48px] border border-white/20 text-white/90 font-orbitron font-bold uppercase text-[10px] sm:text-xs tracking-widest bg-white/5 hover:bg-white/10 hover:border-purple-400/40 transition-all"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <Film size={14} />
                Explore Titles
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-5 grid grid-cols-4 gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center py-2.5 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.08 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(168,85,247,0.4)' }}
            >
              <div className="flex items-center gap-1">
                <stat.icon size={9} className="text-purple-400" />
                <span className="font-bebas text-lg sm:text-xl text-white leading-none">{stat.value}</span>
              </div>
              <span className="text-[7px] sm:text-[8px] font-orbitron uppercase tracking-widest text-gray-500 mt-0.5">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom poster reel */}
      <div className="absolute bottom-[7.5vh] inset-x-0 z-[12] overflow-hidden hidden sm:block pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        <motion.div
          className="flex gap-4 w-max px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE, ...MARQUEE].map((src, i) => (
            <div key={i} className="w-14 h-20 md:w-16 md:h-24 flex-shrink-0 opacity-60">
              <PosterThumb src={src} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      {/* <motion.div
        className="absolute bottom-[1.5vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[7px] font-orbitron uppercase tracking-[0.45em] text-white/30">Scroll to explore</span>
        <div className="w-4 h-6 rounded-full border border-white/15 p-0.5">
          <motion.div
            className="w-full h-1.5 rounded-full bg-gradient-to-b from-purple-400 to-pink-400 mx-auto"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
      </motion.div> */}
    </div>
  );
}
