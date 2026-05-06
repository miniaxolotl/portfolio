---
title: Grove
description: Building a memory server because existing tools were close but not quite right. What I learned about semantic search and building for my own workflow.
year: "2025"
tags:
  - TypeScript
  - Node.js
  - Qdrant
  - MCP
  - ONNX
gitLink: github.com/miniaxolotl/grove
---

## The Problem I Wanted to Solve

AI coding tools forget everything between sessions. You explain your project architecture and your preferences and your decisions. Then you close the chat and it is all gone. I wanted to explore what it would take to give AI tools long-term memory that persists across conversations. A self-hosted solution with no rate limits and no privacy concerns.

I looked at tools like Supermemory. They were interesting. They solved real problems. But they were not built for my stack. They were not free. They were not self-hosted. I kept bumping into small mismatches that added up to a feeling of friction. So I decided to build my own. Something optimized for exactly what I needed. No more. No less.

Memory is not just storage. It is retrieval. A system that saves everything but cannot find the right thing at the right time is useless. The real challenge was designing recall patterns that feel natural.

## How I Built It

Grove is a self-hosted MCP server. Any compatible client connects to it and gains memory operations as standard tool calls. The system uses two storage layers. Qdrant handles semantic vector search, finding memories by meaning rather than keywords. A knowledge graph stores structured information about entities and their relationships.

Not all memories matter equally. Grove scores each memory based on recency and access frequency and explicit user signals. Important facts stay within reach. Noise fades over time. The compaction system periodically prunes low-importance memories and merges related ones. Storage stays under control without losing critical information.

Grove runs ONNX embeddings locally. No external API calls. No network latency. The embedding model loads once and serves all vector operations from the same process. This keeps the round trip fast enough that the AI does not stall waiting for context.

## What This Exploration Taught Me

I started out thinking I needed separate services for every memory task. What I actually needed was a tight stack with local embeddings and two complementary storage layers. The semantic search and the knowledge graph work together to approximate how human memory associates ideas.

Self-hosted infrastructure gives you something cloud services cannot. Control over data and latency and reliability. When your memory server runs on your machine, you own the entire stack. Grove taught me that memory systems live or die by their retrieval patterns. Storing information is easy. Finding the right piece at the right time is hard.
