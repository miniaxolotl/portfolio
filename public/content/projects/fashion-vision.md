---
title: Fashion Vision
description: Computer vision microservice for real-time fashion analysis. Four ML models running concurrently in a 7-stage pipeline — classification, body segmentation, face parsing, and background removal — with three inference modes from ~50ms realtime to high-quality deep analysis.
year: "2024"
tags:
  - TypeScript
  - React
  - Hono
  - Transformers.js
  - Computer Vision
  - ONNX
gitLink: github.com/miniaxolotl/fashion-vision
---

## What it does

Fashion Vision is a computer vision microservice that powers Fitr's clothing detection pipeline. It runs four ML models through a 7-stage processing pipeline to analyze fashion images — classifying garments, segmenting body regions, parsing faces for skin tone, and removing backgrounds. The API serves both the inference backend and a real-time webcam demo. Everything runs locally with Transformers.js and ONNX Runtime, no external ML APIs required.

## Architecture

The project is a pnpm monorepo with Turbo orchestration. Two main packages share seven libraries:

| Package           | Purpose                               |
| ----------------- | ------------------------------------- |
| `packages/api`    | Hono inference API server (port 7920) |
| `packages/demo`   | Next.js webcam demo (port 7922)       |
| `lib/inference`   | ML model pipeline (Transformers.js)   |
| `lib/shared`      | Zod schemas, TypeScript types, enums  |
| `lib/database`    | PostgreSQL layer                      |
| `lib/environment` | Environment configuration             |
| `lib/hooks`       | React hooks                           |

Request flow: Hono Route → Controller → Service → Inference Pipeline → ML Models → Response Builder → JSON Response.

## The 7-Stage Pipeline

Each image passes through seven processing stages:

1. **Body Segmentation** — segformer_b2_clothes detects upper/lower body regions and clothing boundaries
2. **Face Crop & Background Removal** — extracts face region, optionally removes background
3. **Face Segmentation** — face-parsing model isolates skin, hair, eyes, mouth regions
4. **Skin Tone Analysis** — Fitzpatrick scale classification (0–5) from segmented skin regions
5. **Body Section Classification** — marqo-fashionSigLIP classifies each body section in parallel (garments, colors, styles, materials, patterns)
6. **Hat & Glasses Detection** — accessory classification for head region
7. **VL Description** — optional vision-language model generates natural language outfit descriptions

All stages are non-fatal — the pipeline always returns partial results even if some models fail.

## Inference Modes

Three modes balance speed against quality:

| Mode       | Precision    | Description                                              |
| ---------- | ------------ | -------------------------------------------------------- |
| `realtime` | Q8 quantized | Continuous polling at ~50ms intervals, lightest models   |
| `fast`     | Mixed        | Balanced speed and quality — default mode                |
| `deep`     | FP16         | Full precision with background removal, highest accuracy |

Models are downloaded on first use from Hugging Face and cached locally in the `models/` directory.

## API

The API exposes two endpoints:

| Endpoint               | Method | Description                                              |
| ---------------------- | ------ | -------------------------------------------------------- |
| `/api/v1/classify`     | POST   | Classify fashion items in an image (multipart/form-data) |
| `/api/v1/health_check` | GET    | Server health and model status                           |

The classify endpoint accepts JPEG, PNG, or WebP images with an optional `mode` query parameter. Response includes per-garment analysis (colors, materials, styles, patterns), body regions with bounding boxes, skin tone, hat/glasses detection, and optional AI-generated descriptions.

## ML Models

| Model                | Purpose                          | Source                      |
| -------------------- | -------------------------------- | --------------------------- |
| marqo-fashionSigLIP  | Zero-shot fashion classification | Marqo/marqo-fashionSigLIP   |
| segformer_b2_clothes | Body segmentation                | Xenova/segformer_b2_clothes |
| face-parsing         | Face/skin region parsing         | Xenova/face-parsing         |
| RMBG-2.0             | Background removal (deep mode)   | briaai/RMBG-2.0             |

## Challenges

Running four ML models concurrently pushed WebGL memory limits and required careful model quantization and scheduling. The pipeline had to handle partial failures gracefully — if body segmentation succeeds but face parsing fails, the response should still include garment classification and skin tone data.

Keeping inference latency low meant optimizing tensor operations and offloading work efficiently to the GPU. Model loading times required progressive loading strategies with caching so the demo felt responsive from the first visit. The monorepo setup with seven shared libraries needed careful TypeScript path alias configuration and build ordering across packages.

## Tech stack

Hono powers the API server running on Bun. Transformers.js loads and runs Hugging Face models via ONNX Runtime Web with WebGL acceleration. Next.js 16 provides the webcam demo frontend. Zod handles runtime validation across the shared type system. Turbo orchestrates the monorepo build pipeline.
