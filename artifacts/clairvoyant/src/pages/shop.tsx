import { garments } from "@/data/garments";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useOutfitStore } from "@/stores/outfit";
import { useLocation } from "wouter";

export default function Shop() {
  const { setLayer, resetOutfit, setSelectedCategory } = useOutfitStore();
  const [, setLocation] = useLocation();

  const handleStyleIt = (garment: typeof garments[0]) => {
    resetOutfit();
    setLayer(garment.category, garment);
    setSelectedCategory(garment.category);
    setLocation('/builder');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-24 bg-ivory px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-baseline gap-8 border-b border-smoke/10 pb-8">
          <h1 className="font-serif text-5xl text-charcoal">The Edit</h1>
          <div className="flex gap-6 text-xs uppercase tracking-[0.15em] text-smoke/60">
            <button className="hover:text-charcoal transition-colors text-charcoal border-b border-charcoal pb-1">All</button>
            <button className="hover:text-charcoal transition-colors">Tops</button>
            <button className="hover:text-charcoal transition-colors">Bottoms</button>
            <button className="hover:text-charcoal transition-colors">Dresses</button>
            <button className="hover:text-charcoal transition-colors">Outerwear</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {garments.map((garment, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              key={garment.id} 
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-[#EAE5DF] mb-6 overflow-hidden">
                <img 
                  src={garment.normalizedAssetUrl} 
                  alt={garment.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
                
                {/* Hover overlay actions */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex gap-4">
                  <button 
                    onClick={() => handleStyleIt(garment)}
                    className="flex-1 bg-ivory text-charcoal py-3 text-xs uppercase tracking-[0.15em] text-center hover:bg-rouge hover:text-ivory transition-colors"
                  >
                    Style It in Builder
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest text-smoke/50">{garment.subcategory.replace('_', ' ')}</span>
                  <h3 className="font-serif text-xl text-charcoal">{garment.name}</h3>
                </div>
                <span className="text-gold font-serif text-lg">€{garment.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
