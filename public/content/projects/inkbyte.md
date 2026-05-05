---
title: InkByte
description: Link management platform with URL shortening, custom domains, QR codes, and geolocation analytics. Monorepo with Koa API, SSR React frontend, MySQL + MongoDB + Meilisearch, and Apple/Google OAuth via Appwrite.
year: "2021"
tags:
  - TypeScript
  - React
  - Koa
  - MySQL
  - Prisma
  - Vite
  - Mantine UI
  - SSR
gitLink: github.com/miniaxolotl/inkbyte
---

## What it does

InkByte is a full-featured link management platform combining URL shortening, QR code generation, link-in-bio pages, and click analytics. Users create short links with custom slugs and branded domains, attach QR codes for offline sharing, and build customizable landing pages. The analytics engine tracks clicks with geographic breakdown, referrer analysis, and device detection — all without invasive tracking methods.

## Architecture

Yarn 3 monorepo with workspaces spanning two packages and thirteen shared libraries:

| Package | Purpose |
|---------|---------|
| `packages/api` | Koa REST API server with WebSocket support |
| `packages/web` | React frontend with SSR (Vite + vite-plugin-ssr) |
| `lib/database` | Prisma client wrapper for MySQL |
| `lib/services` | Business logic layer |
| `lib/components` | Shared React component library |
| `lib/quikk` | HTTP client utility |
| `lib/crypt` | Cryptography utilities |
| `lib/stores` | Valtio reactive state stores |
| `lib/hook-form` | Form handling with Yup validation |
| `lib/schema-validator` | Runtime schema validation |
| `lib/shared` | Shared types and constants |
| `lib/config` | Environment configuration |
| `lib/hooks` | React hooks |
| `lib/data` | Data fetching utilities |
| `lib/utility` | General utilities |

Rollup bundles all shared libraries for consumption by both packages. The web SSR server runs Express (via vite-plugin-ssr) while the API uses Koa.

## Features

### Link Shortening

Custom slugs, branded domains, and CTA overlays that display before redirecting. Links support tags, archiving, and soft deletes. Users bring their own domains or use the default InkByte domain.

### QR Codes

Dynamic QR codes tied to short links — changing the destination URL doesn't require reprinting. Brand color customization and logo embedding. QR scans tracked separately from web clicks.

### Link-in-Bio

Mobile-optimized landing pages aggregating multiple links into a single shareable URL. Theme customization and per-link click tracking.

### Analytics

Click tracking with session-based deduplication. Geographic breakdown by country, city, and region with lat/long coordinates. Referrer analysis, user agent parsing, and time-series data with delta tracking. No cookies, fingerprints, or PII collected.

### Authentication

Role-based access control with granular permissions. Email verification with token-based confirmation. Social authentication via Apple and Google OAuth through Appwrite. Session management with refresh token rotation.

## Database

MySQL with Prisma ORM. Core models: `User` (with social auth tokens), `Role`/`UserRole` (RBAC), `Session`, `Link` (short URLs with CTA fields), `Domain` (custom domains), `LinkLog` (analytics with geographic and referrer data), and `Image` (avatar and QR storage). Full-text search on Prisma for link discovery. Soft deletes across all models.

Meilisearch provides additional full-text search capabilities. MongoDB is used for supplementary data storage.

## Challenges

The multi-tenant domain system required careful routing logic to distinguish between InkByte's default domain and user-owned custom domains at the middleware level. The analytics pipeline needed to aggregate geographic data from IP addresses while maintaining privacy — storing only coarse location data without retaining IPs long-term.

Session-based deduplication in `LinkLog` prevents inflated click counts from repeated visits. The monorepo setup with thirteen shared libraries required configuring Rollup to bundle internal packages so both API and web could import from a single source of truth. TypeScript path aliases and build ordering had to be coordinated across all library packages.

## Tech stack

Koa powers the API with koa-router, koa-body, koa-jwt, and koa-websocket. React 18 with Vite and vite-plugin-ssr for server-side rendering. Mantine UI provides the component library with Emotion for styling. Valtio handles reactive state management. Prisma manages MySQL schema and migrations. Yarn 3 workspaces orchestrate the monorepo with Rollup bundling shared libraries. Appwrite provides social authentication. Docker containers for MariaDB and Meilisearch services.
