import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LINKS = [
  { label: 'Home', path: '/', color: 'hover:text-purple-400 hover:border-purple-500/40' },
  { label: 'My Account', path: '/account', color: 'hover:text-pink-400 hover:border-pink-500/40' },
  { label: 'About Us', path: '/about', color: 'hover:text-cyan-400 hover:border-cyan-500/40' },
  { label: 'Contact Us', path: '/contact', color: 'hover:text-amber-400 hover:border-amber-500/40' },
];

export function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed top-0 left-0 right-0 z-[100] w-full flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10"
        style={{
          background: 'linear-gradient(180deg, rgba(5,2,8,0.95) 0%, rgba(5,2,8,0.75) 100%)',
          backdropFilter: 'blur(16px)',
        }}
        aria-label="Open menu"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

        <motion.img
          src="/logo.png"
          alt="StreamsIndia"
          className="h-9 sm:h-11 w-auto object-contain"
          whileHover={{ scale: 1.05 }}
        />

        <motion.div
          className="w-9 h-9 flex items-center justify-center rounded-full text-white border border-purple-500/30"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))' }}
          whileHover={{ scale: 1.1, borderColor: 'rgba(236,72,153,0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={18} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] backdrop-blur-md"
              style={{ background: 'rgba(5, 2, 8, 0.85)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-72 z-[101] flex flex-col px-8 py-10 border-l border-purple-500/20"
              style={{
                background: 'linear-gradient(180deg, rgba(15,5,30,0.98) 0%, rgba(5,2,8,0.98) 100%)',
              }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Drawer glow accent */}
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 opacity-60" />

              <button
                onClick={() => setOpen(false)}
                className="self-end mb-6 text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

              <nav className="flex flex-col gap-1">
                {LINKS.map((link, i) => (
                  <motion.button
                    key={link.path}
                    onClick={() => go(link.path)}
                    className={`text-left py-3 text-gray-300 font-orbitron text-sm uppercase tracking-widest border-b border-white/5 transition-colors ${link.color}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <div className="h-px bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-transparent" />
                <p className="text-[10px] text-gray-600 font-orbitron tracking-widest">
                  © 2026 Alphamovil Digital Solutions LLP
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
