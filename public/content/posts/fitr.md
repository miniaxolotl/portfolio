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

## The Question Behind the Project

Style is personal. I wanted to explore whether software could understand your aesthetic the way a good friend does. Not "you like black" but something closer to "you dress like someone who reads first editions and drinks their coffee too hot."

Building an AI that recommends clothes is easy. Building one that recommends clothes for you is hard. The challenge is context. Weather and occasion and what you wore last week all need to factor in. I also struggled with how to represent style without flattening it. "Minimalist" erases the days someone wants to be loud.

<div class="flex flex-col sm:flex-row gap-4 my-8">
  <span class="flex-1">
    <img src="/img/projects/fitr/style-dna.PNG" alt="Style DNA profile showing identity-driven style analysis" />
  </span>
  <span class="flex-1">
    <img src="/img/projects/fitr/style-graph.png" alt="Style graph visualization showing identity-driven style profiling" />
  </span>
</div>

## How I Explored the Answer

The core idea was Style DNA. A profile built from behavior rather than questionnaires. The system learns patterns like color affinities and silhouette preferences from what you save and linger on and return to. I chose spectrums over categories. Primary and secondary traits written in natural language capture the fluidity of style better than rigid labels.

For recommendations, I explored embeddings. Wardrobe items and preferences become vectors that can be compared by meaning inside PostgreSQL with pgvector. No separate ML service required. I also looked at how a machine sees clothing. A photo is just pixels. For software to understand it, those pixels need to be separated into body from background and upper from lower and garment from skin. The segmentation strategy mirrors human perception.

Running models locally changes the math. A compressed model on-device answers in milliseconds. The tradeoff is precision, but sometimes "this looks like a blue jacket" is more useful than a high-dimensional vector. The backend is Go. The mobile frontend is Flutter. The design system needed to feel editorial. More magazine than marketplace.

![Personalized recommendations feed showing AI-curated outfit suggestions](/img/projects/fitr/for-you-page.png)

## What I Learned About AI and Style

I started this project thinking I needed complex ML models. What I actually needed was better data structures and a clearer idea of what style means. The hardest part of building intelligent systems is not the intelligence. It is the framing.

I also learned how much of AI product design is about restraint. The best systems learn from behavior without demanding explanations. They leave room for people to change their minds and surprise themselves.

![User profile page showing wardrobe and style identity](/img/projects/fitr/profile-page.png)
