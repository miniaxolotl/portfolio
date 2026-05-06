---
title: Paint OpenGL
description: Building a paint app with modern OpenGL. Layer compositing, brush systems, and learning how GPUs actually render pixels.
year: "2019"
tags:
  - C++
  - OpenGL
  - GLSL
gitLink: github.com/miniaxolotl/paint-opengl
---

## Why I Built It

I wanted to learn modern OpenGL. Not the fixed-function pipeline from the nineties. The real thing. Shaders. Framebuffers. Texture units. The best way to learn is to build something that needs all of it.

A paint app seemed like the right challenge. It needs real-time rendering. It needs layers. It needs brushes that feel responsive. Every stroke goes straight to the GPU. No CPU round-trip.

## The Rendering Pipeline

The core idea was simple. Each layer is a texture. The framebuffer composites them together with blend modes and opacity. When you paint, the brush stamps directly onto the active layer texture. The GPU handles the blending. The CPU just sends the brush parameters.

Brush stamping at high cursor speeds was the hardest part. Move the mouse fast and you get gaps between stamps. I interpolated stroke segments and distributed brush instances along the path. The brush size and hardness and opacity all feed into the GLSL shader. The shader does the actual painting.

Layer compositing required a framebuffer pipeline. Each layer renders to its own texture. A final pass blends them all together in order. Hidden layers skip their render calls entirely. The command pattern handles undo and redo. Every brush stroke is a command that can be replayed or reversed.

ImGui provided the tool panels and property editors. Dockable windows. Color pickers. Layer lists. It is not pretty but it works and it lets me iterate fast.

<img src="/img/projects/paint-opengl/example-1.png" alt="Paint OpenGL canvas showing layer-based editing" />

<img src="/img/projects/paint-opengl/example-2.png" alt="Paint OpenGL interface with brush tools and layers" />

## Flood Fill

One of the more interesting features was flood fill. Click on a region and the algorithm fills it with your chosen color. Implementing this on the GPU meant writing a custom compute shader that could scan pixel connectivity and propagate color changes across the texture.

<video controls autoplay loop muted playsinline>
  <source src="/img/projects/paint-opengl/flood-fill-demo.mp4" type="video/mp4">
</video>

## What I Learned

OpenGL is unforgiving. A missing bind call or a wrong texture unit and your canvas renders black. The state machine model means you always need to know what is currently bound and what the last operation changed.

I learned that GPU memory management matters more than I expected. Large canvases with many layers eat texture memory fast. Texture atlasing and aggressive cleanup of hidden layer data kept things stable.

Paint OpenGL taught me that real-time rendering is about discipline. Every frame has a budget. Every draw call costs something. The best rendering code does the minimum work to get the right pixels on the screen.
