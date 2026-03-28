# Workspace

## Overview

pnpm workspace monorepo using TypeScript. This is **Sowma.shop** — an Algerian ecommerce marketplace.

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
- **Frontend**: React + Vite, Tailwind CSS, Zustand, Framer Motion
- **i18n**: Custom i18n context with Arabic (default, RTL), French, English
- **State**: Zustand (cart + favorites)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── sowma-shop/         # React + Vite frontend (at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
│   └── src/seed.ts         # Database seed script
└── pnpm-workspace.yaml
```

## Sowma.shop Features

- **Languages**: Arabic (default, RTL), French, English
- **Theme**: Light/Dark mode toggle
- **Pages**: Home, Products, Categories, Single Category, Single Product, Cart, Checkout, Regions, Sign In/Up
- **Instant Order Form**: On every product page (no checkout required)
- **Database**: PostgreSQL with 58 Algerian wilayas, 20+ cities, 10 categories, 22 products

## Database Schema

- `regions` — 58 Algerian wilayas
- `cities` — major cities per wilaya
- `categories` — 10 product categories (Electronics, Fashion, Home, Sports, Beauty, Books, Food, Auto, Baby, Tools)
- `products` — 22 realistic Algerian marketplace products
- `orders` — customer orders

## API Endpoints

- `GET /api/categories` — all categories with product count
- `GET /api/categories/:id` — single category
- `GET /api/products` — paginated product list (filters: categoryId, search, minPrice, maxPrice, inStock, sort, page, limit)
- `GET /api/products/:id` — single product with specs
- `GET /api/products/:id/related` — related products
- `POST /api/orders` — place an order (instant or checkout)
- `GET /api/regions` — all 58 Algerian wilayas
- `GET /api/regions/:id/cities` — cities for a wilaya

## Seed Data

Run: `pnpm --filter @workspace/scripts run seed`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. Always typecheck from the root:
- `pnpm run typecheck` — builds full dependency graph
