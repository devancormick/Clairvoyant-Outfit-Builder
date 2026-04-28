import { Garment } from "@/data/garments";
import { occasions } from "@/data/occasions";
import { useOutfitStore } from "@/stores/outfit";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

type Props = {
  garment: Garment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GarmentDetailDrawer({ garment, open, onOpenChange }: Props) {
  const { setLayer, currentOutfit } = useOutfitStore();

  if (!garment) return null;

  const isSelected = currentOutfit.layers[garment.category]?.id === garment.id;

  const handleSelect = () => {
    setLayer(garment.category, garment);
    onOpenChange(false);
  };

  const garmentOccasions = garment.occasion
    .map(id => occasions.find(o => o.id === id))
    .filter(Boolean);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-ivory border-smoke/20 max-h-[90dvh]">
        <div className="mx-auto w-full max-w-2xl flex flex-col md:flex-row overflow-y-auto no-scrollbar"  style={{ maxHeight: '80dvh' }}>
          {/* Image column */}
          <div className="hidden md:block w-56 flex-shrink-0 m-6">
            <div className="aspect-[3/4] bg-[#EAE5DF] overflow-hidden">
              <img
                src={garment.normalizedAssetUrl}
                alt={garment.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Detail column */}
          <div className="flex-1 flex flex-col">
          <DrawerHeader className="flex justify-between items-center px-6 pt-6 pb-0">
            <DrawerTitle className="font-serif text-xl text-charcoal">{garment.name}</DrawerTitle>
            <DrawerClose asChild>
              <button className="text-smoke/40 hover:text-charcoal transition-colors text-lg leading-none">×</button>
            </DrawerClose>
          </DrawerHeader>

          {/* Details */}
          <div className="px-6 py-6 flex flex-col gap-5">
            {/* Price + colorway */}
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-[0.15em] text-smoke/50">{garment.colorway}</span>
              <span className="font-serif text-2xl" style={{ color: '#B8975A' }}>${garment.price}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-smoke/80 leading-relaxed">{garment.description}</p>

            {/* Fabric + Fit */}
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

            {/* Occasions */}
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

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={handleSelect}
                className="w-full py-4 uppercase tracking-[0.15em] text-sm transition-colors"
                style={{
                  backgroundColor: isSelected ? '#7B1C24' : '#1C1C1C',
                  color: '#F5F0E8',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#7B1C24'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#1C1C1C'; }}
              >
                {isSelected ? 'Selected ✓' : 'Select this piece'}
              </button>
            </div>
          </div>
          </div>{/* end detail column */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
