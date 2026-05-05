---
title: Grove
description: MCP-compatible memory server for AI coding tools. Solving context window fatigue with semantic search and importance-based recall.
year: "2025"
tags:
  - TypeScript
  - Node.js
  - Qdrant
  - MCP
  - ONNX
gitLink: github.com/miniaxolotl/grove
---

## The Goal

AI coding tools forget everything between sessions. You explain your project architecture, your preferences, your decisions. Then you close the chat and it is all gone. I wanted to give AI tools long-term memory that persists across conversations. A self-hosted solution with no rate limits or privacy concerns.

## The Hard Part

Memory is not just storage. It is retrieval. A system that stores everything but cannot find the right thing at the right time is useless. The real challenge was designing recall patterns that feel natural to both humans and AI agents.

I also needed to keep latency low enough that the AI does not stall waiting for context. Every millisecond of round trip time adds up when you are making multiple memory calls per conversation turn.

## How I Built It

Grove is a self-hosted MCP server. Any compatible client like OpenCode or Cursor connects to it and gains access to memory operations as standard tool calls. You save notes, context, and decisions. The AI retrieves relevant memories when it needs them.

The system combines two storage layers. Qdrant handles semantic vector search, finding relevant memories by meaning rather than keywords. A knowledge graph stores structured information about entities and their relationships. People, projects, concepts, and how they connect.

Not all memories are equal. Grove assigns importance scores to each memory based on recency, frequency of access, and explicit user signals. Important facts stay accessible. Noise fades away. This keeps the context window focused on what actually matters.

The compaction system periodically prunes low-importance memories and merges related ones. Storage stays under control without losing critical information. It is the difference between a system that grows bloated over time and one that stays sharp.

Grove runs ONNX embeddings locally. No external API calls, no latency from network requests, no dependency on third-party services. The embedding model loads once and serves all vector operations from the same process. This matters for a tool that sits between you and your AI assistant. Local embeddings keep the round trip fast enough that the AI does not stall waiting for context.

## What Disrupted My Thinking

I started thinking I needed complex ML models and separate services for different tasks. What I actually needed was better data structures and smarter retrieval patterns. The database itself became the recommendation engine through pgvector and careful schema design.

I also learned that self-hosted infrastructure gives you something cloud services cannot. Control over data, latency, and reliability. No rate limits, no outages, no privacy concerns. When your memory server runs on your machine, you own the entire stack.

## The Takeaway

Grove taught me that memory systems live or die by their retrieval patterns. Storing information is easy. Finding the right piece at the right time is hard. The best systems feel like an extension of your own thinking rather than a separate tool you have to manage.
