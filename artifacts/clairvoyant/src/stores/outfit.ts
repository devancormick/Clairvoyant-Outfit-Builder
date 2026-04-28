import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GarmentCategory, Garment, garments } from "../data/garments";

const DRESS_EXCLUDES: GarmentCategory[] = ["top", "bottom"];
const TOP_EXCLUDES: GarmentCategory[] = ["dress"];
const BOTTOM_EXCLUDES: GarmentCategory[] = ["dress"];

type OutfitLayers = Partial<Record<GarmentCategory, Garment>>;

type OutfitBuilderState = {
  currentOutfit: {
    id: string;
    layers: OutfitLayers;
  };
  selectedCategory: GarmentCategory;
  viewMode: "front" | "back";
  occasionFilter: string | null;

  setLayer: (category: GarmentCategory, garment: Garment) => void;
  clearLayer: (category: GarmentCategory) => void;
  resetOutfit: () => void;
  setSelectedCategory: (cat: GarmentCategory) => void;
  setViewMode: (mode: "front" | "back") => void;
  setOccasionFilter: (occasion: string | null) => void;
  loadLook: (garmentIds: string[]) => void;
  loadLookFromUrl: (param: string) => void;
  getShareableParam: () => string;
};

export const useOutfitStore = create(
  persist<OutfitBuilderState>(
    (set, get) => ({
      currentOutfit: { id: crypto.randomUUID(), layers: {} },
      selectedCategory: "top",
      viewMode: "front",
      occasionFilter: null,

      setLayer: (category, garment) => set((state) => {
        const exclusions = category === "dress" ? DRESS_EXCLUDES
                         : category === "top"   ? TOP_EXCLUDES
                         : category === "bottom" ? BOTTOM_EXCLUDES
                         : [];

        const clearedLayers = Object.fromEntries(
          Object.entries(state.currentOutfit.layers)
            .filter(([key]) => !exclusions.includes(key as GarmentCategory))
        ) as OutfitLayers;

        return {
          currentOutfit: {
            ...state.currentOutfit,
            layers: { ...clearedLayers, [category]: garment }
          }
        };
      }),

      clearLayer: (category) => set((state) => {
        const layers = { ...state.currentOutfit.layers };
        delete layers[category];
        return { currentOutfit: { ...state.currentOutfit, layers } };
      }),

      resetOutfit: () => set({ currentOutfit: { id: crypto.randomUUID(), layers: {} } }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setOccasionFilter: (occasion) => set({ occasionFilter: occasion }),

      loadLook: (garmentIds) => set(() => {
        const lookGarments = garmentIds
          .map(id => garments.find(g => g.id === id))
          .filter((g): g is Garment => g !== undefined);

        const layers: OutfitLayers = {};
        lookGarments.forEach(g => {
          layers[g.category] = g;
        });

        return {
          currentOutfit: {
            id: crypto.randomUUID(),
            layers
          }
        };
      }),

      loadLookFromUrl: (param) => {
        try {
          const decoded = atob(param);
          const ids = decoded.split(',').filter(Boolean);
          get().loadLook(ids);
        } catch {
          // Invalid param — silently ignore
        }
      },

      getShareableParam: () => {
        const layers = get().currentOutfit.layers;
        const ids = Object.values(layers)
          .filter((g): g is Garment => g !== undefined)
          .map(g => g.id)
          .join(',');
        return ids ? btoa(ids) : '';
      },
    }),
    { name: "clairvoyant-outfit" }
  )
);
