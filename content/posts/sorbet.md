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

## Starting from Nothing

I wanted to know what happens under the hood of a game engine. Not how to use one. How one is built. Unity and Godot are great tools. But they hide everything. I wanted to see the gears.

So I wrote my own. A lightweight 2D engine in C with SDL2. No frameworks. No wrappers. Just C code and a window on the screen.

I called it Sorbet. The name does not matter much. The learning did.

## Organizing Entities and Components

The hardest part was the entity component system. The idea sounds clean. Entities are identifiers. Components hold data. Systems process them. But implementing that in C without pointers chasing each other across memory takes thought.

I laid out each component type in its own contiguous block of memory. Systems iterate over flat arrays. The CPU cache stays happy. No jumping between scattered allocations. No indirection.

The Collection owns everything. It holds a vector of systems and a vector of entities. A hashmap gives fast lookup of systems by ID. A circular queue recycles entity IDs when things get deleted so old identifiers can be reused. When a component gets attached to an entity, the Collection figures out which system should handle it. No manual wiring.

## Building the Pieces

I needed basic data structures before anything else. C does not give you these for free.

A vector that grows when full. A hashmap built on top of that vector using linear probing. A doubly linked list with head and tail pointers. A circular buffer queue with front and rear indices. All of them use void pointers so they can carry any type of data.

Writing these from scratch taught me why standard libraries exist. Every edge case needs handling. What happens when the vector doubles and the old memory gets freed. What happens when the hashmap fills up and collisions pile up. What happens when the queue wraps around the buffer boundary.

## The Loop That Runs Everything

The engine runs a fixed framerate loop. SDL tracks the time between frames. I cap the delta at three times the target interval so the game does not explode after you switch tabs and come back.

Each frame polls events, ticks the ECS, calls update and render callbacks on each entity, and presents the frame. Clean teardown shuts down SDL subsystems in order. Renderer first. Window next. Then the image and font libraries. Finally SDL itself.

## The Snake Demo

The demo is a complete Snake game built on the ECS. A thirty by twenty grid with cells at twenty-four pixels each. The snake wraps around the edges. Hitting yourself ends the game. The speed climbs as the snake grows.

All the game state lives on the stack. The ECS holds a pointer to it. A single system with a single entity and component runs the entire game. The ECS overhead is minimal because the design stays thin.

<img src="/img/projects/sorbet/sorbet-snake-game-demo.png" alt="Sorbet engine running a snake game demo" />

<img src="/img/projects/sorbet/sorbet-snake-game-demo-2.png" alt="Sorbet engine snake game demo screenshot" />

## What I Learned

Writing an engine teaches you about tradeoffs. SDL2 gives you windowing and input and rendering. But wrapping it in your own API means you own the bugs too.

C forces you to think about memory from the start. There is no garbage collector. There is no smart pointer. You allocate. You track. You free. If you forget, the leak shows up eventually.

Sorbet taught me that game engines are not magic. They are careful organization of data and a tight loop that runs sixty times a second. The best engines stay out of your way. Thin abstractions. Fast iteration. Clear ownership.
