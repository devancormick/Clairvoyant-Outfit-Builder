export type Look = {
  id: string;
  name: string;
  description: string;
  occasion: string;
  occasionLabel: string;
  thumbnail: string;
  garmentIds: string[];
};

export const prebuiltLooks: Look[] = [
  {
    id: 'look_amarante',
    name: 'The Amarante',
    description: 'Our signature corset gown. Structural dominance wrapped in fluid silk.',
    occasion: 'formal',
    occasionLabel: 'Formal',
    thumbnail: '/assets/editorial/lookbook1.png',
    garmentIds: ['drs_corset_gown', 'out_long_wool_coat']
  },
  {
    id: 'look_juliette',
    name: 'The Juliette Night',
    description: 'A dialogue between restraint and exposure.',
    occasion: 'night-out',
    occasionLabel: 'Night Out',
    thumbnail: '/assets/editorial/lookbook2.png',
    garmentIds: ['top_silk_corset', 'bot_mini_skirt']
  },
  {
    id: 'look_seraphine',
    name: 'The Seraphine',
    description: 'Fluidity anchored by architectural precision.',
    occasion: 'evening',
    occasionLabel: 'Evening',
    thumbnail: '/assets/editorial/lookbook1.png',
    garmentIds: ['top_silk_corset', 'bot_maxi_skirt', 'out_long_wool_coat']
  },
  {
    id: 'look_noa',
    name: 'The Noa Day',
    description: 'Uncompromising tailoring for the everyday.',
    occasion: 'daywear',
    occasionLabel: 'Daywear',
    thumbnail: '/assets/editorial/hero.png',
    garmentIds: ['top_cropped_blazer', 'bot_tailored_trouser']
  },
  {
    id: 'look_antoinette',
    name: 'The Antoinette',
    description: 'A study in crimson and shadow.',
    occasion: 'formal',
    occasionLabel: 'Formal',
    thumbnail: '/assets/editorial/lookbook2.png',
    garmentIds: ['top_silk_corset', 'bot_maxi_skirt']
  },
  {
    id: 'look_celine',
    name: 'The Celine Evening',
    description: 'Minimalist elegance with maximum impact.',
    occasion: 'evening',
    occasionLabel: 'Evening',
    thumbnail: '/assets/editorial/lookbook1.png',
    garmentIds: ['drs_slip_gown', 'out_long_wool_coat']
  }
];
