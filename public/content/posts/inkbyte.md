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

## Why I Built It

A URL shortener sounds like a weekend project. I wanted to learn about routing and databases. I did not expect it to become an education in how production software actually works.

The first version worked on my laptop. Then I tried to add custom domains and the floor fell out. I had built everything around one domain. Making it work for any domain meant rebuilding the routing layer from scratch. The server now had to look at both the hostname and the path to decide where to send the user.

<img src="/img/projects/inkbyte/logo.png" alt="InkByte logo - a hand-drawn squid" />

## What I Learned the Hard Way

I chose Koa for the API because it handles requests as a chain of small steps. Each redirect needs to finish in milliseconds because it sits between a user and the rest of the internet. Server-side rendering was a requirement, not a choice. If the browser loads JavaScript before redirecting, that is an extra round trip. Nginx handles the reverse proxy and TLS termination while the frontend renders on the server.

I used MySQL with Prisma and made decisions that felt excessive at the time. Every primary key is a UUID because auto-incrementing IDs let someone guess every link by counting up. Soft deletes across every model preserve relationships and create an audit trail. Session-based analytics deduplicate clicks within the same session. The difference between one thousand clicks and one thousand people matters when you are trying to understand reach without tracking individuals.

![InkByte login page](/img/projects/inkbyte/login-page.png)

The project is a monorepo with two packages and thirteen shared libraries. Rollup bundles shared code so both sides import from the same source. Getting this right meant wrestling with TypeScript path aliases and build order. A bad dependency graph throws errors that only show up in production.

![InkByte main page showing the link shortener interface](/img/projects/inkbyte/main-page.png)

## What Stuck With Me

I thought routing would be easy. It was the hardest part. I thought database migrations were scary. They were. This project taught me to think in failure modes. What happens when the database slows down? When a custom domain DNS record is wrong? When someone creates a million links in an hour?

InkByte was my education in building software that faces the public internet. Simple features are not simple. The best systems do not pretend failure will not happen. They plan for it.
