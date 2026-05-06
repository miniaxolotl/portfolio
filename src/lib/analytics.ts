import posthog from "posthog-js";

export const capture = (
  event: string,
  properties?: Record<string, unknown>,
) => {
  posthog.capture(event, properties);
};
