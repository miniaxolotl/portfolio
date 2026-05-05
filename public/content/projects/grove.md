---
title: Grove
description: MCP-compatible memory server for AI coding tools. Semantic search, entity graphs, and importance-based recall to solve context window fatigue.
year: "2025"
tags:
  - TypeScript
  - Node.js
  - Qdrant
  - MCP
  - ONNX
gitLink: github.com/miniaxolotl/grove
---

## The Problem

AI coding tools forget everything between sessions. You explain your project architecture, your preferences, your decisions. Then you close the chat and it is all gone. Grove solves this by giving AI tools long-term memory that persists across conversations.

## How It Works

Grove is a self-hosted MCP server. Any compatible client like OpenCode or Cursor connects to it and gains access to memory operations as standard tool calls. You save notes, context, and decisions. The AI retrieves relevant memories when it needs them.

The system combines two storage layers. Qdrant handles semantic vector search, finding relevant memories by meaning rather than keywords. A knowledge graph stores structured information about entities and their relationships. People, projects, concepts, and how they connect.

## Importance-Based Memory

Not all memories are equal. Grove assigns importance scores to each memory based on recency, frequency of access, and explicit user signals. Important facts stay accessible. Noise fades away. This keeps the context window focused on what actually matters.

The compaction system periodically prunes low-importance memories and merges related ones. Storage stays under control without losing critical information. It is the difference between a system that grows bloated over time and one that stays sharp.

## Local Embeddings

Grove runs ONNX embeddings locally. No external API calls, no latency from network requests, no dependency on third-party services. The embedding model loads once and serves all vector operations from the same process.

This matters for a tool that sits between you and your AI assistant. Every millisecond of latency in memory retrieval adds up. Local embeddings keep the round trip fast enough that the AI does not stall waiting for context.

## What I Learned

Grove taught me that memory is not just storage. It is retrieval. A system that stores everything but cannot find the right thing at the right time is useless. The real engineering challenge is designing recall patterns that feel natural to both humans and AI agents.

It also reinforced the value of self-hosted infrastructure. When your memory server runs on your machine, you control the data, the latency, and the reliability. No rate limits, no outages, no privacy concerns.
