---
title: Burrow
description: Open-source tunneling tool for permanent, secure URLs. HTTPS subdomains, TCP tunnels, and WebSocket multiplexing. No ngrok limits or pro fees.
year: "2024"
tags:
  - Go
  - WebSocket
  - Redis
gitLink: github.com/miniaxolotl/burrow
---

## What it does

Burrow is an open-source tunneling tool that gives you stable, HTTPS-accessible URLs for your local development environment. No more unreliable free tiers or expensive subscriptions — just run one command and share your localhost with the world.

## Features

HTTPS subdomains with automatic certificate management via Let's Encrypt. TCP tunnel support for databases, SSH, and non-HTTP services. WebSocket multiplexing for efficient bandwidth and low latency. Redis-backed tunnel tracking with persistence across restarts. Token-based admin authentication for team environments. Cross-platform TUI client with real-time log viewing.

## Challenges

Building a secure tunneling protocol required designing WebSocket framing that could multiplex multiple TCP streams without head-of-line blocking. Automatic certificate provisioning meant integrating ACME v2 challenge handling with dynamic subdomain generation. Keeping latency low across geographically distributed clients required connection pooling and intelligent routing through the closest relay node.

## Tech stack

Go drives the server (burrowd), CLI client (burrowctl), and WebSocket protocol layer. Redis tracks active tunnels and persists state across server restarts. yamux provides the underlying stream multiplexing. Let's Encrypt integration handles automatic TLS certificate issuance and renewal.
