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

## What it does

A classic snake game running on an Arduino microcontroller. Player input is read from an analog joystick, the game state is rendered to an 8x8 NeoPixel LED matrix, and the game loop runs in real time on the embedded hardware.

## Features

Real-time game loop using `millis()` with a configurable tick interval controls game speed. Analog joystick input handling with threshold-based direction detection. LED matrix rendering via Adafruit_NeoMatrix maps game state to physical display coordinates. Collision detection handles wall boundaries and self-intersection. Food spawns randomly with collision avoidance against the snake body. Snake grows when food is eaten, capped at 64 segments (the full grid). Game over flashes all LEDs red before auto-reset.

## Challenges

Working within the Arduino's limited memory and processing power required careful optimization of the game loop and state representation. LED matrix rendering had to be efficient enough to maintain a smooth frame rate while handling input polling. The modular design separates canvas (display), joystick (input), and game logic into distinct modules with header/implementation pairs.

## Tech stack

C is used for the Arduino firmware. The Arduino platform provides the microcontroller, GPIO input handling, and LED matrix control. Adafruit_NeoPixel and Adafruit_NeoMatrix libraries drive the 8x8 NeoPixel display. An analog joystick on pins A2/A3 provides directional input.
