import type { Metadata } from "next";
import { BurrowPageClient } from "./BurrowPageClient";

export const metadata: Metadata = {
  title: "Burrow — HTTPS tunnels for localhost | Elias Mawa",
  description:
    "Share local apps, receive webhooks, and inspect requests with Burrow's open-source terminal client.",
  alternates: { canonical: "/burrow" },
};

const BurrowPage = () => <BurrowPageClient />;

export default BurrowPage;
