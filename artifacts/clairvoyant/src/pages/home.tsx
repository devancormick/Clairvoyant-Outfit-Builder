import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-charcoal">
          {/* We use a placeholder div or an image if generated */}
          <div className="absolute inset-0 opacity-70 bg-gradient-to-b from-transparent to-charcoal mix-blend-multiply" />
          <img 
            src="/assets/editorial/hero.png" 
            alt="Clairvoyant Editorial"
            className="w-full h-full object-cover object-center opacity-80"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight mb-6"
          >
            Clairvoyant
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-petal text-lg md:text-xl font-light italic max-w-xl text-center leading-relaxed"
          >
            "The future version of you already exists.<br/>Let her get dressed."
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 bg-ivory text-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">You are not becoming someone new. You are stepping into someone who already exists.</h2>
          <p className="text-smoke/80 leading-relaxed text-lg max-w-2xl mx-auto">
            Our garments are not costumes. They are architectures of self. Designed in our Paris atelier, each piece is constructed to hold the weight of memory and the lightness of becoming. We believe in the tactile, the unhurried, the sculpted.
          </p>
        </div>
      </section>

      {/* Invitation to Builder */}
      <section className="py-32 px-6 md:px-12 bg-charcoal text-ivory border-t border-smoke/30 flex flex-col items-center text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-6">The Atelier Builder</h2>
        <p className="text-petal mb-12 max-w-lg">
          Explore the collection as a system. Layer silhouettes, combine textures, and compose your identity.
        </p>
        <Link href="/builder" className="group relative px-8 py-4 uppercase tracking-[0.15em] text-sm border border-smoke/50 hover:border-rouge transition-colors overflow-hidden">
          <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">Enter the Builder</span>
          <div className="absolute inset-0 bg-rouge translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.4,0,0.2,1]" />
        </Link>
      </section>
    </div>
  );
}
