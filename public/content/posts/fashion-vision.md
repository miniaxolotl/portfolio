---
title: Fashion Vision
description: Extracting the brain from Fitr into its own service. How I learned to run AI locally and why I split a monolith into pieces.
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

## Why I Split It Out

Fitr needed AI features. Heavy ones. Image segmentation. Color extraction. Style classification. Running all of that inside the main API would crush it.

Every wardrobe upload would slow down login. Every outfit recommendation would stall user requests. I decided to build Fashion Vision as a separate micro-service. It handles inference operations so the main server never breaks a sweat.

The idea was simple. One API handles users and data. Another API handles thinking.

## What the Service Actually Does

Fashion Vision looks at a clothing photo and pulls it apart. It segments the image into body parts. Upper body. Lower body. Face. Accessories. It crops the background out so the model sees only the garment. It fixes bad lighting. It extracts colors and clothing types and materials and styles.

The search layer uses RAG and embeddings. Wardrobe items become vectors. When you search for something similar, the system looks by likeness and context. Not keywords. Not tags. Just visual meaning. A red wool coat and a crimson peacoat live close to each other even if no one typed the same words.

I wanted the AI to feel first-class inside Fitr. Not bolted on. Not an afterthought. The decision engine runs on this service. It is the brain behind the outfit recommendations.

![Segmentation output showing body region detection and bounding boxes](/img/projects/fashion-vision/segmentation/segmentation_example_1.png)

## Running AI on a Budget

Cloud ML APIs are expensive. I wanted to keep development and production costs low. So I learned to run models locally.

ROCm on AMD GPUs. CUDA on NVIDIA. Local LLM concepts I had never touched before. I compressed models. I optimized pipelines. I made them run fast enough on hardware I already owned.

Everything executes in the browser or on the local server using Transformers.js with WebGPU acceleration. After warmup there is zero latency. No API costs. Complete privacy.

The pipeline runs in four stages. First segmentation isolates body parts. Then bounding boxes find where clothing lives. A second model isolates the face. Each clothing section gets cropped with a transparent background. A classifier recognizes a denim jacket much better when it sees just the jacket instead of a person in front of a brick wall.

![Segmentation output showing face and skin region isolation](/img/projects/fashion-vision/segmentation/segmentation_example_2.png)

## What I Learned

I assumed the models would be the hard part. They were not. The hard part was all the glue code between them. Validating hat sizes and subtracting masks and merging results with a priority system felt like boring implementation details. But they are what separate a demo that works on perfect photos from something that handles the real world.

Every stage corresponds to something your brain does without effort. The fact that it takes four ML models and seven processing stages to approximate a few hundred milliseconds of human vision is humbling. Building something that works means respecting the mess of real photos instead of trying to clean them up first.

![Segmentation output showing multi-region detection across full body](/img/projects/fashion-vision/segmentation/segmentation_example_3.png)

<div class="flex flex-col sm:flex-row gap-3 my-8">
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/pipeline-stages/body-upper-crop.png" alt="Pipeline debug: upper body crop" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/pipeline-stages/body-upper-mask.png" alt="Pipeline debug: upper body mask extraction" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/pipeline-stages/body-upper-crop-transparent.png" alt="Pipeline debug: upper body crop with transparent background" />
  </span>
</div>

<div class="flex flex-col sm:flex-row gap-4 my-8">
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/segmentation/segmentation_example_1.png" alt="Segmentation output showing body region detection and bounding boxes" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/segmentation/segmentation_example_1-classification.png" alt="Classification output with bounding boxes, garment labels, and confidence scores" />
  </span>
</div>

![Upgraded classification output showing colours, garments, materials, styles, and patterns](/img/projects/fashion-vision/classification/classification_example_1.png)
