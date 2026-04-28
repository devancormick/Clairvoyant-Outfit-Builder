export type Occasion = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  editorial: string;
  associatedLookIds: string[];
};

export const occasions: Occasion[] = [
  {
    id: 'evening',
    label: 'Evening',
    shortLabel: 'Evening',
    description: 'For the hours when architecture becomes poetry. Garments that hold the weight of occasion.',
    editorial: '/assets/editorial/lookbook1.png',
    associatedLookIds: ['look_seraphine', 'look_celine'],
  },
  {
    id: 'night-out',
    label: 'Night Out',
    shortLabel: 'Night Out',
    description: 'Precision for after dark. A dialogue between restraint and exposure.',
    editorial: '/assets/editorial/lookbook2.png',
    associatedLookIds: ['look_juliette'],
  },
  {
    id: 'daywear',
    label: 'Daywear',
    shortLabel: 'Day',
    description: 'Uncompromising tailoring for the rituals of the everyday.',
    editorial: '/assets/editorial/hero.png',
    associatedLookIds: ['look_noa'],
  },
  {
    id: 'formal',
    label: 'Formal / Gala',
    shortLabel: 'Formal',
    description: 'The architecture of ceremony. Pieces that command a room without effort.',
    editorial: '/assets/editorial/lookbook1.png',
    associatedLookIds: ['look_amarante', 'look_antoinette'],
  },
  {
    id: 'weekend',
    label: 'Weekend',
    shortLabel: 'Weekend',
    description: 'Considered informality. The unhurried version of you, fully dressed.',
    editorial: '/assets/editorial/hero.png',
    associatedLookIds: [],
  },
];
