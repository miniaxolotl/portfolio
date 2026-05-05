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

## The Problem

Every developer has needed to show someone their localhost. Ngrok works until it does not. Rate limits, expiring URLs, paid tiers for features that should be free. Burrow started as a simple question. What if tunneling just worked, permanently, without the friction?

## How It Works

Run one command, get a stable HTTPS URL. The server assigns a subdomain, provisions a TLS certificate through Let's Encrypt, and opens a WebSocket tunnel back to your machine. The connection stays alive. The URL does not change.

![Burrow main interface showing active tunnels](/img/projects/burrow/ui_main_1.png)

Under the hood, the protocol multiplexes multiple TCP streams over a single WebSocket connection using yamux. This means you can expose HTTP services, databases, SSH sessions, anything that speaks TCP, through one tunnel. The WebSocket framing was designed to avoid head-of-line blocking, so a slow stream does not stall the others.

![Burrow secondary interface view](/img/projects/burrow/ui_main_2.png)

![Burrow tunnel logs showing real-time connection activity](/img/projects/burrow/ui_logs.png)

Redis tracks active tunnels and persists state across server restarts. If the server goes down and comes back, tunnels reconnect automatically. A token-based auth layer keeps the admin interface locked down for team environments.

![Burrow help screen showing available commands](/img/projects/burrow/ui_help.png)

## The Hard Parts

Building a secure tunneling protocol means getting the framing right. WebSocket messages need to carry stream identifiers, sequence numbers, and flow control signals. All without adding latency. The yamux integration handles most of this, but tuning it for low-latency developer workflows required careful configuration.

Automatic certificate provisioning meant integrating ACME v2 challenge handling with dynamic subdomain generation. Every new tunnel needs a cert, and the cert needs to be valid before the first request hits it. The timing is tight.

## What I Learned

Burrow taught me about the invisible complexity of infrastructure. A tunnel seems simple until you think about what happens when the connection drops, when the certificate expires, when a thousand tunnels are open simultaneously. The engineering is in the edge cases. Reconnection logic, state recovery, graceful degradation.

It also reinforced a lesson about building tools for developers. The best tool is the one you forget you are using. If someone has to think about how Burrow works, I have failed.
