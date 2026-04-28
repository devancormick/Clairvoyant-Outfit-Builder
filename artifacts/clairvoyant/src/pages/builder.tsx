import { useOutfitStore } from "@/stores/outfit";
import { garments, Garment, GarmentCategory } from "@/data/garments";
import { occasions } from "@/data/occasions";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { HotspotOverlay } from "@/components/builder/HotspotOverlay";
import { LooksGallery } from "@/components/builder/LooksGallery";
import { GarmentDetailDrawer } from "@/components/builder/GarmentDetailDrawer";

// ---------------------------------------------------------------------------
// OutfitCanvas
// ---------------------------------------------------------------------------
function OutfitCanvas() {
  const { currentOutfit, viewMode, resetOutfit } = useOutfitStore();
  const activeLayers = Object.values(currentOutfit.layers)
    .filter(Boolean)
    .sort((a, b) => (a?.layerIndex || 0) - (b?.layerIndex || 0));

  const isEmpty = activeLayers.length === 0;

  return (
    <div className="relative w-full max-w-[600px] aspect-[2/3] bg-[#EAE5DF] overflow-hidden mx-auto shadow-xl">
      <img
        src="/assets/model/base_front.png"
        alt="Base Model"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.backgroundColor = '#EAE5DF';
          e.currentTarget.style.display = 'none';
        }}
      />

      <AnimatePresence mode="sync">
        {activeLayers.map((garment) => garment && (
          <motion.img
            key={`${garment.id}-${viewMode}`}
            src={
              viewMode === 'back' && garment.normalizedBackAssetUrl
                ? garment.normalizedBackAssetUrl
                : garment.normalizedAssetUrl
            }
            alt={garment.name}
            className="absolute inset-0 w-full h-full pointer-events-none object-cover"
            style={{ zIndex: garment.layerIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            draggable={false}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ))}
      </AnimatePresence>

      {/* Back view coming soon overlay */}
      {viewMode === 'back' && (
        <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none" style={{ zIndex: 20 }}>
          <span className="text-[10px] uppercase tracking-[0.15em] px-3 py-1 bg-charcoal/60 text-ivory/60">
            Back view coming soon
          </span>
        </div>
      )}

      {/* Empty canvas instruction */}
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 15 }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.2em] text-smoke/40 text-center px-8"
          >
            Tap a category to begin composing
          </motion.p>
        </div>
      )}

      {/* Hotspot overlay */}
      <HotspotOverlay />

      {/* Reset button */}
      {!isEmpty && (
        <button
          onClick={resetOutfit}
          className="absolute top-3 right-3 z-30 w-7 h-7 flex items-center justify-center bg-ivory/80 hover:bg-rouge hover:text-ivory transition-colors text-charcoal text-sm leading-none"
          title="Reset outfit"
        >
          ×
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SwatchPanel
// ---------------------------------------------------------------------------
function SwatchPanel({ onGarmentClick }: { onGarmentClick: (g: Garment) => void }) {
  const { selectedCategory, currentOutfit, setLayer, clearLayer, occasionFilter } = useOutfitStore();

  const categoryGarments = garments.filter(g => {
    if (g.category !== selectedCategory) return false;
    if (occasionFilter && !g.occasion.includes(occasionFilter)) return false;
    return true;
  });

  // Preload images for selected category
  useEffect(() => {
    garments
      .filter(g => g.category === selectedCategory)
      .forEach(g => {
        const img = new Image();
        img.src = g.normalizedAssetUrl;
      });
  }, [selectedCategory]);

  if (categoryGarments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-xs uppercase tracking-[0.15em] text-smoke/40">No garments for this occasion</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 auto-rows-max">
      <AnimatePresence mode="popLayout">
        {categoryGarments.map((garment, i) => {
          const isSelected = currentOutfit.layers[selectedCategory]?.id === garment.id;

          return (
            <motion.div
              key={garment.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex flex-col text-left transition-all ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            >
              <div
                className={`aspect-[3/4] w-full bg-smoke/5 overflow-hidden mb-3 border transition-colors relative cursor-pointer ${isSelected ? 'border-rouge' : 'border-transparent group-hover:border-smoke/20'}`}
                onClick={() => onGarmentClick(garment)}
              >
                <div className="absolute inset-0 bg-petal/0 group-hover:bg-petal/10 transition-colors z-10" />
                <img
                  src={garment.thumbnailUrl}
                  alt={garment.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                {isSelected && (
                  <div className="absolute top-2 right-2 z-20 w-5 h-5 flex items-center justify-center bg-rouge text-ivory text-[10px] leading-none">
                    ✓
                  </div>
                )}
              </div>
              <button
                onClick={() => isSelected ? clearLayer(selectedCategory) : setLayer(selectedCategory, garment)}
                className="text-left"
              >
                <span className="font-serif text-charcoal text-sm block">{garment.name}</span>
                <span className="text-[10px] text-smoke/40 block mt-0.5">{garment.colorway}</span>
                <span className="text-xs text-gold mt-1 block">${garment.price}</span>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CompleteTheLook
// ---------------------------------------------------------------------------
function CompleteTheLook({ onGarmentClick }: { onGarmentClick: (g: Garment) => void }) {
  const { currentOutfit, setLayer } = useOutfitStore();
  const layers = currentOutfit.layers;

  // Find unoccupied categories that are compatible with active layers
  const activeCats = Object.keys(layers) as GarmentCategory[];
  if (activeCats.length === 0) return null;

  // If dress selected, no suggestions possible (top/bottom excluded)
  if (layers.dress) return null;

  const occupied = new Set(activeCats);
  const suggestions: Garment[] = [];

  const categories: GarmentCategory[] = ['top', 'bottom', 'outerwear'];
  for (const cat of categories) {
    if (!occupied.has(cat)) {
      const suggestion = garments.find(g => g.category === cat);
      if (suggestion) suggestions.push(suggestion);
    }
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-smoke/10">
      <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/40 block mb-3">Complete the Look</span>
      <div className="flex gap-3">
        {suggestions.slice(0, 2).map(garment => (
          <button
            key={garment.id}
            onClick={() => { setLayer(garment.category, garment); onGarmentClick(garment); }}
            className="group flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="w-14 aspect-[3/4] bg-smoke/5 overflow-hidden border border-transparent group-hover:border-smoke/20 transition-colors">
              <img
                src={garment.thumbnailUrl}
                alt={garment.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.1em] text-smoke/50 text-center leading-tight max-w-[56px]">
              {garment.subcategory.replace('_', ' ')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Builder page
// ---------------------------------------------------------------------------
export default function Builder() {
  const {
    selectedCategory,
    setSelectedCategory,
    currentOutfit,
    viewMode,
    setViewMode,
    occasionFilter,
    setOccasionFilter,
    getShareableParam,
    loadLookFromUrl,
  } = useOutfitStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailGarment, setDetailGarment] = useState<Garment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const { toast } = useToast();
  const [location] = useLocation();

  // Load shared look from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lookParam = params.get('look');
    if (lookParam) {
      loadLookFromUrl(lookParam);
    }
  }, []);

  const categories: { id: GarmentCategory; label: string }[] = [
    { id: 'top',      label: 'Tops' },
    { id: 'bottom',   label: 'Bottoms' },
    { id: 'dress',    label: 'Dresses' },
    { id: 'outerwear',label: 'Outerwear' },
  ];

  const activeLayers = Object.values(currentOutfit.layers).filter(Boolean);
  const totalPrice = activeLayers.reduce((sum, g) => sum + (g?.price || 0), 0);

  const handleCompose = () => {
    if (activeLayers.length === 0) return;
    setDrawerOpen(true);
  };

  const handleConfirmCart = () => {
    setDrawerOpen(false);
    toast({
      title: "Look added to atelier bag",
      description: "Your selected garments have been reserved.",
    });
  };

  const handleShare = useCallback(() => {
    const param = getShareableParam();
    if (!param) {
      toast({ title: "Nothing to share", description: "Add at least one piece to share your look." });
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}?look=${param}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({ title: "Link copied", description: "Share your look with this URL." });
    });
    window.history.replaceState(null, '', `?look=${param}`);
  }, [getShareableParam, toast]);

  const handleGarmentClick = (garment: Garment) => {
    setDetailGarment(garment);
    setDetailOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-12 bg-ivory flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-12"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Left Col: Looks Gallery + Canvas                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex-1 flex flex-col items-center gap-6">
        {/* Looks gallery replaces the old dropdown */}
        <div className="w-full max-w-[600px]">
          <LooksGallery />
        </div>

        {/* Canvas header row */}
        <div className="w-full max-w-[600px] flex justify-between items-center">
          <span className="text-xs uppercase tracking-[0.15em] text-smoke/50">The Canvas</span>
          <div className="flex items-center gap-3">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="text-xs uppercase tracking-[0.15em] text-smoke/50 hover:text-rouge transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share Look
            </button>
            {/* View toggle */}
            <div className="flex border border-smoke/20 overflow-hidden">
              <button
                onClick={() => setViewMode('front')}
                className={`text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 transition-colors ${viewMode === 'front' ? 'bg-charcoal text-ivory' : 'text-smoke/50 hover:text-charcoal'}`}
              >
                Front
              </button>
              <button
                onClick={() => setViewMode('back')}
                className={`text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 transition-colors ${viewMode === 'back' ? 'bg-charcoal text-ivory' : 'text-smoke/50 hover:text-charcoal'}`}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <OutfitCanvas />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Right Col: Controls                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full lg:w-[380px] flex flex-col h-full lg:sticky lg:top-24">
        {/* Occasion filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
          <button
            onClick={() => setOccasionFilter(null)}
            className={`flex-shrink-0 text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 border transition-colors ${
              !occasionFilter
                ? 'border-charcoal bg-charcoal text-ivory'
                : 'border-smoke/20 text-smoke/50 hover:text-charcoal hover:border-smoke/40'
            }`}
          >
            All
          </button>
          {occasions.map(occ => (
            <button
              key={occ.id}
              onClick={() => setOccasionFilter(occasionFilter === occ.id ? null : occ.id)}
              className={`flex-shrink-0 text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 border transition-colors ${
                occasionFilter === occ.id
                  ? 'border-rouge bg-rouge text-ivory'
                  : 'border-smoke/20 text-smoke/50 hover:text-charcoal hover:border-smoke/40'
              }`}
            >
              {occ.shortLabel}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <nav className="flex gap-6 border-b border-smoke/10 mb-6 pb-3 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.id ? 'text-rouge' : 'text-smoke/40 hover:text-charcoal'
              }`}
            >
              {cat.label}
              {currentOutfit.layers[cat.id] && (
                <span className="w-1.5 h-1.5 rounded-full bg-rouge inline-block" />
              )}
            </button>
          ))}
        </nav>

        {/* Swatch panel */}
        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar pb-56">
          <SwatchPanel onGarmentClick={handleGarmentClick} />
          <CompleteTheLook onGarmentClick={handleGarmentClick} />
        </div>

        {/* Summary Footer */}
        <div className="absolute bottom-0 left-0 w-full lg:relative lg:bottom-auto bg-ivory/95 backdrop-blur-md border-t border-smoke/10 p-5 flex flex-col gap-4 z-20 lg:mt-4">
          {/* Selected garment thumbnails */}
          {activeLayers.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {activeLayers.map(g => g && (
                <div key={g.id} className="flex-shrink-0 relative group">
                  <div className="w-10 h-12 bg-smoke/5 overflow-hidden border border-smoke/10">
                    <img
                      src={g.thumbnailUrl}
                      alt={g.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.15em] text-smoke/50 mb-0.5">
                {activeLayers.length > 0 ? `${activeLayers.length} piece${activeLayers.length > 1 ? 's' : ''}` : 'Empty Canvas'}
              </span>
              <span className="font-serif text-charcoal text-sm">
                {activeLayers.length > 0
                  ? activeLayers.map(g => g?.name).join(' · ')
                  : 'No garments selected'}
              </span>
            </div>
            {totalPrice > 0 && (
              <span className="text-gold font-serif text-xl">${totalPrice.toLocaleString()}</span>
            )}
          </div>

          <button
            onClick={handleCompose}
            disabled={activeLayers.length === 0}
            className="w-full bg-charcoal text-ivory uppercase tracking-[0.15em] text-sm py-4 hover:bg-rouge transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-charcoal"
          >
            Compose Look · Add to Bag
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Confirmation Drawer                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-ivory border-smoke/20">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="font-serif text-2xl text-center">Confirm Look</DrawerTitle>
              <DrawerDescription className="text-center text-smoke/60">
                Add {activeLayers.length} piece{activeLayers.length > 1 ? 's' : ''} to your atelier bag.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 flex flex-col gap-4">
              {activeLayers.map(g => g && (
                <div key={g.id} className="flex justify-between items-center border-b border-smoke/10 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-smoke/5 overflow-hidden flex-shrink-0">
                      <img
                        src={g.thumbnailUrl}
                        alt={g.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <span className="font-serif text-sm block">{g.name}</span>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-smoke/40">{g.colorway}</span>
                    </div>
                  </div>
                  <span className="text-gold text-sm font-serif">${g.price}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 font-serif text-xl">
                <span>Total</span>
                <span className="text-gold">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <DrawerFooter>
              <button
                onClick={handleConfirmCart}
                className="w-full bg-charcoal text-ivory py-4 uppercase tracking-[0.15em] text-sm hover:bg-rouge transition-colors"
              >
                Add to Bag
              </button>
              <DrawerClose asChild>
                <button className="w-full py-3 uppercase tracking-[0.15em] text-sm text-smoke/50 hover:text-charcoal transition-colors">
                  Cancel
                </button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Garment Detail Drawer */}
      <GarmentDetailDrawer
        garment={detailGarment}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </motion.div>
  );
}
