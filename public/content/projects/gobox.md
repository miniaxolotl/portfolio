---
title: GoBox
description: Lightweight file sharing daemon with resumable uploads. Drag-and-drop sharing, password-protected links, configurable expiration on LAN.
year: "2017"
tags:
  - Go
  - JavaScript
gitLink: github.com/celestialstag/gobox-server-v1
---

## What it does

GoBox is a lightweight file sharing daemon built for quick, local-network file transfers. It lets you share files via drag-and-drop, generates short links automatically, and supports password protection and configurable expiration times. The goal was to create a zero-dependency, single-binary solution that just works on any LAN without complex setup.

## Features

Resumable uploads handle interrupted transfers without starting over. Password-protected links ensure only intended recipients can download. Configurable expiration cleans up shared files automatically. A minimal web UI provides drag-and-drop upload and one-click copy for share links. Everything runs from a single binary with no external dependencies.

## Challenges

Building resumable uploads in Go required careful handling of partial file writes and checksum validation across chunks. Managing file cleanup with configurable TTLs meant designing a lightweight scheduler without pulling in a heavy job queue. Keeping the binary small while serving a functional web UI meant embedding assets efficiently and minimizing JavaScript.

## Tech stack

The backend is written in Go, handling HTTP uploads, static file serving, and cleanup scheduling. The frontend is vanilla JavaScript with a minimal drag-and-drop interface. No framework dependencies on either side keeps the deployment footprint tiny.
