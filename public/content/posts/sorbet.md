---
title: Sorbet
description: Building a 2D game engine from scratch in C. What I learned about memory, ECS design, and keeping abstractions thin.
year: "2020"
tags:
  - C
  - SDL2
  - Game Engine
gitLink: github.com/miniaxolotl/sorbet
---

## Why I Built It

I wanted to understand how game engines actually work. Not how to use one. How to build one. Unity and Godot are great until you need to know what happens under the hood. So I decided to write my own.

I called it Sorbet. A lightweight 2D engine in C using SDL2. No frameworks. No wrappers. Just C and a window on the screen.

## Building an ECS in C

The hardest part was the entity component system. An ECS sounds simple. Entities are IDs. Components are data. Systems process them. But implementing that in C without pointers chasing each other across memory is a different story.

I used struct-of-arrays layouts instead of array-of-structs. Each component type lives in its own contiguous block. Systems iterate over flat arrays. The CPU cache stays happy. No indirection. No allocation per entity.

Scene management needed a clean lifecycle. Scenes load their resources. They transition with hooks. They unload without leaking memory. I designed a simple state machine so the engine always knows what is active and what is cleaning up.

Input abstraction was another layer. Keyboard and mouse and gamepad all feed into the same event system. The game code does not care where the input came from. It just asks what happened this frame.

<img src="/img/projects/sorbet/sorbet-snake-game-demo.png" alt="Sorbet engine running a snake game demo" />

<img src="/img/projects/sorbet/sorbet-snake-game-demo-2.png" alt="Sorbet engine snake game demo screenshot" />

## What I Learned

Writing an engine teaches you about tradeoffs. Every abstraction costs something. SDL2 gives you windowing and input and rendering for free. But wrapping it in your own API means you own the bugs too.

I learned that C forces you to think about memory from the start. There is no garbage collector to save you. There is no smart pointer to clean up. You allocate. You track. You free. If you forget, the leak shows up eventually.

Sorbet taught me that game engines are not magic. They are just careful organization of data and a tight loop that runs sixty times a second. The best engines are the ones that stay out of your way. Thin abstractions. Fast iteration. Clear ownership.
