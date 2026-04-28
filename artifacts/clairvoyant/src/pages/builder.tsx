import { useOutfitStore } from "@/stores/outfit";
import { prebuiltLooks } from "@/data/looks";
import { garments, GarmentCategory } from "@/data/garments";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

function OutfitCanvas() {
  const { currentOutfit, viewMode } = useOutfitStore();
  const activeLayers = Object.values(currentOutfit.layers)
    .filter(Boolean)
    .sort((a, b) => (a?.layerIndex || 0) - (b?.layerIndex || 0));

  return (
    <div className="relative w-full max-w-[600px] aspect-[2/3] bg-[#EAE5DF] overflow-hidden mx-auto shadow-xl">
      <img
        src="/assets/model/base_front.png"
        alt="Base Model"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <AnimatePresence mode="sync">
        {activeLayers.map((garment) => garment && (
          <motion.img
            key={`${garment.id}-${viewMode}`}
            src={garment.normalizedAssetUrl}
            alt={garment.name}
            className="absolute inset-0 w-full h-full pointer-events-none object-cover"
            style={{ zIndex: garment.layerIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            draggable={false}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function SwatchPanel() {
  const { selectedCategory, currentOutfit, setLayer, clearLayer } = useOutfitStore();
  const categoryGarments = garments.filter(g => g.category === selectedCategory);
  
  return (
    <div className="grid grid-cols-2 gap-4 auto-rows-max">
      {categoryGarments.map(garment => {
        const isSelected = currentOutfit.layers[selectedCategory]?.id === garment.id;
        
        return (
          <button
            key={garment.id}
            onClick={() => isSelected ? clearLayer(selectedCategory) : setLayer(selectedCategory, garment)}
            className={`group relative flex flex-col text-left transition-all ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            <div className={`aspect-[3/4] w-full bg-smoke/5 overflow-hidden mb-3 border transition-colors ${isSelected ? 'border-rouge' : 'border-transparent group-hover:border-smoke/20'}`}>
              <div className="absolute inset-0 bg-petal/0 group-hover:bg-petal/10 transition-colors z-10" />
              <img src={garment.thumbnailUrl} alt={garment.name} className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-charcoal">{garment.name}</span>
            <span className="text-xs text-gold mt-1">€{garment.price}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Builder() {
  const { selectedCategory, setSelectedCategory, currentOutfit, loadLook } = useOutfitStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast } = useToast();

  const categories: { id: GarmentCategory; label: string }[] = [
    { id: 'top', label: 'Tops' },
    { id: 'bottom', label: 'Bottoms' },
    { id: 'dress', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-12 bg-ivory flex flex-col lg:flex-row gap-12 px-6 md:px-12"
    >
      {/* Left Col: Pre-built Looks & Canvas */}
      <div className="flex-1 flex flex-col items-center gap-8">
        <div className="w-full max-w-[600px] flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.15em] text-smoke/60">The Edit</span>
            <select 
              className="bg-transparent border-b border-smoke/20 pb-1 font-serif text-lg text-charcoal focus:outline-none focus:border-rouge transition-colors cursor-pointer"
              onChange={(e) => {
                const look = prebuiltLooks.find(l => l.id === e.target.value);
                if (look) loadLook(look.garmentIds);
              }}
              defaultValue=""
            >
              <option value="" disabled>Load Editorial Look...</option>
              {prebuiltLooks.map(look => (
                <option key={look.id} value={look.id}>{look.name}</option>
              ))}
            </select>
          </div>
          
          <div className="text-xs uppercase tracking-[0.15em] border border-smoke/20 px-3 py-1 rounded-full text-smoke/60">
            Front View
          </div>
        </div>

        <OutfitCanvas />
      </div>

      {/* Right Col: Controls */}
      <div className="w-full lg:w-[400px] flex flex-col h-full sticky top-24">
        <nav className="flex gap-6 border-b border-smoke/10 mb-8 pb-4 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${selectedCategory === cat.id ? 'text-rouge' : 'text-smoke/40 hover:text-charcoal'}`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto pr-4 no-scrollbar pb-32">
          <SwatchPanel />
        </div>

        {/* Summary Footer */}
        <div className="absolute bottom-0 left-0 w-full bg-ivory/90 backdrop-blur-md border-t border-smoke/10 p-6 flex flex-col gap-4 z-20">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.15em] text-smoke/60 mb-1">Current Look</span>
              <span className="font-serif text-charcoal text-sm">
                {activeLayers.length > 0 ? activeLayers.map(g => g?.name).join(', ') : 'Empty Canvas'}
              </span>
            </div>
            <span className="text-gold font-serif text-xl">€{totalPrice}</span>
          </div>
          <button 
            onClick={handleCompose}
            disabled={activeLayers.length === 0}
            className="w-full bg-charcoal text-ivory uppercase tracking-[0.15em] text-sm py-4 hover:bg-rouge transition-colors disabled:opacity-50 disabled:hover:bg-charcoal"
          >
            Compose Look · Add to Cart
          </button>
        </div>
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-ivory border-smoke/20">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="font-serif text-2xl text-center">Confirm Look</DrawerTitle>
              <DrawerDescription className="text-center text-smoke/60">
                Add these {activeLayers.length} pieces to your atelier bag.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 flex flex-col gap-4">
              {activeLayers.map(g => g && (
                <div key={g.id} className="flex justify-between items-center border-b border-smoke/10 pb-4">
                  <div className="flex items-center gap-4">
                    <img src={g.thumbnailUrl} alt={g.name} className="w-12 h-16 object-cover bg-smoke/5" />
                    <span className="font-serif">{g.name}</span>
                  </div>
                  <span className="text-gold text-sm">€{g.price}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-serif text-xl">
                <span>Total</span>
                <span className="text-gold">€{totalPrice}</span>
              </div>
            </div>
            <DrawerFooter>
              <button onClick={handleConfirmCart} className="w-full bg-charcoal text-ivory py-4 uppercase tracking-[0.15em] text-sm hover:bg-rouge transition-colors">
                Add to Bag
              </button>
              <DrawerClose asChild>
                <button className="w-full py-4 uppercase tracking-[0.15em] text-sm text-smoke/60 hover:text-charcoal transition-colors">
                  Cancel
                </button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
}
