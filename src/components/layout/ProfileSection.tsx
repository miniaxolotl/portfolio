"use client";

import Image from "next/image";
import profile from "@/data/profile.json";

interface ProfileSectionProps {
  imageSize?: number;
}

export const ProfileSection = ({ imageSize = 88 }: ProfileSectionProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative mb-4">
      <div className="absolute inset-2 rounded-full bg-accent/10" />
      <Image
        src="/img/masthead/player-front-idle.gif"
        alt=""
        width={imageSize}
        height={imageSize}
        className="relative object-cover rounded-full"
        style={{ width: imageSize, height: imageSize }}
        unoptimized
      />
    </div>
    <h1 className="text-lg font-bold tracking-tight">{profile.name}</h1>
    <p className="text-sm text-muted-foreground font-medium mt-1.5">
      {profile.role}
    </p>
    <p className="text-xs text-muted-foreground/60 mt-0.5">
      {profile.location}
    </p>
  </div>
);
