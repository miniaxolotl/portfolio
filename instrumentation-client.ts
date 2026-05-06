import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (!key) {
  // eslint-disable-next-line no-console
  console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY not set, analytics disabled");
} else {
  const uiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: uiHost,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
