import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (!key) {
  // eslint-disable-next-line no-console
  console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY not set, analytics disabled");
} else {
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest",
    ui_host: "https://us.posthog.com",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
