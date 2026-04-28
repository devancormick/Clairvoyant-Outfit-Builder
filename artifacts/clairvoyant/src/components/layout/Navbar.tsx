import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: '/builder',   label: 'Builder' },
  { href: '/shop',      label: 'Shop' },
  { href: '/occasions', label: 'Occasions' },
  { href: '/lookbook',  label: 'Lookbook' },
  { href: '/about',     label: 'About' },
];

export function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 mix-blend-difference text-ivory pointer-events-none">
        <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 pointer-events-auto">
          <Link href="/" className="text-2xl font-serif tracking-wide uppercase hover:opacity-70 transition-opacity">
            Clairvoyant
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-[0.15em]">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:opacity-70 transition-opacity ${location === link.href ? 'border-b border-ivory pb-1' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 pointer-events-auto"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-ivory transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-ivory transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-ivory transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/80 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-ivory z-50 flex flex-col pt-24 pb-10 px-10 md:hidden"
            >
              <button
                className="absolute top-6 right-6 text-smoke/40 hover:text-charcoal text-xl"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
              <nav className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-serif text-2xl text-charcoal hover:text-rouge transition-colors ${location === link.href ? 'text-rouge' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <p className="text-[10px] uppercase tracking-[0.15em] text-smoke/30">Clairvoyant Atelier</p>
                <p className="text-[10px] text-smoke/20 mt-1">Los Angeles, CA</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
