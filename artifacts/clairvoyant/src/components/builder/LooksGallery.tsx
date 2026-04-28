import { motion } from "framer-motion";
import { prebuiltLooks } from "@/data/looks";
import { useOutfitStore } from "@/stores/outfit";

export function LooksGallery() {
  const { loadLook } = useOutfitStore();

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs uppercase tracking-[0.15em] text-smoke/50">Editorial Looks</span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-smoke/30">{prebuiltLooks.length} looks</span>
      </div>
      <div
        className="flex gap-3 overflow-x-auto pb-3 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {prebuiltLooks.map((look, i) => (
          <motion.button
            key={look.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => loadLook(look.garmentIds)}
            className="group flex-shrink-0 flex flex-col text-left transition-opacity hover:opacity-100 opacity-70 focus:outline-none"
            style={{ scrollSnapAlign: 'start', width: 100 }}
          >
            <div
              className="w-full aspect-[3/4] bg-charcoal/10 overflow-hidden mb-2 border border-transparent group-hover:border-rouge/50 transition-colors duration-200 relative"
            >
              <img
                src={look.thumbnail}
                alt={look.name}
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-300" />
              <div
                className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.1em]"
                style={{ backgroundColor: 'rgba(123,28,36,0.85)', color: '#F5F0E8' }}
              >
                {look.occasionLabel}
              </div>
            </div>
            <span className="font-serif text-xs text-charcoal leading-tight">{look.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
