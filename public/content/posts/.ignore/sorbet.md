---
title: Sorbet
description: Lightweight 2D game engine written in C with SDL2. Scene management, entity component system, and hardware-accelerated rendering for rapid game prototyping.
tags:
  - C
  - SDL2
  - Game Engine
gitLink: github.com/miniaxolotl/sorbet
year: "2019"
---

## What it does

Sorbet is a lightweight 2D game engine built from scratch in C using SDL2. It provides scene management, an entity component system, and hardware-accelerated rendering — giving developers a foundation for rapid game prototyping without the overhead of a full engine.

## Features

Scene management with transitions and lifecycle hooks keeps game states organized. An entity component system enables flexible, data-driven game object composition. Hardware-accelerated rendering via SDL2's renderer API ensures smooth 2D graphics. Input abstraction handles keyboard, mouse, and gamepad events uniformly. A simple asset loader manages textures, fonts, and audio resources.

## Challenges

Building an ECS from scratch in C required careful memory management and cache-friendly data layouts to avoid pointer chasing. Scene transitions needed a clean lifecycle so resources loaded and unloaded predictably without leaks. SDL2's rendering API had to be wrapped in a way that felt natural while keeping the abstraction thin enough for performance-critical code.

## Tech stack

C drives the entire engine with no external dependencies beyond SDL2. SDL2 handles windowing, input, audio, and hardware-accelerated 2D rendering. The build system uses Make for simplicity and portability across platforms.
