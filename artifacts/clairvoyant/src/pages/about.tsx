import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-ivory text-charcoal pt-32 pb-32"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <header className="mb-24">
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">The Maison</h1>
        </header>

        <div className="space-y-12 font-serif text-xl md:text-2xl leading-relaxed text-charcoal/80">
          <p>
            Clairvoyant was founded on a singular premise: a garment becomes a point of entry through which a version of you comes into view.
          </p>
          <p>
            We do not believe in trends. We believe in the slow aggregation of an identity. The clothes we make are architectures—sculpted wool, rigid corsetry, fluid silks—designed to hold both the weight of memory and the lightness of becoming.
          </p>
          <p>
            Operating out of our Los Angeles studio, we approach fashion not as consumption, but as composition. To get dressed is a declarative act. It is the ritual of deciding who will walk out the door.
          </p>
          <p className="text-rouge italic pt-8">
            "The future version of you already exists. Let her get dressed."
          </p>
        </div>

        <div className="mt-32 pt-16 border-t border-smoke/20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-smoke/60 mb-4">The Studio</h3>
            <p className="text-sm leading-relaxed">
              Every piece is designed in-house in Los Angeles, prioritizing structural integrity and fabric quality. We source heavy wools from heritage mills in Italy and silks from Japan, ensuring the garments outlast the season.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-smoke/60 mb-4">The Interactive Builder</h3>
            <p className="text-sm leading-relaxed">
              We developed the Builder to reflect our philosophy of composition. It allows you to explore our collection as a cohesive system, layering pieces to discover the silhouette that resonates with your intent.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
