export type GarmentCategory = 'top' | 'bottom' | 'dress' | 'outerwear';

export type ColorVariant = {
  colorway: string;
  assetUrl: string;
};

export type HotspotRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Garment = {
  id: string;
  sku: string;
  name: string;
  category: GarmentCategory;
  subcategory: string;
  price: number;
  colorway: string;
  description: string;
  fabric: string;
  fit: string;
  occasion: string[];
  layerIndex: number;
  normalizedAssetUrl: string;
  normalizedBackAssetUrl?: string;
  thumbnailUrl: string;
  colorVariants?: ColorVariant[];
  hotspotRegion: HotspotRegion;
  compatibleWith: string[];
  mutuallyExclusiveWith: GarmentCategory[];
};

export const garments: Garment[] = [
  // Tops
  {
    id: 'top_silk_corset',
    sku: 'TOP-1001',
    name: 'The Silk Corset',
    category: 'top',
    subcategory: 'corset',
    price: 450,
    colorway: 'Dark Rouge',
    description: 'Architectural boning meets bias-cut silk. This corset commands attention through structure, not volume.',
    fabric: 'Silk charmeuse, steel boning',
    fit: 'True to size. Boning provides inherent structure; size up if between sizes.',
    occasion: ['evening', 'night-out', 'formal'],
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/silk_corset.png',
    thumbnailUrl: '/assets/garments/silk_corset.png',
    hotspotRegion: { x: 10, y: 22, width: 80, height: 22 },
    compatibleWith: ['bottom', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },
  {
    id: 'top_cropped_blazer',
    sku: 'TOP-1002',
    name: 'Sculpted Cropped Blazer',
    category: 'top',
    subcategory: 'blazer',
    price: 890,
    colorway: 'Charcoal',
    description: 'A single-button cropped blazer with sculpted shoulders and a clean, decisive silhouette.',
    fabric: 'Wool-cashmere blend, fully lined in silk',
    fit: 'Structured fit. We recommend sizing up for layering.',
    occasion: ['daywear', 'evening', 'weekend'],
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/cropped_blazer.png',
    thumbnailUrl: '/assets/garments/cropped_blazer.png',
    hotspotRegion: { x: 10, y: 22, width: 80, height: 22 },
    compatibleWith: ['bottom', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },
  {
    id: 'top_bralette',
    sku: 'TOP-1003',
    name: 'Silk Bralette',
    category: 'top',
    subcategory: 'bralette',
    price: 290,
    colorway: 'Black',
    description: 'A refined bralette with adjustable silk straps and a scalloped edge. Worn alone or layered.',
    fabric: '100% silk satin',
    fit: 'Fitted. Size up for a relaxed drape.',
    occasion: ['night-out', 'evening'],
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/bralette.png',
    thumbnailUrl: '/assets/garments/bralette.png',
    hotspotRegion: { x: 15, y: 22, width: 70, height: 20 },
    compatibleWith: ['bottom', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },
  {
    id: 'top_draped_blouse',
    sku: 'TOP-1004',
    name: 'Draped Atelier Blouse',
    category: 'top',
    subcategory: 'blouse',
    price: 380,
    colorway: 'Ivory',
    description: 'A fluid blouse with an asymmetric drape at the neckline. Effortless for day, refined for evening.',
    fabric: 'Silk georgette',
    fit: 'Relaxed. True to size.',
    occasion: ['daywear', 'weekend', 'evening'],
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/draped_blouse.png',
    thumbnailUrl: '/assets/garments/draped_blouse.png',
    hotspotRegion: { x: 10, y: 22, width: 80, height: 22 },
    compatibleWith: ['bottom', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },

  // Bottoms
  {
    id: 'bot_mini_skirt',
    sku: 'BOT-2001',
    name: 'Structured Mini Skirt',
    category: 'bottom',
    subcategory: 'mini_skirt',
    price: 540,
    colorway: 'Charcoal',
    description: 'A high-waisted mini skirt with a pencil silhouette and invisible rear zipper. Precision-cut.',
    fabric: 'Wool crepe',
    fit: 'True to size. High-rise waistband sits at natural waist.',
    occasion: ['night-out', 'evening', 'daywear'],
    layerIndex: 1,
    normalizedAssetUrl: '/assets/garments/mini_skirt.png',
    thumbnailUrl: '/assets/garments/mini_skirt.png',
    hotspotRegion: { x: 15, y: 42, width: 70, height: 28 },
    compatibleWith: ['top', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },
  {
    id: 'bot_maxi_skirt',
    sku: 'BOT-2002',
    name: 'Silk Column Maxi Skirt',
    category: 'bottom',
    subcategory: 'maxi_skirt',
    price: 780,
    colorway: 'Dark Rouge',
    description: 'Floor-length silk with a column silhouette and a whisper of movement. Architectural at rest, fluid in motion.',
    fabric: '100% silk charmeuse',
    fit: 'True to size. Elongates the figure.',
    occasion: ['evening', 'formal'],
    layerIndex: 1,
    normalizedAssetUrl: '/assets/garments/maxi_skirt.png',
    thumbnailUrl: '/assets/garments/maxi_skirt.png',
    hotspotRegion: { x: 15, y: 42, width: 70, height: 54 },
    compatibleWith: ['top', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },
  {
    id: 'bot_tailored_trouser',
    sku: 'BOT-2003',
    name: 'Pleated Tailored Trouser',
    category: 'bottom',
    subcategory: 'trouser',
    price: 850,
    colorway: 'Ivory',
    description: 'Wide-leg pleated trousers with a high rise and a clean break at the ankle. The backbone of the collection.',
    fabric: 'Wool-linen blend',
    fit: 'Wide leg. True to size at waist.',
    occasion: ['daywear', 'weekend', 'evening'],
    layerIndex: 1,
    normalizedAssetUrl: '/assets/garments/tailored_trouser.png',
    thumbnailUrl: '/assets/garments/tailored_trouser.png',
    hotspotRegion: { x: 15, y: 42, width: 70, height: 54 },
    compatibleWith: ['top', 'outerwear'],
    mutuallyExclusiveWith: ['dress'],
  },

  // Dresses
  {
    id: 'drs_slip_gown',
    sku: 'DRS-3001',
    name: 'Bias-Cut Slip Gown',
    category: 'dress',
    subcategory: 'gown',
    price: 1400,
    colorway: 'Black',
    description: 'A bias-cut slip gown that falls through the body like memory. Minimal seaming, maximum effect.',
    fabric: '100% silk charmeuse',
    fit: 'True to size. Cut on the bias for ease of movement.',
    occasion: ['evening', 'formal', 'night-out'],
    layerIndex: 3,
    normalizedAssetUrl: '/assets/garments/slip_gown.png',
    thumbnailUrl: '/assets/garments/slip_gown.png',
    hotspotRegion: { x: 10, y: 22, width: 80, height: 74 },
    compatibleWith: ['outerwear'],
    mutuallyExclusiveWith: ['top', 'bottom'],
  },
  {
    id: 'drs_corset_gown',
    sku: 'DRS-3002',
    name: 'The Amarante Gown',
    category: 'dress',
    subcategory: 'gown',
    price: 2800,
    colorway: 'Dark Rouge',
    description: 'Our signature piece. A structured corset bodice transitions into a fluid silk skirt. Named for the shade of deep crimson that exists between red and night.',
    fabric: 'Silk charmeuse, steel boning, duchess satin lining',
    fit: 'Structured. We recommend professional fitting.',
    occasion: ['formal', 'evening'],
    layerIndex: 3,
    normalizedAssetUrl: '/assets/garments/corset_gown.png',
    thumbnailUrl: '/assets/garments/corset_gown.png',
    hotspotRegion: { x: 10, y: 22, width: 80, height: 74 },
    compatibleWith: ['outerwear'],
    mutuallyExclusiveWith: ['top', 'bottom'],
  },
  {
    id: 'drs_juliette_mini',
    sku: 'DRS-3003',
    name: 'The Juliette Mini',
    category: 'dress',
    subcategory: 'mini_dress',
    price: 1100,
    colorway: 'Charcoal',
    description: 'A structured mini dress with corset detailing and a flared hem. Dialogue between restraint and movement.',
    fabric: 'Silk charmeuse with boning detail',
    fit: 'True to size. Hem falls at mid-thigh.',
    occasion: ['night-out', 'evening'],
    layerIndex: 3,
    normalizedAssetUrl: '/assets/garments/juliette_mini.png',
    thumbnailUrl: '/assets/garments/juliette_mini.png',
    hotspotRegion: { x: 10, y: 22, width: 80, height: 48 },
    compatibleWith: ['outerwear'],
    mutuallyExclusiveWith: ['top', 'bottom'],
  },

  // Outerwear
  {
    id: 'out_long_wool_coat',
    sku: 'OUT-4001',
    name: 'Oversized Wool Overcoat',
    category: 'outerwear',
    subcategory: 'coat',
    price: 1850,
    colorway: 'Charcoal',
    description: 'A floor-length overcoat in double-faced wool. Worn open as a duster or belted for a defined silhouette.',
    fabric: 'Double-faced wool, unlined for drape',
    fit: 'Oversized by design. Size down for a more structured fit.',
    occasion: ['daywear', 'evening', 'weekend'],
    layerIndex: 4,
    normalizedAssetUrl: '/assets/garments/long_wool_coat.png',
    thumbnailUrl: '/assets/garments/long_wool_coat.png',
    hotspotRegion: { x: 5, y: 21, width: 90, height: 75 },
    compatibleWith: ['top', 'bottom', 'dress'],
    mutuallyExclusiveWith: [],
  },
  {
    id: 'out_velvet_blazer',
    sku: 'OUT-4002',
    name: 'Midnight Velvet Blazer',
    category: 'outerwear',
    subcategory: 'blazer',
    price: 1250,
    colorway: 'Midnight',
    description: 'A single-breasted velvet blazer with peak lapels. Transitions seamlessly from atelier to evening.',
    fabric: 'Silk velvet, fully lined',
    fit: 'Tailored fit. True to size.',
    occasion: ['evening', 'night-out', 'formal'],
    layerIndex: 4,
    normalizedAssetUrl: '/assets/garments/velvet_blazer.png',
    thumbnailUrl: '/assets/garments/velvet_blazer.png',
    hotspotRegion: { x: 5, y: 21, width: 90, height: 55 },
    compatibleWith: ['top', 'bottom', 'dress'],
    mutuallyExclusiveWith: [],
  },
];
