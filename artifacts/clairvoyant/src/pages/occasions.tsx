import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { occasions } from "@/data/occasions";
import { garments } from "@/data/garments";

export default function Occasions() {
  const [, setLocation] = useLocation();

  const getGarmentCount = (occasionId: string) =>
    garments.filter(g => g.occasion.includes(occasionId)).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-24 bg-ivory px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.2em] text-smoke/40 block mb-4"
          >
            Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-6xl text-charcoal mb-6"
          >
            Dress for the Occasion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-smoke/60 leading-relaxed max-w-lg mx-auto"
          >
            Each moment has its own architecture. We've curated the collection by the occasions
            that call for a considered silhouette.
          </motion.p>
        </header>

        {/* Occasions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {occasions.map((occasion, i) => {
            const count = getGarmentCount(occasion.id);

            return (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden cursor-pointer ${
                  i === 0 ? 'md:col-span-2 md:aspect-[21/9]' : 'aspect-[4/3]'
                }`}
                onClick={() => setLocation(`/shop?occasion=${occasion.id}`)}
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-charcoal">
                  <img
                    src={occasion.editorial}
                    alt={occasion.label}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-ivory">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-petal/70 block mb-2">
                        {count} piece{count !== 1 ? 's' : ''}
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl mb-3 group-hover:text-petal transition-colors duration-500">
                        {occasion.label}
                      </h2>
                      <p className="text-sm text-ivory/60 max-w-sm leading-relaxed font-light">
                        {occasion.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-8">
                      <span className="text-xs uppercase tracking-[0.15em] text-ivory/60 group-hover:text-rouge transition-colors duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Builder CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-20"
        >
          <p className="text-smoke/50 mb-6 font-light">
            Want to mix occasions? The Builder lets you compose freely.
          </p>
          <Link
            href="/builder"
            className="inline-block px-8 py-4 uppercase tracking-[0.15em] text-sm border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Open the Builder →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
