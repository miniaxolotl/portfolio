---
title: Shrymp
description: Original link shortener that evolved into InkByte. REST API with database-driven routing, custom domain support, and a minimal web dashboard.
tags:
  - TypeScript
  - Express.js
  - MongoDB
links:
  - label: Server
    url: github.com/theluckyegg/shrymp-server
  - label: Client
    url: github.com/miniaxolotl/shrymp-web
year: "2020"
---

## What it does

Shrymp was the original link shortener that later evolved into InkByte. It provided a REST API for creating and managing short links, database-driven routing for fast redirects, custom domain support, and a minimal web dashboard for tracking link performance.

## Features

RESTful API for link creation, deletion, and analytics. Database-driven routing keeps redirect lookups fast and cacheable. Custom domain support lets users point their own domains at the service. A minimal web dashboard shows link counts and performance metrics. URL validation and sanitization prevent abuse and malformed links.

## Challenges

Designing a clean API that could later be migrated to a Next.js-based architecture (InkByte) required keeping the data model and routing logic framework-agnostic. Handling custom domains meant managing DNS records and SSL certificates manually without automated provisioning. Analytics aggregation had to be lightweight to avoid slowing down the redirect path.

## Tech stack

Express.js handles the REST API and redirect routing. MongoDB stores links and aggregated analytics. TypeScript provides type safety across the API and dashboard. The web frontend is a minimal single-page app built with vanilla JavaScript and a lightweight CSS framework.
