---
title: InkByte
description: Minimal, fast link shortener with privacy-first analytics. Edge functions for global low-latency, custom branded domains, no tracking pixels.
year: "2021"
tags:
  - TypeScript
  - Next.js
  - PostgreSQL
gitLink: github.com/miniaxolotl/inkbyte
---

## What it does

InkByte is a link shortener built around speed and privacy. It generates short URLs instantly, tracks only anonymous visit counts, and serves redirects from edge functions for sub-50ms response times globally. Custom branded domains let users replace the default short domain with their own.

## Features

Anonymous analytics count visits without cookies, fingerprints, or tracking pixels. Edge function deployment means redirects happen close to the user regardless of geography. Custom domain support with automatic SSL provisioning. A clean dashboard shows link performance without invasive data collection.

## Challenges

Designing analytics without PII meant building aggregation pipelines that work with zero identifiable data. Edge function cold starts had to be minimized to keep redirect latency consistently low. Supporting custom domains required automating DNS validation and certificate provisioning without manual intervention.

## Tech stack

Next.js handles the dashboard and API routes. PostgreSQL stores links and aggregated analytics. Edge functions serve redirects from the closest geographic node. TypeScript is used throughout for type safety across the API, dashboard, and edge layer.
