---
title: Sorbet
description: Building a 2D game engine from scratch in C. What I learned about ECS design, data structures, and keeping abstractions thin.
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

The Collection acts as the world that owns all entities and systems. It maintains a vector of systems and entities, a hashmap for O(1) system lookup by ID, and a circular queue for entity ID recycling so deleted IDs can be reused. The `collection__link_components()` function automatically maps components to their correct systems via the hashmap.

## Data Structures

Four fundamental data structures, all using `void*` for generic payloads:

**Vector** is a dynamic array that doubles capacity when full. Supports insert, get, remove, and free.

**Hashmap** is an open-addressing hash table built on top of Vector. Uses modulo hashing with linear probing for collision resolution.

**Linked List** is a doubly-linked list with head/tail pointers. Supports push, pop by key, peek, and cycle operations.

**Queue** is a circular buffer queue with front/rear indices. Supports push, pop, and empty/full checks.

## The Game Loop

The core engine runs a fixed framerate timing loop using `SDL_GetTicks()` for delta time calculation. Delta is capped at 3x the target frame interval to prevent physics explosions after tab-switching or pauses. Each frame polls SDL events, runs the ECS collection tick, calls per-entity update and render callbacks, and presents the renderer.

Clean teardown handles SDL subsystems in order: renderer, window, TTF, IMG, then SDL_Quit.

## Snake Demo

The included demo is a complete, playable Snake game built on top of the ECS. A 30x20 grid with 24px cells in a 720x480 window. The snake wraps around edges. Self-collision ends the game. Speed increases as the snake grows. All game state lives on the stack while the ECS holds a pointer to it. A single system with a single entity and component holds all the game logic.

<img src="/img/projects/sorbet/sorbet-snake-game-demo.png" alt="Sorbet engine running a snake game demo" />

<img src="/img/projects/sorbet/sorbet-snake-game-demo-2.png" alt="Sorbet engine snake game demo screenshot" />

## What I Learned

Writing an engine teaches you about tradeoffs. Every abstraction costs something. SDL2 gives you windowing and input and rendering for free. But wrapping it in your own API means you own the bugs too.

I learned that C forces you to think about memory from the start. There is no garbage collector to save you. There is no smart pointer to clean up. You allocate. You track. You free. If you forget, the leak shows up eventually.

Sorbet taught me that game engines are not magic. They are just careful organization of data and a tight loop that runs sixty times a second. The best engines are the ones that stay out of your way. Thin abstractions. Fast iteration. Clear ownership.
