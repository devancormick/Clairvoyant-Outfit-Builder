import { useState, useMemo } from "react";
import { garments, Garment, GarmentCategory } from "@/data/garments";
import { occasions } from "@/data/occasions";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useOutfitStore } from "@/stores/outfit";
import { useLocation } from "wouter";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

type SortOption = 'featured' | 'price-asc' | 'price-desc';

function GarmentDetailSheet({ garment, open, onClose }: { garment: Garment | null; open: boolean; onClose: () => void }) {
  const { setLayer, resetOutfit, setSelectedCategory } = useOutfitStore();
  const [, setLocation] = useLocation();

  if (!garment) return null;

  const garmentOccasions = garment.occasion
    .map(id => occasions.find(o => o.id === id))
    .filter(Boolean);

  const handleStyleIt = () => {
    resetOutfit();
    setLayer(garment.category, garment);
    setSelectedCategory(garment.category);
    onClose();
    setLocation('/builder');
  };

  return (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent className="bg-ivory border-smoke/20 max-h-[90dvh]">
        <div className="mx-auto w-full max-w-2xl overflow-y-auto no-scrollbar">
          <DrawerHeader className="flex justify-between items-center px-6 pt-6 pb-2">
            <DrawerTitle className="font-serif text-2xl text-charcoal">{garment.name}</DrawerTitle>
            <DrawerClose asChild>
              <button className="text-smoke/40 hover:text-charcoal transition-colors text-xl leading-none">×</button>
            </DrawerClose>
          </DrawerHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-8">
            {/* Image */}
            <div className="aspect-[3/4] bg-[#EAE5DF] overflow-hidden">
              <img
                src={garment.normalizedAssetUrl}
                alt={garment.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-[0.15em] text-smoke/50">{garment.colorway}</span>
                <span className="font-serif text-2xl" style={{ color: '#B8975A' }}>${garment.price}</span>
              </div>

              <p className="text-sm text-smoke/80 leading-relaxed">{garment.description}</p>

              <div className="flex flex-col gap-3 border-t border-smoke/10 pt-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-1">Fabric</span>
                  <span className="text-sm text-charcoal">{garment.fabric}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-1">Fit</span>
                  <span className="text-sm text-charcoal">{garment.fit}</span>
                </div>
              </div>

              {garmentOccasions.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-2">Worn for</span>
                  <div className="flex flex-wrap gap-2">
                    {garmentOccasions.map(occ => occ && (
                      <span
                        key={occ.id}
                        className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 border"
                        style={{ borderColor: 'rgba(123,28,36,0.3)', color: '#7B1C24' }}
                      >
                        {occ.shortLabel}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-auto pt-4">
                <button
                  onClick={handleStyleIt}
                  className="w-full py-4 bg-charcoal text-ivory uppercase tracking-[0.15em] text-sm hover:bg-rouge transition-colors"
                >
                  Style It in Builder
                </button>
                <button className="w-full py-3 border border-smoke/20 text-charcoal uppercase tracking-[0.15em] text-sm hover:border-rouge hover:text-rouge transition-colors">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function Shop() {
  const { setLayer, resetOutfit, setSelectedCategory } = useOutfitStore();
  const [, setLocation] = useLocation();

  const [categoryFilter, setCategoryFilter] = useState<GarmentCategory | 'all'>('all');
  const [occasionFilterId, setOccasionFilterId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('featured');
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleStyleIt = (garment: Garment) => {
    resetOutfit();
    setLayer(garment.category, garment);
    setSelectedCategory(garment.category);
    setLocation('/builder');
  };

  const handleViewDetails = (garment: Garment) => {
    setSelectedGarment(garment);
    setDetailOpen(true);
  };

  const categories: { id: GarmentCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'top', label: 'Tops' },
    { id: 'bottom', label: 'Bottoms' },
    { id: 'dress', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
  ];

  const filteredGarments = useMemo(() => {
    let result = garments.filter(g => {
      if (categoryFilter !== 'all' && g.category !== categoryFilter) return false;
      if (occasionFilterId && !g.occasion.includes(occasionFilterId)) return false;
      return true;
    });

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [categoryFilter, occasionFilterId, sort]);

  const hasActiveFilters = categoryFilter !== 'all' || occasionFilterId !== null;

  const clearAllFilters = () => {
    setCategoryFilter('all');
    setOccasionFilterId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-24 bg-ivory px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 border-b border-smoke/10 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-6">
            <h1 className="font-serif text-5xl text-charcoal">The Edit</h1>
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="bg-transparent border-b border-smoke/20 pb-1 text-xs uppercase tracking-[0.12em] text-smoke/60 focus:outline-none focus:border-rouge transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs uppercase tracking-[0.12em] text-rouge hover:text-charcoal transition-colors"
                >
                  Clear All ×
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-5 text-xs uppercase tracking-[0.15em] mb-4 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`whitespace-nowrap transition-colors pb-1 ${
                  categoryFilter === cat.id
                    ? 'text-charcoal border-b border-charcoal'
                    : 'text-smoke/40 hover:text-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Occasion filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {occasions.map(occ => (
              <button
                key={occ.id}
                onClick={() => setOccasionFilterId(occasionFilterId === occ.id ? null : occ.id)}
                className={`flex-shrink-0 text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 border transition-colors ${
                  occasionFilterId === occ.id
                    ? 'border-rouge bg-rouge text-ivory'
                    : 'border-smoke/20 text-smoke/50 hover:border-smoke/40 hover:text-charcoal'
                }`}
              >
                {occ.shortLabel}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-[10px] uppercase tracking-[0.12em] text-smoke/40 mt-4">
            {filteredGarments.length} piece{filteredGarments.length !== 1 ? 's' : ''}
          </p>
        </header>

        {/* Grid */}
        {filteredGarments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-serif text-2xl text-charcoal/60 mb-4">No garments match</p>
            <button onClick={clearAllFilters} className="text-xs uppercase tracking-[0.15em] text-rouge hover:text-charcoal transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredGarments.map((garment, i) => (
                <motion.div
                  key={garment.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="group flex flex-col"
                >
                  <div
                    className="relative aspect-[3/4] bg-[#EAE5DF] mb-6 overflow-hidden cursor-pointer"
                    onClick={() => handleViewDetails(garment)}
                  >
                    <img
                      src={garment.normalizedAssetUrl}
                      alt={garment.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />

                    {/* Hover overlay actions */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleViewDetails(garment); }}
                        className="flex-1 bg-ivory text-charcoal py-2.5 text-[10px] uppercase tracking-[0.15em] text-center hover:bg-charcoal hover:text-ivory transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStyleIt(garment); }}
                        className="flex-1 bg-rouge text-ivory py-2.5 text-[10px] uppercase tracking-[0.15em] text-center hover:bg-charcoal transition-colors"
                      >
                        Style It
                      </button>
                    </div>

                    {/* Occasion pills */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {garment.occasion.slice(0, 1).map(occId => {
                        const occ = occasions.find(o => o.id === occId);
                        return occ ? (
                          <span
                            key={occId}
                            className="text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5"
                            style={{ backgroundColor: 'rgba(123,28,36,0.8)', color: '#F5F0E8' }}
                          >
                            {occ.shortLabel}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-smoke/40">
                        {garment.subcategory.replace('_', ' ')}
                      </span>
                      <h3 className="font-serif text-xl text-charcoal">{garment.name}</h3>
                      <span className="text-[10px] text-smoke/40">{garment.colorway}</span>
                    </div>
                    <span className="text-gold font-serif text-lg">${garment.price}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Detail sheet */}
      <GarmentDetailSheet
        garment={selectedGarment}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </motion.div>
  );
}
