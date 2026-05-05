---
title: Fitr
description: AI wardrobe intelligence. Computer vision detects clothing, learns your style, and suggests capsule wardrobes with outfit tracking.
year: "2024"
tags:
  - Go
  - Flutter
  - Postgres
  - pgvector
  - Redis
gitLink: github.com/miniaxolotl/fitr
---

## What it does

Fitr is an AI wardrobe intelligence app that uses computer vision to understand your clothing collection. It detects garments from photos, learns your personal style over time, and suggests capsule wardrobes and daily outfits based on weather, occasion, and your preferences.

## Features

Computer vision automatically tags clothing items by type, color, pattern, and style from smartphone photos. Style learning builds a personalized profile from your most-worn pieces and favorite combinations. Capsule wardrobe suggestions help you build a minimal, versatile collection. Outfit tracking logs what you wear each day and surfaces underutilized pieces. Weather integration recommends context-appropriate outfits.

## Challenges

Training a clothing detection model that works across diverse lighting, backgrounds, and camera qualities required extensive data augmentation and edge-case handling. Learning personal style from sparse, biased data meant building recommendation algorithms that explore new combinations without feeling random. Keeping inference fast on mobile devices meant optimizing model size while preserving accuracy.

## Tech stack

Go powers the API, image processing pipelines, and recommendation engine. Flutter builds the cross-platform mobile app. PostgreSQL with pgvector stores clothing embeddings for semantic similarity search. Redis caches user sessions and recommendation results for instant loading.
