export type Look = {
  id: string;
  name: string;
  description: string;
  garmentIds: string[];
};

export const prebuiltLooks: Look[] = [
  {
    id: 'look_amarante',
    name: 'The Amarante',
    description: 'Our signature corset gown. Structural dominance wrapped in fluid silk.',
    garmentIds: ['drs_corset_gown', 'out_long_wool_coat']
  },
  {
    id: 'look_juliette',
    name: 'The Juliette Night',
    description: 'A dialogue between restraint and exposure.',
    garmentIds: ['top_silk_corset', 'bot_mini_skirt', 'top_cropped_blazer']
  },
  {
    id: 'look_seraphine',
    name: 'The Seraphine',
    description: 'Fluidity anchored by architectural precision.',
    garmentIds: ['top_silk_corset', 'bot_maxi_skirt', 'out_long_wool_coat']
  },
  {
    id: 'look_noa',
    name: 'The Noa Day',
    description: 'Uncompromising tailoring for the everyday.',
    garmentIds: ['top_cropped_blazer', 'bot_tailored_trouser']
  },
  {
    id: 'look_antoinette',
    name: 'The Antoinette',
    description: 'A study in crimson and shadow.',
    garmentIds: ['top_silk_corset', 'bot_maxi_skirt']
  },
  {
    id: 'look_celine',
    name: 'The Celine Evening',
    description: 'Minimalist elegance with maximum impact.',
    garmentIds: ['drs_slip_gown', 'out_long_wool_coat']
  }
];
