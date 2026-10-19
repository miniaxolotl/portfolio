import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const Studio = () => (
  <Card
    variant="filled"
    className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-[1fr_1.8fr]"
  >
    <Image
      src="/img/brands/bramble-banner.webp"
      alt="Bramble Labs botanical sprig artwork"
      width={1200}
      height={628}
      sizes="(min-width: 640px) 320px, 100vw"
      className="h-full max-h-56 w-full object-cover sm:max-h-none"
    />
    <div className="p-6 sm:p-8">
      <p className="section-kicker mb-3">A home for good ideas</p>
      <h3 className="font-serif text-3xl">Growing at Bramble Labs.</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Fern, Grove, and Burrow are part of Bramble Labs Inc. — a home for
        independent software, from shared memories to better developer
        workflows.
      </p>
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium hover:text-accent"
          href="https://bramblelabs.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meet Bramble Labs
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <Link
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          href="/projects/bramble-labs"
        >
          Behind the website
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </Card>
);
