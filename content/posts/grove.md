---
title: Grove
description: Private memory across AI agents. Building a focused MCP interface, a searchable library, and a PostgreSQL foundation for context worth keeping.
year: "2025"
tags:
  - TypeScript
  - Node.js
  - PostgreSQL
  - pgvector
  - MCP
  - ONNX
gitLink: github.com/miniaxolotl/grove
---

## The Problem I Wanted to Solve

AI coding tools forget useful context between sessions. You explain your project architecture, your preferences, and your decisions. Then you start a new chat and explain them again. I wanted to give my tools a place to keep the useful parts, with a way to inspect and change what they remember.

I looked at tools like Supermemory. They were interesting. They solved real problems. But they were not built for my stack. They were not free. They were not self-hosted. I kept bumping into small mismatches that added up to a feeling of friction. So I decided to build my own. Something optimized for exactly what I needed. No more. No less.

Memory is not just storage. It is retrieval. A system that saves everything but cannot find the right thing at the right time is useless. The real challenge was designing recall patterns that feel natural.

## Where Grove Is Now

Grove is an open-source memory service from Bramble Labs Inc., available hosted or self-hosted. It connects to OpenCode, Claude Code, Codex, and other compatible MCP clients. The [current website](https://usegrove.cloud) includes account access, an installation guide, and an interactive explanation of the workflow.

The early version used Qdrant and a separate knowledge-graph model. The current architecture uses **PostgreSQL, full-text search, and pgvector**. Both the website and agents go through the authenticated API. Account-owned rows and database row-level security enforce the ownership boundary.

## Four Tools, a Clear Lifecycle

The agent interface is deliberately small: `remember`, `recall`, `memories`, and `forget`. Save a confirmed decision, a preference, a useful fact, a verified solution, or a bounded task handoff. Then retrieve a relevant subset when the next task needs it.

Durable memories remain until you change or delete them. Handoffs have an expiry. Archiving is reversible and removes a memory from recall; permanent deletion has a different meaning. The library makes those choices visible, with search, editing, and revision history.

Local embeddings support semantic retrieval, while lexical search remains available during indexing. This is server-side search over private account data, not end-to-end encryption. Named connections can be scoped and revoked.

## Try the Current Version

Install the client and connect it to hosted Grove:

```sh
bun add -g @miniaxolotl/grove
grove init --client opencode --url https://api.usegrove.cloud
grove status --client opencode --json
```

Complete browser sign-in and approve the connection. Use `--client claude` or `--client codex` for those agents, or substitute your own API origin for self-hosting. The [installation guide](https://usegrove.cloud/install) covers the current setup.

## What I Keep Coming Back To

Memory is not just storage. It is ownership, lifecycle, and retrieval. Keeping every detail is less useful than being able to find the right decision, understand where it belongs, and correct it when the project changes. That is the direction Grove has grown in.
