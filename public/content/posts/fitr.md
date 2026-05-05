---
title: Fitr
description: A design exploration into identity-driven style. Building an AI that understands who you are before telling you what to wear.
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

## The Goal

Style is personal. I wanted to build an app that understood your style identity the way a good friend does. Not "you like black", but something closer to "you dress like someone who reads first editions and drinks their coffee too hot." The question was whether software could close the gap between who you are and what you wear.

## The Hard Part

Building an AI that recommends clothes is straightforward. Building one that recommends clothes for you is harder. The challenge is context. Weather, occasion, what you wore last week, what you are trying to become. All of this needs to factor into recommendations without turning the app into a surveillance apparatus.

I also struggled with how to represent style without reducing it to a label. "Minimalist" erases the days someone wants to be loud. The system needed to capture mood as much as aesthetic.

<div class="flex flex-col sm:flex-row gap-4 my-8">
  <span class="flex-1">
    <img src="/img/projects/fitr/style-dna.PNG" alt="Style DNA profile showing identity-driven style analysis" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fitr/style-graph.png" alt="Style graph visualization showing identity-driven style profiling" />
  </span>
</div>

## How I Built It

The core concept was Style DNA. A profile built from behavior, not questionnaires. What you save, what you linger on, what you return to. The system learns patterns like color affinities and silhouette preferences. It notices the tension between what someone says they like and what they actually wear.

I settled on spectrums over categories. Primary and secondary traits expressed in natural language descriptions. This captures the fluidity of style better than rigid labels.

For recommendations, I explored the idea of a named stylist persona with continuity. Someone who remembers that you hated that jacket and learned from it. The technical solution was embeddings. Converting wardrobe items, preferences, and history into vectors that could be compared semantically. PostgreSQL with pgvector turned the database itself into a recommendation engine. No separate ML service needed.

![Personalized recommendations feed showing AI-curated outfit suggestions](/img/projects/fitr/for-you-page.png)

One thread I found interesting was how a system sees clothing. When you photograph an outfit, the image is just pixels. For software to understand it, those pixels need to be segmented. Body from background, upper from lower, garment from skin. The segmentation strategy mirrors human perception. We do not see a shirt. We see a shape against a body against a background, and our brain separates those layers automatically.

Cloud APIs are convenient but come with tradeoffs. Latency, cost, privacy, dependency. Running models locally changes the calculus. A quantized model running on-device gives you an answer in milliseconds. Fast enough to feel like the app is thinking with you rather than at you. The tradeoff is precision, but precision is not always what you need. Sometimes "this looks like a blue jacket" is more useful than a high-dimensional embedding vector.

The backend is built in Go. The mobile frontend uses Flutter because it expresses a visual language consistently across platforms. The design system needed to feel editorial. More magazine than marketplace.

![User profile page showing wardrobe and style identity](/img/projects/fitr/profile-page.png)

## What Disrupted My Thinking

Fitr taught me that the hardest part of building intelligent systems is not the intelligence. It is the framing. How you define the problem determines what kind of solution is possible. I started thinking I needed complex ML models. What I actually needed was better data structures and a clearer understanding of what "style" means.

The project also revealed how much of AI product design is about restraint. Sometimes the most powerful thing software can do is ask a good question rather than provide a definitive answer.

## The Takeaway

Building Fitr showed me that understanding users is harder than predicting them. The best systems learn from behavior without demanding explanations. They leave room for people to change their minds and surprise themselves.
