---
title: InkByte
description: A link management platform built from the ground up. Routing, databases, and the architecture of services that handle millions of redirects.
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

## The Simplicity of a Short Link

A URL shortener seems like the simplest possible web service. Take a long URL, assign it a short code, redirect when someone visits. It is the "Hello World" of production software. Which is exactly why it is a good test of whether you actually understand how systems work.

InkByte started as that simple service and grew as I asked better questions. Not just "how do I redirect?" but "how do I redirect well?" Fast, reliably, with analytics that respect privacy, on custom domains, at scale.

<img src="/img/projects/inkbyte/logo.png" alt="InkByte logo - a hand-drawn squid" class="inline-block" />

## Routing

The core challenge is routing. Every request to a short URL needs to be resolved to its destination, logged, and redirected. All in a few milliseconds. The routing layer sits between the user and the internet, which means it cannot afford to be slow or wrong.

The API runs on Koa, chosen for its lightweight middleware model. Each request flows through a chain. CORS handling, body parsing, authentication for dashboard routes, and finally the redirect handler. The redirect itself is a database lookup followed by a 301 or 302 response.

Custom domains add complexity. The routing middleware must distinguish between the platform's own domain and user-owned domains, resolving the correct link based on both hostname and path. The routing logic cannot assume a single domain. It needs to be multi-tenant from the ground up.

On the web server side, nginx handles reverse proxying, TLS termination, and static asset serving. The SSR frontend runs behind it, with vite-plugin-ssr rendering pages server-side so redirects work before JavaScript loads. A server-side redirect is instant. A client-side redirect requires a fetch, a parse, and a navigation.

![InkByte login page](/img/projects/inkbyte/login-page.png)

## Database Design

MySQL is the primary database, managed through Prisma. The schema decisions reflect operational requirements.

UUIDs for primary keys. Auto-incrementing IDs are a security problem in a link service. They let people enumerate and discover links by iterating through sequential numbers.

Soft deletes across all models. Nothing is truly deleted. Links are marked inactive, users are flagged, sessions are expired. This preserves referential integrity and enables audit trails.

Composite keys for analytics. The link log table uses a composite primary key of link ID and session ID, enabling upserts that increment view counts without creating duplicate records.

Full-text search indexes. Prisma's full-text search lets users find links by title, tag, or destination URL without a separate search engine for basic queries. Meilisearch handles the advanced stuff. Fuzzy matching, typo tolerance, faceted filtering.

## Analytics

Tracking clicks sounds simple until you think about what a click actually means. Is it a page load? A redirect? A unique visitor? How do you count without double-counting?

The analytics pipeline captures IP address for deduplication, user agent for device detection, referrer for traffic source analysis, and timestamps for time-series data. Geographic fields exist in the schema but the implementation deliberately stops short of full geo-IP resolution. The principle was to collect enough data to be useful but not enough to be invasive.

Session-based deduplication prevents inflated counts. If the same session clicks the same link multiple times within a window, it increments the counter rather than creating a new record. The difference between "this link was clicked 1,000 times" and "this link was clicked by 1,000 people."

![InkByte main page showing the link shortener interface](/img/projects/inkbyte/main-page.png)

## Monorepo Architecture

The project is a Yarn workspaces monorepo with two packages and thirteen shared libraries. The API and frontend share types, components, validation schemas, and utilities. Duplicating that code would create a maintenance nightmare.

Rollup bundles the shared libraries so both packages import from a single source of truth. The build pipeline coordinates TypeScript path aliases and compilation order across all library packages. A dependency graph that, if misconfigured, produces errors that only appear in production.

## What I Learned

InkByte was my education in production software. The kind where you learn that routing is hard, that database migrations are terrifying, that "simple" features like custom domains require rethinking your entire routing layer.

The project taught me to think about systems in terms of failure modes. What happens when the database is slow? What happens when a custom domain DNS is misconfigured? What happens when someone creates a million links in an hour? Designing for these scenarios is what separates a project that works on your laptop from one that works in the world.
