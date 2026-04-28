# Clairvoyant Outfit Builder

A luxury fashion e-commerce platform featuring an interactive outfit builder that allows users to compose, save, and share layered outfits.

## Project Overview

Clairvoyant Outfit Builder is a monorepo project built with pnpm workspaces, featuring:
- A React/Vite frontend for the luxury fashion brand website and interactive outfit builder
- An Express 5 API server (currently minimal, with potential for expansion)
- A mockup sandbox for testing and development

The core feature is the interactive outfit builder where users can:
- Layer garments (tops, bottoms, dresses, outerwear) over a base model
- Switch between front and back views
- Save and share looks via URL parameters
- Filter garments by occasion
- See compatible items and complete-the-look suggestions
- Add composed looks to their "atelier bag" (shopping cart)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend framework**: React + Vite
- **Routing**: wouter
- **Animations**: framer-motion
- **State management**: Zustand (with localStorage persistence)
- **Data fetching**: TanStack Query
- **Styling**: Tailwind CSS
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (planned)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Features

### Outfit Builder
- Layered PNG composition over a base model
- Category tabs (Tops/Bottoms/Dresses/Outerwear)
- Swatch panel with garment thumbnails and details
- Mutual exclusivity logic (dress excludes top+bottom)
- Front/back toggle (back view placeholder)
- Editorial look loader
- Opacity cross-fades for smooth transitions
- Hotspot overlay for interactive garment areas
- Reset outfit functionality
- Share looks via URL parameters
- Add looks to atelier bag (cart)

### Garment Catalog
- Structured garment data with SKUs, pricing, descriptions
- Color variants and thumbnails
- Occasion-based filtering (evening, formal, daywear, etc.)
- LayerIndex for proper z-order stacking
- Compatible and mutually exclusive category definitions
- Hotspot regions for interactive areas

### UI/UX
- Luxury brand aesthetic with custom color tokens (Rouge, Petal, Ivory, Charcoal, Smoke, Gold)
- Cormorant Garamond + Jost typography
- Responsive design
- Toast notifications for user feedback
- Drawer panels for garment details and confirmation
- Loading states and error handling

## Getting Started

### Prerequisites
- Node.js v24
- pnpm

### Installation
```bash
pnpm install
```

### Development
```bash
# Start API server
pnpm --filter @workspace/api-server run dev

# Start frontend (Clairvoyant)
pnpm --filter @workspace/clairvoyant run dev

# Start mockup sandbox
pnpm --filter @workspace/mockup-sandbox run dev
```

### Commands
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Project Structure
```
Clairvoyant-Outfit-Builder/
├── .gitignore
├── pnpm-lock.yaml
├── replit.md
├── README.md
├── artifacts/
│   ├── clairvoyant/          # Main frontend application
│   │   ├── src/
│   │   │   ├── data/         # Garment and look data
│   │   │   ├── pages/        # Route components
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── stores/       # Zustand stores
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   │   └── App.tsx       # Root application component
│   ├── api-server/           # Express 5 API server
│   │   ├── src/
│   │   │   ├── routes/       # API route handlers
│   │   │   ├── lib/          # Utilities and middleware
│   │   │   └── app.ts        # Express application setup
│   └── mockup-sandbox/       # Development sandbox for testing
```

## Data Models

### Garment
```typescript
{
  id: string;
  sku: string;
  name: string;
  category: 'top' | 'bottom' | 'dress' | 'outerwear';
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
  colorVariants?: { colorway: string; assetUrl: string }[];
  hotspotRegion: { x: number; y: number; width: number; height: number };
  compatibleWith: string[]; // Compatible garment IDs
  mutuallyExclusiveWith: GarmentCategory[]; // Categories that cannot be worn together
}
```

### Outfit State (Zustand Store)
```typescript
{
  layers: Record<'top' | 'bottom' | 'dress' | 'outerwear', Garment | null>;
  selectedCategory: 'top' | 'bottom' | 'dress' | 'outerwear';
  viewMode: 'front' | 'back';
  occasionFilter: string | null;
  // ... methods for updating state
}
```

## Future Enhancements
- Backend API integration for persistent user accounts and look saving
- Payment processing integration (Stripe)
- Admin dashboard for managing garment catalog
- User authentication and profile management
- Enhanced back view with actual garment assets
- Size recommendation system
- Lookbook and editorial content management
- Email marketing integration
- SEO optimization

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is proprietary and confidential. All rights reserved.

## Contact
Devan McCormick - [Portfolio](https://devanmccormick.base44.app) | [GitHub](https://github.com/devancormick)

Project Link: [https://github.com/devancormick/Clairvoyant-Outfit-Builder](https://github.com/devancormick/Clairvoyant-Outfit-Builder)
Live: [https://clairvoyant.ddns.net](https://clairvoyant.ddns.net)