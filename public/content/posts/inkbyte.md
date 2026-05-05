---
title: InkByte
description: Building a URL shortener that handles millions of redirects. What I learned about routing, databases, and designing for failure.
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

## The Goal

A URL shortener seems simple. Take a long URL, give it a short code, redirect when someone visits. But I wanted to understand what it takes to build one that works at scale. Fast, reliable, with analytics that respect privacy, on custom domains. Not just a demo but something that could handle real traffic.

## The Hard Part

Routing turned out to be much harder than I expected. Every request needs to resolve to its destination and log the click in a few milliseconds. The routing layer sits between users and the internet so it cannot afford to be slow or wrong.

Custom domains broke my initial design. I had assumed a single domain, but users needed their own domains. The routing logic had to become multi-tenant from the ground up. It needed to distinguish between the platform's domain and user-owned domains, then resolve the correct link based on both hostname and path.

<img src="/img/projects/inkbyte/logo.png" alt="InkByte logo - a hand-drawn squid" />

## How I Built It

The API runs on Koa because of its lightweight middleware model. Each request flows through a chain. CORS handling, body parsing, authentication for dashboard routes, then the redirect handler. The redirect itself is a database lookup followed by a 301 or 302 response.

On the server side, nginx handles reverse proxying, TLS termination, and static assets. The frontend renders pages server-side so redirects work before JavaScript loads. A server-side redirect is instant. A client-side redirect requires a fetch, a parse, and a navigation. That extra round trip matters when you are counting milliseconds.

![InkByte login page](/img/projects/inkbyte/login-page.png)

The database uses MySQL managed through Prisma. I made some deliberate choices here. UUIDs for primary keys because auto-incrementing IDs let people enumerate links by guessing sequential numbers. Soft deletes across all models so nothing is truly deleted. This preserves referential integrity and enables audit trails.

Analytics needed session-based deduplication. If the same session clicks the same link multiple times within a window, it increments the counter rather than creating a new record. The difference between "this link was clicked 1,000 times" and "this link was clicked by 1,000 people."

![InkByte main page showing the link shortener interface](/img/projects/inkbyte/main-page.png)

The project is a monorepo with two packages and thirteen shared libraries. The API and frontend share types, components, validation schemas, and utilities. Rollup bundles the shared libraries so both packages import from a single source of truth. Getting the build pipeline right required coordinating TypeScript path aliases and compilation order. A misconfigured dependency graph produces errors that only appear in production.

## What Disrupted My Thinking

I thought routing would be straightforward. It was not. The kind of routing that handles custom domains, multi-tenant setups, and millisecond latency requires rethinking your entire architecture. Database migrations were terrifying. One wrong move and you corrupt data or break existing links.

I also learned to think about systems in terms of failure modes. What happens when the database is slow? What happens when a custom domain DNS is misconfigured? What happens when someone creates a million links in an hour? Designing for these scenarios is what separates a project that works on your laptop from one that works in the world.

## The Takeaway

InkByte was my education in production software. The kind where you learn that "simple" features require rethinking your entire routing layer. That privacy-respecting analytics means collecting enough data to be useful but not enough to be invasive. The best systems are the ones that handle failure gracefully instead of pretending it will not happen.
