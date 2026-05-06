---
title: GoBox
description: Building a file sharing daemon for the local network. Resumable uploads, password-protected links, and a single binary with no dependencies.
year: "2017"
tags:
  - Go
  - JavaScript
gitLink: github.com/celestialstag/gobox-server-v1
---

## The Problem

I kept moving files between computers on the same network. USB drives work but they are slow. Cloud storage works but it uploads to a server somewhere else first. I wanted something that stayed local. Something I could start with one command and forget about.

I decided to build it in Go. The language compiles to a single binary. No runtime to install. No package manager to fight with. Just run the file and it works.

## How It Works

GoBox runs a small HTTP server on your machine. You open the browser, drop files onto the page, and it generates a short link. Anyone on the same network can open that link and download.

The upload page is plain HTML and JavaScript. No framework. No build step. The drag-and-drop zone highlights when you hover a file over it. Once the upload finishes, a share link appears with a copy button.

<img src="/img/projects/gobox/home-page.png" alt="GoBox home page with upload area" />

<img src="/img/projects/gobox/home-page-upload.png" alt="GoBox showing an active file upload" />

## Resumable Uploads

The trickiest part was handling interrupted transfers. A file upload can fail halfway through for any reason. Network drops. Browser crashes. The user closes the tab. Starting over from zero wastes time.

I broke uploads into chunks. Each chunk gets a checksum. When a transfer resumes, the server checks which chunks already arrived and skips them. The client sends the remaining pieces. The file gets reassembled on disk once everything lands.

This meant tracking partial state on the server. Each upload gets a temporary directory. Chunk files sit there until the upload completes. Then they merge into the final file and the temp directory gets cleaned up.

## Password Protection and Expiration

Not every file should be open to anyone on the network. I added optional passwords to share links. The download page asks for the password before serving the file.

Links can also expire. You set a time limit when you upload. After that window passes, the link stops working and the file gets deleted. A background scheduler checks for expired files and removes them. No manual cleanup needed.

<img src="/img/projects/gobox/image-preview.png" alt="GoBox file preview and download page" />

## Keeping It Small

The whole thing ships as one binary. Go embeds the HTML, CSS, and JavaScript directly into the executable at compile time. No separate asset directory. No nginx config. No node_modules folder sitting somewhere.

The frontend is vanilla JavaScript. Just enough code to handle drag-and-drop, show upload progress, and copy share links. The backend handles HTTP routing, file storage, and the cleanup scheduler. Everything stays minimal.

## What I Learned

Building GoBox taught me that the best tools disappear. You should not need to think about how file sharing works. You drop a file, get a link, and move on. The complexity should live inside the binary, not in your workflow.

Go made this possible. The standard library handles HTTP, file I/O, and scheduling without pulling in external packages. The embed feature keeps assets bundled. Cross-compilation means the same code runs on Linux, Mac, or Windows without changes.

I also learned that resumable uploads are harder than they sound. Chunk boundaries need to align. Checksums need to match. Partial state needs to survive server restarts. Getting all of that right took more thinking than the initial upload path.

The project stayed small because I kept cutting features that did not earn their place. No user accounts. No database. No admin panel. Just files, links, and a timer. That restraint is what makes it useful.
