---
title: Fitr
description: A design exploration into identity-driven style. What happens when software tries to understand who you are before telling you what to wear.
year: "2024"
tags:
  - System Design
  - AI/ML
  - Computer Vision
  - Mobile App Design
  - Go
  - Flutter
  - PostgreSQL
  - pgvector
gitLink: github.com/miniaxolotl/fitr
---

## The Question

Style is personal. Fitr started as an attempt to close the gap between who you are and what you wear, using software. What if an app understood your style identity the way a good friend does? Not "you like black", but something closer to "you dress like someone who reads first editions and drinks their coffee too hot."

## Style as Identity

The core concept was Style DNA. A profile built from behavior, not questionnaires. What you save, what you linger on, what you return to. The system learns patterns: color affinities, silhouette preferences, the tension between what someone says they like and what they actually wear.

The design challenge was representing style without reducing it to a label. "Minimalist" erases the days someone wants to be loud. The answer was spectrums over categories. Primary and secondary traits, natural language descriptions that capture mood as much as aesthetic.

<div class="flex flex-col sm:flex-row gap-4 my-8">
  <span class="flex-1">
    <img src="/img/projects/fitr/style-dna.PNG" alt="Style DNA profile showing identity-driven style analysis" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fitr/style-graph.png" alt="Style graph visualization showing identity-driven style profiling" />
  </span>
</div>

## The AI Stylist Problem

Building an AI that recommends clothes is straightforward. Building one that recommends clothes for you is harder. The challenge is context. Weather, occasion, what you wore last week, what you are trying to become.

I explored the idea of a named stylist persona with continuity. Someone who remembers that you hated that jacket and learned from it. The technical question was maintaining context across sessions without building a surveillance apparatus. The answer was embeddings. Converting wardrobe items, preferences, and history into vectors that could be compared semantically. PostgreSQL with pgvector turned the database itself into a recommendation engine.

![Personalized recommendations feed showing AI-curated outfit suggestions](/img/projects/fitr/for-you-page.png)

## Segmentation as Understanding

One of the most interesting threads was how a system sees clothing. When you photograph an outfit, the image is just pixels. For software to understand it, those pixels need to be segmented. Body from background, upper from lower, garment from skin.

The segmentation strategy mirrors human perception. We do not see a shirt. We see a shape against a body against a background, and our brain separates those layers automatically. The fashion vision pipeline processes images through multiple stages. Body detection, face analysis, garment classification. Each one peeling back another layer.

## Local Intelligence

Cloud APIs are convenient, but they come with tradeoffs. Latency, cost, privacy, dependency. Running models locally changes the calculus.

Different inference modes balance speed against quality. A quantized model running on-device gives you an answer in milliseconds. Fast enough to feel like the app is thinking with you rather than at you. The tradeoff is precision, but precision is not always what you need. Sometimes "this looks like a blue jacket" is more useful than a high-dimensional embedding vector.

## Architecture

The backend is built in Go. The database layer uses PostgreSQL with pgvector, so recommendations emerge from how the data is structured rather than requiring a separate ML service. The mobile frontend was designed in Flutter, chosen for its ability to express a visual language consistently across platforms. The design system needed to feel editorial. More magazine than marketplace.

![User profile page showing wardrobe and style identity](/img/projects/fitr/profile-page.png)

## What I Learned

Fitr taught me that the hardest part of building intelligent systems is not the intelligence. It is the framing. How you define the problem determines what kind of solution is possible. The project also revealed how much of AI product design is about restraint. Sometimes the most powerful thing software can do is ask a good question rather than provide a definitive answer.
