import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { useOutfitStore } from "@/stores/outfit";
import { prebuiltLooks } from "@/data/looks";

function ParallaxImage({ src, alt, offset = 50, className = "" }: { src: string; alt: string; offset?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
}

function OccasionBadge({ label }: { label: string }) {
  return (
    <span
      className="text-[9px] uppercase tracking-[0.15em] px-2 py-1 inline-block mb-4"
      style={{ backgroundColor: 'rgba(200,169,154,0.2)', color: '#C8A99A', border: '1px solid rgba(200,169,154,0.3)' }}
    >
      {label}
    </span>
  );
}

export default function Lookbook() {
  const { loadLook } = useOutfitStore();
  const [, setLocation] = useLocation();

  const handleOpenLook = (lookId: string) => {
    const look = prebuiltLooks.find(l => l.id === lookId);
    if (look) {
      loadLook(look.garmentIds);
      setLocation('/builder');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#1A0A0D] text-ivory pt-32 pb-32"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header className="mb-32 text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-petal uppercase tracking-[0.2em] text-xs mb-4 block"
          >
            SS26 Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl mb-8 leading-tight"
          >
            What you wear becomes part of what you remember.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-sm opacity-60 leading-relaxed font-light"
          >
            A study in shadow, structure, and silk. Photographed in Los Angeles by Julien R.
          </motion.p>
        </header>

        <div className="flex flex-col gap-32 md:gap-48">
          {/* Look 1 — The Amarante */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <ParallaxImage src="/assets/editorial/lookbook1.png" alt="The Amarante" className="aspect-[4/5] bg-charcoal" />
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
              <OccasionBadge label="Formal" />
              <h2 className="font-serif text-3xl">The Architecture of Silence</h2>
              <p className="text-sm opacity-60 leading-relaxed">
                Sculpted tailoring that demands space. The charcoal blazer holds its shape, an armor of wool and intention.
              </p>
              <button
                onClick={() => handleOpenLook('look_amarante')}
                className="text-xs uppercase tracking-[0.15em] text-petal hover:text-rouge transition-colors self-start mt-2"
              >
                Shop this look →
              </button>
            </div>
          </div>

          {/* Centered quote */}
          <div className="w-full text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="font-serif text-2xl md:text-4xl italic text-petal"
            >
              "A dialogue between restraint and exposure."
            </motion.span>
          </div>

          {/* Look 2 — The Seraphine */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 md:col-start-2 order-2 md:order-1 flex flex-col gap-5">
              <OccasionBadge label="Evening" />
              <h2 className="font-serif text-3xl">Fluid Dominance</h2>
              <p className="text-sm opacity-60 leading-relaxed">
                Crimson silk that falls like water but cuts like glass. The corset structural, the skirt yielding.
              </p>
              <button
                onClick={() => handleOpenLook('look_seraphine')}
                className="text-xs uppercase tracking-[0.15em] text-petal hover:text-rouge transition-colors self-start mt-2"
              >
                Shop this look →
              </button>
            </div>
            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
              <ParallaxImage src="/assets/editorial/lookbook2.png" alt="The Seraphine" className="aspect-square bg-charcoal" offset={80} />
            </div>
          </div>

          {/* Full-bleed video-style quote section */}
          <div
            className="relative py-20 px-6 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A0A0D 0%, #2E1A20 50%, #1A0A0D 100%)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-petal text-[10px] uppercase tracking-[0.2em] block mb-6">Clairvoyant Manifesto</span>
              <blockquote className="font-serif text-3xl md:text-5xl italic text-ivory/90 max-w-3xl mx-auto leading-tight">
                "A garment becomes a point of entry through which a version of you comes into view."
              </blockquote>
            </motion.div>
          </div>

          {/* Look 3 — The Noa */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-10 md:col-start-2">
              <div className="relative">
                <ParallaxImage src="/assets/editorial/hero.png" alt="The Edit" className="aspect-video bg-charcoal" offset={100} />
                <div className="absolute bottom-6 left-6 flex flex-col gap-3">
                  <OccasionBadge label="Daywear" />
                  <button
                    onClick={() => handleOpenLook('look_noa')}
                    className="text-xs uppercase tracking-[0.15em] text-petal hover:text-rouge transition-colors self-start"
                  >
                    Shop The Noa Day →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-32 pt-16 border-t border-smoke/20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-petal/60 block mb-4">The Atelier Builder</span>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Compose Your Own Look</h2>
            <p className="text-petal/60 mb-10 max-w-md mx-auto font-light text-sm leading-relaxed">
              Every look begins with a single piece. The builder lets you explore the full architecture of the collection.
            </p>
            <Link
              href="/builder"
              className="group relative inline-block px-10 py-5 uppercase tracking-[0.15em] text-sm border border-smoke/40 hover:border-rouge overflow-hidden"
            >
              <span className="relative z-10 text-ivory group-hover:text-ivory transition-colors duration-500">Enter the Builder</span>
              <div className="absolute inset-0 bg-rouge translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
