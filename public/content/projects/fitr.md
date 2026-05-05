---
title: Fitr
description: Design exploration for an AI-backed personal style engine. Identity-driven wardrobe intelligence with Style DNA analysis, AI stylist chat, computer vision clothing detection, and social fit sharing.
year: "2024"
tags:
  - System Design
  - AI/ML
  - Computer Vision
  - Mobile App Design
  - Go
  - Flutter
  - PostgreSQL
  - pgvector
gitLink: github.com/miniaxolotl/fitr
---

## What it is

Fitr is a design exploration for a personal style engine and identity platform — not just a fashion app, but a system that understands your style, evolves it, and helps you act on it daily. The project documents the architecture, UX flows, and AI integration patterns for an identity-driven wardrobe intelligence platform.

Positioned as "This is you & your DNA" — the core idea is that style is an expression of identity, and an app should understand who you are before suggesting what to wear.

## Core Concepts

### Style DNA

A comprehensive breakdown of the user's style personality — not just color analysis, but a full identity profile with a primary identity, secondary trait, and natural language description. Examples of style labels: "Soft autumn librarian", "Soft power icon", "The off duty rapper", "Tailored and dangerous".

Style DNA tracks most-liked clothing types, top colors, and wearing patterns to build a evolving profile of who the user is stylistically.

### AI Stylist

A named AI assistant ("Celine", "Véra", "Maëlle", "Élan", or "SŌEN") with full context about the user and their wardrobe. Provides daily fit recommendations based on weather, trends, wardrobe inventory, and wearing history. The stylist page — called "Atelier", "Studio", or "Maison" — serves as the engine of the app.

### Inspiration Orbit

A node graph showing similar users and their fits, with a similarity rank and AI-generated explanations for why certain clothing would work well on you. Discovery through visual connections rather than traditional social feeds.

## Planned Pages

| Page           | Purpose                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| Flow / Home    | TikTok-style feed of fits and inspiration (branded like "FYP" or "Pulse")                               |
| Notifications  | Split into activity (interactions, events, sales) and messages (DMs)                                    |
| Drops / Create | Post creation combined with wardrobe management — track purchases, receipts, fabrics, wash instructions |
| Stylist (AI)   | AI chat, daily recommendations, color analysis, similar user suggestions                                |
| Profile        | Public/private wardrobe, posts, saved items. Users can hide whole wardrobe or specific items            |
| Search         | Multi-entity search across posts, users, clothes, brands, and stores with page-specific filters         |

## Additional Features

**Year-End Wrapped** — Spotify Wrapped-style annual style report. Naming options: "Maison: YOU", "The ERA", "The Style Report".

**Style This Album/Photo** — curate outfits to match music albums, songs, or photos. Take a photo of anything (a plant, a building) and get a fit recommendation that matches the aesthetic.

**Style Challenges** — weekly or monthly community challenges. Users submit fits matching a theme or vibe, community votes, winners get featured.

**Wardrobe Management** — extensive clothing tracking: purchase location, receipts, fabrics, wash instructions, wearing history, and item-level privacy controls.

## Architecture (Planned)

The technical architecture centers on computer vision for clothing detection and pgvector for semantic style matching:

- **Go API** — handles image processing pipelines, recommendation engine, and user data
- **Flutter mobile app** — cross-platform iOS/Android client
- **PostgreSQL + pgvector** — stores clothing embeddings for semantic similarity search ("find items similar to this jacket")
- **Redis** — caches user sessions, recommendation results, and Style DNA profiles
- **Computer Vision** — garment detection, color extraction, pattern recognition from smartphone photos

The recommendation engine would combine Style DNA profiles with weather data, trend signals, and collaborative filtering from similar users in the Inspiration Orbit.

## Challenges (Design Phase)

The core design challenge is making style feel personal rather than prescriptive. Style DNA needs to capture nuance — someone might love minimalist aesthetics but occasionally want bold statement pieces. The AI stylist must balance learning from past behavior while suggesting evolution, not repetition.

The Inspiration Orbit raises interesting UX questions: how do you explain to a user why another person's style is similar to theirs? AI-generated descriptions need to be specific and insightful, not generic. The node graph visualization must feel intuitive, not overwhelming.

Privacy is a major consideration — wardrobes are personal. The system needs granular controls: public vs private wardrobe, hide specific items, control who sees your Style DNA profile.

## Tech stack (Planned)

Go for the API and image processing pipelines. Flutter for the mobile app. PostgreSQL with pgvector for clothing embeddings and semantic search. Redis for caching recommendations and sessions. Computer vision models for automatic clothing detection and classification from photos.
