---
title: Paint OpenGL
description: Building a paint app with OpenGL and GLUT. A 32x32 pixel canvas, flood fill, HSV color system, and learning immediate-mode rendering.
year: "2019"
tags:
  - C++
  - OpenGL
  - GLUT
gitLink: github.com/miniaxolotl/paint-opengl
---

## Why I Built It

I wanted to learn OpenGL. The best way to learn is to build something that needs all of it. A paint app seemed like the right challenge. It needs real-time rendering. It needs a color system. It needs tools that feel responsive.

## The Rendering Pipeline

The core idea was a 32x32 pixel grid rendered with OpenGL's fixed-function pipeline. Each pixel is a `CanvasNode` -- a quad drawn with `GL_POLYGON` in normalized device coordinates. The canvas is not a simple 2D array. It is a linked graph where each node holds explicit pointers to its four neighbors (north, south, east, west). This design enables flood fill to traverse via neighbor pointers rather than array indexing.

Double-buffered rendering via `glutSwapBuffers()`. Orthographic projection for the canvas, and a pixel-coordinate projection for UI overlays. A checkerboard background indicates transparency. Alpha blending is enabled throughout.

## Brush System

Two brush types: pixel and flood fill. The pixel brush sets color and visibility on individual nodes. It supports a variable brush size (1-5) via recursive flood-expansion that spreads to neighbors, decreasing size by one each step. A colored circle indicator follows the mouse cursor with a contrast ring for visibility.

## Flood Fill

The bucket tool uses a BFS (breadth-first search) algorithm with `std::queue` and `std::set` for visited tracking. It processes incrementally -- each frame handles a batch of nodes to avoid freezing the UI. A slow mode adds a delay per node for visual animation. Early-exit optimization skips if the replacement color equals the existing color.

<video controls autoplay loop muted playsinline>
  <source src="/img/projects/paint-opengl/flood-fill-demo.mp4" type="video/mp4">
</video>

## Color System

Full HSV color model with 360-degree hue, saturation, and value controls. Multiple selection methods: scroll wheel changes hue (Shift+Scroll for saturation, Ctrl+Scroll for value), a clickable hue spectrum bar at the bottom, and a saturation/value gradient square. HSV-to-RGB conversion implemented from the standard algorithm. A color preview swatch sits in the top-right corner.

## UI and Tools

All UI is hand-drawn with OpenGL immediate mode and GLUT bitmap fonts. No third-party UI library. A top-left info panel shows the current tool, brush size, RGB and HSV values. A help overlay toggles with the `h` key. Tools include pixel brush, flood fill bucket, eraser (right mouse), and full canvas clear.

<img src="/img/projects/paint-opengl/example-1.png" alt="Paint OpenGL canvas showing pixel art" />

<img src="/img/projects/paint-opengl/example-2.png" alt="Paint OpenGL interface with brush tools" />

## What I Learned

OpenGL's fixed-function pipeline is a different world from modern shader-based rendering. `glBegin` and `glEnd` with immediate mode means every vertex is specified directly. The state machine model means you always need to know what is currently bound and what the last operation changed.

I learned that graph-based data structures can be more flexible than arrays for certain problems. The linked grid of CanvasNodes made flood fill traversal natural and enabled the recursive brush expansion.

Paint OpenGL taught me that real-time rendering is about discipline. Every frame has a budget. Every draw call costs something. The best rendering code does the minimum work to get the right pixels on the screen.
