import { useState } from "react";
import { GarmentCategory } from "@/data/garments";
import { useOutfitStore } from "@/stores/outfit";

type HotspotDef = {
  category: GarmentCategory;
  label: string;
  // Percentage-based positions on the 2:3 canvas
  top: string;
  height: string;
  left: string;
  width: string;
};

const HOTSPOTS: HotspotDef[] = [
  { category: 'outerwear', label: 'Outerwear',  top: '21%', height: '75%', left: '5%',  width: '90%' },
  { category: 'dress',     label: 'Dress',      top: '22%', height: '74%', left: '10%', width: '80%' },
  { category: 'top',       label: 'Top',        top: '22%', height: '22%', left: '10%', width: '80%' },
  { category: 'bottom',    label: 'Bottom',     top: '42%', height: '54%', left: '15%', width: '70%' },
];

export function HotspotOverlay() {
  const { selectedCategory, setSelectedCategory, currentOutfit } = useOutfitStore();
  const [hoveredCategory, setHoveredCategory] = useState<GarmentCategory | null>(null);

  const activeLayers = currentOutfit.layers;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {HOTSPOTS.map((hotspot) => {
        const hasGarment = !!activeLayers[hotspot.category];
        const isSelected = selectedCategory === hotspot.category;
        const isHovered = hoveredCategory === hotspot.category;
        const showZone = hasGarment || isHovered;

        return (
          <div
            key={hotspot.category}
            className="absolute pointer-events-auto cursor-pointer group"
            style={{
              top: hotspot.top,
              height: hotspot.height,
              left: hotspot.left,
              width: hotspot.width,
            }}
            onClick={() => setSelectedCategory(hotspot.category)}
            onMouseEnter={() => setHoveredCategory(hotspot.category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Hover/active border overlay */}
            <div
              className="absolute inset-0 border transition-all duration-200"
              style={{
                borderColor: isSelected
                  ? 'rgba(123, 28, 36, 0.7)'
                  : showZone
                  ? 'rgba(123, 28, 36, 0.3)'
                  : 'transparent',
                backgroundColor: isHovered && !isSelected
                  ? 'rgba(200, 169, 154, 0.05)'
                  : 'transparent',
              }}
            />

            {/* Category label badge — shows on hover */}
            {isHovered && (
              <div
                className="absolute left-2 top-2 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] font-sans"
                style={{
                  backgroundColor: 'rgba(123, 28, 36, 0.85)',
                  color: '#F5F0E8',
                }}
              >
                {hotspot.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
