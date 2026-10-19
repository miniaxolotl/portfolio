---
title: Fitr
description: Co-founding a digital wardrobe and personal AI stylist with Adam and Mason. Building around real clothes, individual taste, and the work of making an idea into a product.
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

**Current status:** Fitr is in development for iOS and Android. [fitr.ca](https://fitr.ca) is live, with an [early-access waitlist](https://fitr.ca/waitlist). It is operated by **Fitr Technologies Inc.**, independently of Bramble Labs.

Style is personal. I wanted to explore whether software could understand your aesthetic the way a good friend does. Not "you like black" but something closer to "you dress like someone who reads first editions and drinks their coffee too hot."

I am a co-founder of Fitr. Adam, Mason, and I are building it together, sharing development, content, marketing, and business work. The product brings together a digital wardrobe, SŌEN — an AI stylist working with clothes you own — and a place for style inspiration. It is active and ongoing. When two other people depend on the code you wrote yesterday, you think harder.

The images below are earlier product and interface explorations. The live website reflects the current identity and public availability.

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

The practical question is how to turn a clothing photo into useful wardrobe information. Model size, inference cost, and the quality of the result all affect whether that workflow feels usable.

The backend is Go. I architected the core backend and API layer because the app needs to serve recommendations fast. It needs to handle wardrobe uploads and user sessions and outfit generation without falling over. Go felt right for that. It is fast and the concurrency model is clean.

The mobile frontend is Flutter. The design system needed to feel editorial. More magazine than marketplace.

![Personalized recommendations feed showing AI-curated outfit suggestions](/img/projects/fitr/for-you-page.jpg)

## What I Learned About AI and Style

I started this project thinking I needed complex ML models. What I actually needed was better data structures and a clearer idea of what style means. The hardest part of building intelligent systems is not the intelligence. It is the framing.

I also learned how much of AI product design is about restraint. The best systems learn from behavior without demanding explanations. They leave room for people to change their minds and surprise themselves.

Co-founding taught me that code is only one part of the puzzle. You need to agree on direction. You need to trust each other when the architecture is messy and the deadline is close. A model that works in a notebook is not a product. A backend that serves predictions in ten seconds is not a product. Fitr is still being built. That is the point.

![User profile page showing wardrobe and style identity](/img/projects/fitr/profile-page.jpg)
