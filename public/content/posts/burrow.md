---
title: Burrow
description: Building a tunneling tool that just works. Permanent URLs, secure connections, and the invisible complexity of infrastructure.
year: "2024"
tags:
  - Go
  - WebSocket
  - Redis
  - Nginx
gitLink: github.com/miniaxolotl/burrow
---

## The Frustration That Started It

Every developer has needed to show someone their localhost. Ngrok works until it does not. Rate limits, expiring URLs, paid tiers for features that should be free. I wanted to build a tunneling tool that just worked. Permanent URLs without the friction.

## How I Built It

Building a secure tunneling protocol means getting the framing right. WebSocket messages need to carry stream identifiers and sequence numbers and flow control signals without adding latency. The yamux integration handles multiplexing, but tuning it for low-latency developer workflows required careful configuration. Automatic certificate provisioning was another challenge. Every new tunnel needs a TLS cert from Let's Encrypt before the first request hits it. If the ACME challenge fails, the tunnel never opens.

Run one command and you get a stable HTTPS URL. The server assigns a subdomain and provisions the TLS certificate and opens a WebSocket tunnel back to your machine. The URL does not change. Under the hood, the protocol multiplexes multiple TCP streams over a single WebSocket. You can expose HTTP services and databases and SSH sessions through one tunnel. The framing avoids head-of-line blocking so a slow stream does not stall the others.

Redis tracks active tunnels and persists state across server restarts. If the server goes down and comes back, tunnels reconnect automatically. A token-based auth layer keeps the admin interface locked down for team environments.

![Burrow main interface showing active tunnels](/img/projects/burrow/ui_main_1.png)

![Burrow secondary interface view](/img/projects/burrow/ui_main_2.png)

![Burrow tunnel logs showing real-time connection activity](/img/projects/burrow/ui_logs.png)

![Burrow help screen showing available commands](/img/projects/burrow/ui_help.png)

## What I Learned About Simple Tools

I thought the hard part would be the WebSocket protocol itself. It was not. The hard part was all the edge cases around it. What happens when the connection drops? When the certificate expires? When a thousand tunnels are open at once?

The engineering lives in reconnection logic and state recovery and graceful degradation. These feel like secondary concerns until they break your entire system. I learned that infrastructure tools need to assume failure will happen and design around it from the start. The best tool is the one you forget you are using. If someone has to think about how Burrow works, I have failed.
