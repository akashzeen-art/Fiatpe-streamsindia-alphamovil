// FooterSection — StreamsIndia vibrant animated footer
import { motion } from 'framer-motion';
import { SectionVideoBg } from '@/components/SectionVideoBg';

export function FooterSection() {
  return (
    <footer className="relative w-full overflow-hidden">
      <SectionVideoBg />

      {/* Cinematic banner strip */}
      <div className="relative h-36 sm:h-48 md:h-64 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-pink-900/20" />

        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full blur-3xl"
          style={{ background: 'rgba(124,58,237,0.3)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full blur-3xl"
          style={{ background: 'rgba(236,72,153,0.25)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Brand over banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.img
            src="/logo.png"
            alt="StreamsIndia"
            className="h-20 sm:h-28 md:h-36 w-auto object-contain select-none"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          />
          <motion.p
            className="text-xs sm:text-sm font-orbitron uppercase tracking-[0.3em] mt-3 gradient-text"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }} viewport={{ once: true }}
          >
            Thriller · Crime · Drama
          </motion.p>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-purple-500/20 relative z-10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <motion.div
            className="flex flex-col items-center text-center space-y-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm sm:text-base max-w-xs leading-relaxed">
              Your gateway to premium thriller, crime & drama content
            </p>

            <div className="accent-bar w-24" />

            <div className="border-t border-white/10 pt-6 w-full space-y-3">
              <p className="text-gray-500 text-xs sm:text-sm font-orbitron">
                Copyright © 2026, Alphamovil Digital Solutions LLP All Rights Reserved
              </p>

              <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
                {[
                  { href: '/terms', label: 'Terms of Services' },
                  { href: '/refund', label: 'Refund Policy' },
                  { href: '/privacy', label: 'Privacy Policy' },
                ].map((link) => (
                  <span key={link.href} className="flex items-center gap-2 sm:gap-3">
                    <a href={link.href}
                      className="text-gray-500 hover:text-purple-400 transition-colors font-orbitron uppercase tracking-widest text-[10px] sm:text-xs">
                      {link.label}
                    </a>
                    {link.href !== '/privacy' && <span className="text-gray-700">|</span>}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-[10px] text-gray-600 font-orbitron tracking-widest">
                  All systems operational
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
