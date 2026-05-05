---
title: Paint OpenGL
description: Interactive paint application built with modern OpenGL. Layer-based editing, brush system, and real-time rendering.
year: "2017"
tags:
  - C++
  - OpenGL
  - GLSL
gitLink: github.com/miniaxolotl/paint-opengl
---

## What it does

Paint OpenGL is a desktop paint application that uses modern OpenGL for real-time rendering. It supports layer-based editing, a configurable brush system with pressure sensitivity, and immediate visual feedback. The goal was to learn modern GPU rendering while building a usable creative tool.

## Features

Layer-based editing with blend modes and opacity control. A brush system supporting size, hardness, opacity, and color dynamics. Real-time rendering via OpenGL means brushes paint directly to GPU textures with no CPU round-trip. Undo and redo are implemented with a lightweight command pattern. The UI is built with ImGui for rapid iteration.

## Challenges

Implementing layer compositing in OpenGL required designing a framebuffer pipeline that could blend multiple textures efficiently. Brush stamping had to feel responsive at high cursor speeds, which meant interpolating stroke segments and distributing brush instances along the path. Managing GPU memory for large canvases with many layers required texture atlasing and aggressive cleanup of hidden layer data.

## Tech stack

C++ drives the application logic and OpenGL state management. OpenGL 3.3 core profile handles all rendering. GLSL shaders implement layer blending, brush stamping, and post-processing effects. ImGui provides the dockable tool panels and property editors.
