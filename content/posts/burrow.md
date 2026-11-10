---
title: Burrow
description: Public HTTPS tunnels for localhost. Building a terminal-first way to share previews, receive webhooks, and see the requests coming through.
year: "2024"
tags:
  - Go
  - WebSocket
  - Redis
  - CLI
gitLink: github.com/miniaxolotl/burrow
---

## The Real Reason

I needed my friends to see Fashion Vision from their own laptops. They were not sitting next to me. Every developer has needed to show someone their localhost. Usually you grab ngrok and move on.

I wanted a tunneling tool that fit my workflow: run a command, share a link, and see what comes through. I also wanted the option to run the server myself.

I also had time and I wanted to learn something. Finding an existing tool felt like skipping the lesson. Building one felt like the point.

## How It Works

Burrow gives a local HTTP app a public HTTPS URL. The CLI connects to `brmbl.dev` by default and creates a private owner credential automatically. No account or manual key setup is required. The public site is [useburrow.app](https://useburrow.app).

```sh
bun add -g @miniaxolotl/burrowctl
burrowctl tunnel 3000
```

Run your app first and use its port. Keep the tunnel client running while you share the link. The terminal manager groups your tunnels and request logs in one place. The published CLI supports macOS and Linux on x64 and ARM64.

## Owning the Tunnel

The Go client and server use a WebSocket transport with multiplexed streams. Redis tracks server-side state. Management operations are owner-scoped: opening a public app URL does not grant access to its tunnel controls or logs.

A shared app is still public at its URL, so application authentication belongs in the app itself. HTTPS protects the public connection; it is not a claim of end-to-end encryption through every hop. Reconnecting an existing tunnel can keep its URL, while a newly created tunnel receives a new one.

Burrow is open source and self-hostable, under Bramble Labs Inc. The [current documentation](https://github.com/miniaxolotl/burrow/blob/HEAD/documentation/server.md) covers running your own server and domain.

## Earlier Terminal Explorations

These screenshots record an earlier version of the terminal UI. The current website shows the latest tunnel-manager workflow and installation commands.

![Burrow main interface showing active tunnels](/img/projects/burrow/ui_main_1.png)

![Burrow secondary interface view](/img/projects/burrow/ui_main_2.png)

![Burrow tunnel logs showing real-time connection activity](/img/projects/burrow/ui_logs.png)

![Burrow help screen showing available commands](/img/projects/burrow/ui_help.png)

## What I Learned About Simple Tools

I thought the hard part would be the WebSocket protocol itself. It was not. The hard part was all the edge cases around it. What happens when the connection drops? When the certificate expires? When a thousand tunnels are open at once?

The engineering lives in reconnection logic and state recovery and graceful degradation. These feel like secondary concerns until they break your entire system. I learned that infrastructure tools need to assume failure will happen and design around it from the start.

The best tool is the one you forget you are using. If someone has to think about how Burrow works, I have failed.
