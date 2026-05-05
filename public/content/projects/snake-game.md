---
title: Snake Game
description: Arduino-based snake game with microcontroller input handling, LED matrix display, and real-time game loop. Hardware-level embedded programming project.
tags:
  - C
  - Arduino
  - Embedded
gitLink: github.com/miniaxolotl/snake-game
year: "2022"
---

## What it does

A classic snake game running on an Arduino microcontroller. Player input is read from physical buttons, the game state is rendered to an LED matrix display, and the game loop runs in real time on the embedded hardware.

## Features

Real-time game loop with configurable tick rate controls game speed and difficulty. Button input handling with debouncing ensures reliable directional control. LED matrix rendering maps game state to physical display coordinates. Collision detection handles wall boundaries and self-intersection. Score tracking persists across rounds using EEPROM.

## Challenges

Working within the Arduino's limited memory and processing power required careful optimization of the game loop and state representation. LED matrix rendering had to be efficient enough to maintain a smooth frame rate while handling input polling. Button debouncing in software needed tuning to avoid missed inputs or double-registration.

## Tech stack

C is used for the Arduino firmware. The Arduino platform provides the microcontroller, GPIO input handling, and LED matrix control. EEPROM is used for persistent score storage across power cycles.
