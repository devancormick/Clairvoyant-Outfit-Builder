# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Clairvoyant (`artifacts/clairvoyant`, previewPath `/`)
Luxury fashion brand website with an interactive layered Outfit Builder as the centerpiece.
- **Stack**: React + Vite, wouter (routing), framer-motion, zustand (with localStorage persist), TanStack Query, Tailwind.
- **Pages**: `/` (home/hero), `/builder` (outfit canvas), `/shop`, `/lookbook`, `/about`.
- **Builder**: layered PNG composition over a base model, category tabs (Tops/Bottoms/Dresses/Outerwear), swatch panel, mutual exclusivity (dress excludes top+bottom), front/back toggle, editorial look loader, opacity cross-fades.
- **Brand tokens**: Rouge `#7B1C24`, Petal `#C8A99A`, Ivory `#F5F0E8`, Charcoal `#1C1C1C`, Smoke `#2E2E2E`, Gold `#B8975A`. Cormorant Garamond + Jost.
- **Assets**: stored under `artifacts/clairvoyant/public/assets/{garments,model,editorial}/` and referenced as root-relative `/assets/...` paths.
- **Data**: garment catalog in `src/data/garments.ts`, editorial looks in `src/data/looks.ts`. Frontend-only — no backend.
