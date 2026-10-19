---
title: Snake Game
description: Arduino-based snake game with joystick input handling, 8x8 NeoPixel LED matrix display, and real-time game loop. Embedded programming project.
tags:
  - C
  - Arduino
  - Embedded
gitLink: github.com/miniaxolotl/snake-game
year: "2022"
---

## Making Lights Move

I wanted to see if I could make a game run on something smaller than a phone. An Arduino board with a grid of LEDs felt like the right starting point. Sixty-four pixels in an eight by eight square. Not much to work with. Just enough.

The idea was simple. A snake moves across the grid. You steer it with a joystick. It eats food and grows. Hit a wall or yourself and it starts over. The kind of game anyone can pick up in a few seconds.

The hardware is straightforward. An Arduino microcontroller. An analog joystick wired to two input pins. An eight by eight NeoPixel matrix for the display. The whole thing fits on a desk. You plug it in and it runs.

## The Game Loop

The game needs to check input, update state, and redraw the screen over and over. On a computer you take this for granted. On an Arduino you have to be careful. The processor is slow. The memory is tight. Every cycle matters.

I used the millis function to control timing. Instead of running as fast as possible, the loop waits for a fixed interval between ticks. Change the interval and you change the speed. The snake moves faster as it grows. The timing stays consistent.

The joystick gives analog readings. I set a threshold so small nudges do not register as input. Push past the threshold and the snake turns. The input module reads the pins and reports a direction. The game module does not care how the direction was detected.

## Drawing on LEDs

The display module maps game state to the LED matrix. Each cell in the game grid corresponds to one pixel on the board. The snake body lights up in one color. The food lights up in another. Everything else stays dark.

Rendering happens every tick. The canvas module clears the grid, draws the snake, draws the food, and pushes the result to the NeoPixel strip. The library handles the low-level timing for the LEDs. I just tell it which pixels should be which color.

When the game ends, all sixty-four LEDs flash red. Then the board resets and a new game starts. No menus. No score screen. Just lights going out and coming back on.

## What Broke and What I Fixed

The first version had a problem with food spawning on top of the snake. The random position generator did not check if the spot was already occupied. I added a loop that checks each candidate position against the snake body. If it overlaps, try again. With a grid this small, collisions are common. The loop rarely needs more than a few tries.

Memory was another constraint. The snake can grow to sixty-four segments. Each segment needs a position stored in memory. I used a fixed-size array instead of dynamic allocation. No malloc, no free. Just a buffer and an index. The Arduino does not have much RAM to spare.

## What I Learned

Building a game on constrained hardware teaches you to be deliberate. You cannot throw abstractions at the problem and hope they fit. You need to know how much memory each array uses. You need to understand how the display library talks to the LEDs. You need to think about what happens when the joystick gives a reading between two directions.

The modular design helped. Input, display, and game logic live in separate files. Each one has a clear job. Changing how the joystick works does not touch the rendering code. Adding a new visual effect does not touch the game rules.

I also learned that simple games are not simple to build. Snake has been implemented a thousand times. But doing it on hardware you can hold in your hand, with pixels you can count on one finger, makes every decision matter.
