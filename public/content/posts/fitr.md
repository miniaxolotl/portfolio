---
title: Fitr
description: Building an AI wardrobe app with two friends. What co-founding taught me about Go backends, computer vision, and building something real.
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
gitLink: github.com/FITR-MAE
---

## The Question Behind the Project

Style is personal. I wanted to explore whether software could understand your aesthetic the way a good friend does. Not "you like black" but something closer to "you dress like someone who reads first editions and drinks their coffee too hot."

I am a co-founder of Fitr. Two friends and I are building it together. It is active and ongoing. We are not prototyping for fun. We are trying to build something people actually use. That changes everything. When it is just you, you can rewrite the database on a Tuesday because you feel like it. When two other people depend on the code you wrote yesterday, you think harder.

<div class="flex flex-col sm:flex-row gap-4 my-8">
  <span class="flex-1">
    <img src="/img/projects/fitr/style-dna.png" alt="Style DNA profile showing identity-driven style analysis" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fitr/style-graph.png" alt="Style graph visualization showing identity-driven style profiling" />
  </span>
</div>

## How I Explored the Answer

Building an AI that recommends clothes is easy. Building one that recommends clothes for you is hard. The challenge is context. Weather and occasion and what you wore last week all need to factor in. I also struggled with how to represent style without flattening it. "Minimalist" erases the days someone wants to be loud.

The core idea was Style DNA. A profile built from behavior rather than questionnaires. The system learns patterns like color affinities and silhouette preferences from what you save and linger on and return to. I chose spectrums over categories. Primary and secondary traits written in natural language capture the fluidity of style better than rigid labels.

For recommendations, I explored embeddings. Wardrobe items and preferences become vectors that can be compared by meaning inside PostgreSQL with pgvector. No separate ML service required. A blue blazer and a navy sport coat live near each other in vector space even if no one labeled them similarly.

I also looked at how a machine sees clothing. A photo is just pixels. For software to understand it, those pixels need to be separated into body from background and upper from lower and garment from skin. We built computer vision pipelines that segment clothing from body and background. The model isolates upper body from lower body. It finds accessories. It figures out where the garment ends and the person begins. The segmentation strategy mirrors human perception.

Running models locally changes the math. A compressed model on-device answers in milliseconds. The tradeoff is precision, but sometimes "this looks like a blue jacket" is more useful than a high-dimensional vector.

The backend is Go. I architected the core backend and API layer because the app needs to serve recommendations fast. It needs to handle wardrobe uploads and user sessions and outfit generation without falling over. Go felt right for that. It is fast and the concurrency model is clean.

The mobile frontend is Flutter. The design system needed to feel editorial. More magazine than marketplace.

![Personalized recommendations feed showing AI-curated outfit suggestions](/img/projects/fitr/for-you-page.jpg)

## What I Learned About AI and Style

I started this project thinking I needed complex ML models. What I actually needed was better data structures and a clearer idea of what style means. The hardest part of building intelligent systems is not the intelligence. It is the framing.

I also learned how much of AI product design is about restraint. The best systems learn from behavior without demanding explanations. They leave room for people to change their minds and surprise themselves.

Co-founding taught me that code is only one part of the puzzle. You need to agree on direction. You need to trust each other when the architecture is messy and the deadline is close. A model that works in a notebook is not a product. A backend that serves predictions in ten seconds is not a product. Fitr is still being built. That is the point.

![User profile page showing wardrobe and style identity](/img/projects/fitr/profile-page.jpg)
