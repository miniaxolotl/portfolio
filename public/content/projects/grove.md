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

## What it does

Grove is a self-hosted memory server that gives AI coding tools long-term memory. It combines semantic vector search with knowledge graphs to let AI assistants remember everything about your projects, tasks, and preferences across sessions.

## Features

MCP-compatible architecture works with OpenCode, Cursor, and any MCP client out of the box. Semantic search powered by Qdrant vector database finds relevant memories by meaning, not just keywords. Entity and relation knowledge graphs store structured information about people, projects, and concepts. Importance-based memory management keeps key facts accessible while noise fades away. Optional reranking improves search relevance for complex queries. Fast local ONNX embeddings eliminate external API dependencies.

## Challenges

Designing a memory system that feels natural to AI agents required balancing recall precision with context window limits. Building knowledge graphs from unstructured conversation meant extracting entities and relations reliably without hallucination. Managing vector storage efficiently meant implementing compaction and pruning strategies that preserve important memories while controlling storage growth.

## Tech stack

TypeScript and Node.js power the MCP server, protocol handlers, and embedding pipelines. Qdrant provides vector search and storage. ONNX Runtime runs local embedding models (Xenova/all-MiniLM-L6-v2). The MCP layer, built with fastmcp, exposes memory operations as standard tool calls that any compatible client can invoke.
