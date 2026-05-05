---
title: Fashion Vision
description: A computer vision pipeline that learns to see clothing the way humans do. Layers of segmentation, classification, and context.
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

## Teaching Machines to See

When you look at a photograph of someone wearing clothes, you do not think about the process. Your brain does the work invisibly. Separating body from background, identifying garments, noting colors and textures, understanding how pieces relate to each other.

Fashion Vision was an attempt to replicate that process in code. Not to build a product, but to understand what it actually takes to teach a machine to look at an image and say something meaningful about what is in it.

## The Pipeline

The system works in stages, each one building on the last.

First, find the body. A segmentation model classifies every pixel into categories. Upper body, lower body, face, hair, accessories. The output is a mask, a grayscale map where brightness corresponds to confidence. From that mask, bounding boxes emerge, defining the regions where clothing actually lives.

![Segmentation output showing body region detection and bounding boxes](/img/projects/fashion-vision/segmentation/segmentation_example_1.png)

Then the face. A second segmentation model isolates skin, hair, eyes, lips. The face region is cropped and analyzed separately, because skin tone is context. It affects which colors work, which contrasts read as intentional. The Fitzpatrick scale classification that emerges is not about categorizing people. It is about understanding the canvas the outfit is displayed on.

![Segmentation output showing face and skin region isolation](/img/projects/fashion-vision/segmentation/segmentation_example_2.png)

## Segmentation Strategies

The body segmentation model recognizes seventeen classes. The challenge is grouping them into something useful. Upper body is not a single class. It is a composite of upper clothes, arms, scarf, and the face region that needs to be subtracted out. Lower body combines legs, shoes, skirts, and pants.

![Segmentation output showing multi-region detection across full body](/img/projects/fashion-vision/segmentation/segmentation_example_3.png)

The strategy was masks and subtraction. The upper body mask includes the face, so the face mask gets subtracted. Hat regions are validated by size. Anything smaller than a threshold is noise, not a hat. This validation layer separates a model that works in theory from one that works on real photographs with bad lighting and cluttered backgrounds.

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

Clothing classification happens on masked crops. Each section is cropped to its bounding box with the background made transparent. A classifier trained to recognize a denim jacket gives a better answer when it sees the jacket on a transparent background than when it sees the jacket on a person standing in front of a brick wall at golden hour.

## Zero-Shot Classification

The classifier uses a SigLIP model pre-trained on fashion data. Instead of predicting from a fixed set of categories, it compares the image against text embeddings of label definitions. "Denim jacket" is not a class ID. It is a vector in the same space as the image, and similarity is measured by cosine distance.

<div class="flex flex-col sm:flex-row gap-4 my-8">
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/segmentation/segmentation_example_1.png" alt="Segmentation output showing body region detection and bounding boxes" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fashion-vision/segmentation/segmentation_example_1-classification.png" alt="Classification output with bounding boxes, garment labels, and confidence scores" />
  </span>
</div>

![Upgraded classification output showing colours, garments, materials, styles, and patterns](/img/projects/fashion-vision/classification/classification_example_1.png)

Adding a new category does not require retraining. It requires a text description. Label definitions include multiple phrases per category, averaged into a single embedding. Categories are classified in parallel. Garments, colors, styles, materials, patterns, occasions. Results are merged with a priority system where upper body classifications take precedence over full-body ones.

## Running Models Locally

Everything runs locally. No cloud APIs, no external ML services. Models load from disk via Transformers.js with WebGPU acceleration. The entire pipeline, four models and seven processing stages, executes in the browser or on a local server.

The tradeoffs are real. Model loading takes time. Memory is limited. WebGL will crash if you are not careful about tensor sizes. But the benefits are significant. Zero latency after warmup, no API costs, complete privacy, and no dependency on anyone else's infrastructure.

Different inference modes balance these tradeoffs. Quantized models run faster with less precision. Full-precision models give better results but take longer. The system chooses based on context.

## What I Learned

Building this pipeline was an education in how much we take for granted about our own perception. Every stage, segmentation, cropping, classification, merging, corresponds to something your brain does without effort. The fact that it takes four ML models and seven processing stages to approximate what happens in a few hundred milliseconds of neural processing is humbling.

It also taught me about the gap between model capability and product usefulness. A model that classifies garments with 90% accuracy is impressive on paper. But the last 10% is where the real engineering lives. Unusual poses, layered clothing, poor lighting. Those edge cases are not bugs. They are the texture of the real world.
