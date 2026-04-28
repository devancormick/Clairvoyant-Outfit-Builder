export type GarmentCategory = 'top' | 'bottom' | 'dress' | 'outerwear';

export type Garment = {
  id: string;
  sku: string;
  name: string;
  category: GarmentCategory;
  subcategory: string;
  price: number;
  colorway: string;
  layerIndex: number;
  normalizedAssetUrl: string;
  thumbnailUrl: string;
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
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/silk_corset.png',
    thumbnailUrl: '/assets/garments/silk_corset.png',
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
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/cropped_blazer.png',
    thumbnailUrl: '/assets/garments/cropped_blazer.png',
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
    layerIndex: 2,
    normalizedAssetUrl: '/assets/garments/bralette.png',
    thumbnailUrl: '/assets/garments/bralette.png',
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
    layerIndex: 1,
    normalizedAssetUrl: '/assets/garments/mini_skirt.png',
    thumbnailUrl: '/assets/garments/mini_skirt.png',
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
    layerIndex: 1,
    normalizedAssetUrl: '/assets/garments/maxi_skirt.png',
    thumbnailUrl: '/assets/garments/maxi_skirt.png',
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
    layerIndex: 1,
    normalizedAssetUrl: '/assets/garments/tailored_trouser.png',
    thumbnailUrl: '/assets/garments/tailored_trouser.png',
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
    layerIndex: 3,
    normalizedAssetUrl: '/assets/garments/slip_gown.png',
    thumbnailUrl: '/assets/garments/slip_gown.png',
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
    layerIndex: 3,
    normalizedAssetUrl: '/assets/garments/corset_gown.png',
    thumbnailUrl: '/assets/garments/corset_gown.png',
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
    layerIndex: 4,
    normalizedAssetUrl: '/assets/garments/long_wool_coat.png',
    thumbnailUrl: '/assets/garments/long_wool_coat.png',
    compatibleWith: ['top', 'bottom', 'dress'],
    mutuallyExclusiveWith: [],
  }
];
