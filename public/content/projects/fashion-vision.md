---
title: Fashion Vision
description: Computer vision microservice powering Fitr's clothing detection. Real-time fashion analysis API and webcam demo with four ML models for classification, body segmentation, face analysis, and background removal.
year: "2024"
tags:
  - TypeScript
  - React
  - Transformers.js
  - Computer Vision
gitLink: github.com/miniaxolotl/fashion-vision
---

## What it does

Fashion Vision is a computer vision microservice that powers Fitr's clothing detection pipeline. It runs multiple ML models directly in the browser to analyze fashion in real time — classifying clothing items, segmenting body regions, analyzing facial attributes, and removing backgrounds from webcam input. Everything happens client-side with no server inference, making it private and instant.

## Features

Four concurrent ML pipelines run in the browser via Transformers.js: fashion classification identifies garment types and styles, body segmentation isolates clothing regions from the background, face analysis extracts attributes, and background removal produces clean cutouts. A live webcam demo shows all four models running simultaneously with minimal latency.

## Challenges

Running four ML models concurrently in the browser pushed WebGL memory limits and required careful model quantization and scheduling. Keeping inference latency low meant optimizing tensor operations and offloading work efficiently to the GPU. Model loading times had to be managed with progressive loading and caching strategies so the demo felt responsive from the first visit.

## Tech stack

React provides the UI and webcam integration. Transformers.js loads and runs the Hugging Face models in the browser via ONNX Runtime Web. TypeScript keeps the model inference pipelines and UI components type-safe. WebGL acceleration is used automatically by the runtime for GPU-backed inference.
