import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxImage({ src, alt, offset = 50, className = "" }: { src: string, alt: string, offset?: number, className?: string }) {
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

export default function Lookbook() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-surfacedark text-ivory pt-32 pb-32"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <header className="mb-32 text-center max-w-2xl mx-auto">
          <span className="text-petal uppercase tracking-[0.2em] text-xs mb-4 block">SS26 Collection</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">What you wear becomes part of what you remember.</h1>
          <p className="text-sm opacity-60 leading-relaxed font-light">
            A study in shadow, structure, and silk. Photographed in Paris by Julien R.
          </p>
        </header>

        <div className="flex flex-col gap-32 md:gap-48">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <ParallaxImage src="/assets/editorial/lookbook1.png" alt="Lookbook 1" className="aspect-[4/5] bg-charcoal" />
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-6">
              <h2 className="font-serif text-3xl">The Architecture of Silence</h2>
              <p className="text-sm opacity-60 leading-relaxed">
                Sculpted tailoring that demands space. The charcoal blazer holds its shape, an armor of wool and intention.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 md:col-start-2 order-2 md:order-1 flex flex-col gap-6">
              <h2 className="font-serif text-3xl">Fluid Dominance</h2>
              <p className="text-sm opacity-60 leading-relaxed">
                Crimson silk that falls like water but cuts like glass. The corset structural, the skirt yielding.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
              <ParallaxImage src="/assets/editorial/lookbook2.png" alt="Lookbook 2" className="aspect-square bg-charcoal" offset={80} />
            </div>
          </div>
          
          <div className="w-full text-center">
            <span className="font-serif text-2xl md:text-4xl italic text-petal">"A dialogue between restraint and exposure."</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-10 md:col-start-2">
              <ParallaxImage src="/assets/editorial/hero.png" alt="Lookbook 3" className="aspect-video bg-charcoal" offset={100} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
