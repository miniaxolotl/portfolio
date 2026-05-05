---
title: Burrow
description: Building a tunneling tool that just works. Permanent URLs, secure connections, and the invisible complexity of infrastructure.
year: "2024"
tags:
  - Go
  - WebSocket
  - Redis
gitLink: github.com/miniaxolotl/burrow
---

## The Goal

Every developer has needed to show someone their localhost. Ngrok works until it does not. Rate limits, expiring URLs, paid tiers for features that should be free. I wanted to build a tunneling tool that just worked. Permanent URLs without the friction.

## The Hard Part

Building a secure tunneling protocol means getting the framing right. WebSocket messages need to carry stream identifiers, sequence numbers, and flow control signals. All without adding latency. The yamux integration handles most of this, but tuning it for low-latency developer workflows required careful configuration.

Automatic certificate provisioning was another challenge. Every new tunnel needs a TLS cert from Let's Encrypt, and the cert needs to be valid before the first request hits it. The timing is tight. If the ACME v2 challenge handling fails, the tunnel never opens.

![Burrow main interface showing active tunnels](/img/projects/burrow/ui_main_1.png)

## How I Built It

Run one command and you get a stable HTTPS URL. The server assigns a subdomain, provisions the TLS certificate, and opens a WebSocket tunnel back to your machine. The connection stays alive. The URL does not change.

Under the hood, the protocol multiplexes multiple TCP streams over a single WebSocket connection using yamux. This means you can expose HTTP services, databases, SSH sessions, anything that speaks TCP, through one tunnel. The WebSocket framing avoids head-of-line blocking so a slow stream does not stall the others.

![Burrow secondary interface view](/img/projects/burrow/ui_main_2.png)

![Burrow tunnel logs showing real-time connection activity](/img/projects/burrow/ui_logs.png)

Redis tracks active tunnels and persists state across server restarts. If the server goes down and comes back, tunnels reconnect automatically. A token-based auth layer keeps the admin interface locked down for team environments.

![Burrow help screen showing available commands](/img/projects/burrow/ui_help.png)

## What Disrupted My Thinking

I thought the hard part would be the WebSocket protocol itself. It was not. The hard part was all the edge cases around it. What happens when the connection drops? When the certificate expires? When a thousand tunnels are open simultaneously?

The engineering lives in reconnection logic, state recovery, and graceful degradation. These feel like secondary concerns until they break your entire system. I learned that infrastructure tools need to assume failure will happen and design around it from the start.

## The Takeaway

Burrow taught me about the invisible complexity of infrastructure. A tunnel seems simple until you think about everything that needs to go right for it to work. The best tool is the one you forget you are using. If someone has to think about how Burrow works, I have failed.
