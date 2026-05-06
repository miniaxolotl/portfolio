<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the portfolio site. Here is a summary of what was done:

- **`instrumentation-client.ts`** (new) — Initializes PostHog client-side via the Next.js 15.3+ instrumentation hook. Uses a reverse proxy (`/ingest`) for improved ad-blocker resilience and enables `capture_exceptions` for automatic error tracking.
- **`next.config.ts`** — Added PostHog reverse proxy rewrites (`/ingest/static/*`, `/ingest/array/*`, `/ingest/*`) and `skipTrailingSlashRedirect: true`.
- **`.env.local`** — Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

12 events are now tracked across 8 components:

| Event | Description | File |
|---|---|---|
| `resume_downloaded` | User clicked the Download Resume link | `src/components/layout/ResumeDownloadLink.tsx` |
| `discord_username_copied` | User copied the Discord username | `src/components/layout/DiscordCopyButton.tsx` |
| `social_link_clicked` | User clicked a social link (GitHub, LinkedIn, etc.) | `src/components/layout/SocialLinks.tsx` |
| `theme_toggled` | User toggled the site theme between dark and light | `src/components/layout/Header.tsx` |
| `mobile_nav_opened` | User opened the mobile navigation drawer | `src/components/layout/Header.tsx` |
| `install_command_copied` | User copied an install command from HeroInstall widget | `src/components/project/HeroInstall.tsx` |
| `package_install_command_copied` | User copied an install command from PackageInstall widget | `src/components/project/PackageInstall.tsx` |
| `image_lightbox_opened` | User clicked a zoomable image to open the lightbox | `src/components/project/ImageLightbox.tsx` |
| `project_github_clicked` | User clicked a GitHub link on a project card | `src/components/project/ProjectCard.tsx` |
| `project_read_more_clicked` | User clicked "Read more" on a project card | `src/components/project/ProjectCard.tsx` |
| `project_external_link_clicked` | User clicked an external badge link (npm, Docker Hub, etc.) | `src/components/project/BadgeRow.tsx` |
| `blog_post_viewed` | User viewed a blog/project post page | `src/app/projects/[slug]/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/411570/dashboard/1549446
- **Resume Downloads Over Time:** https://us.posthog.com/project/411570/insights/q6EVQW44
- **Visitor → Project Interest Funnel:** https://us.posthog.com/project/411570/insights/v7Bv1EnH
- **Install Command Copies by Package Manager:** https://us.posthog.com/project/411570/insights/keGJdm3W
- **Social & Contact Engagement:** https://us.posthog.com/project/411570/insights/Cy0p6qZ7
- **Project Engagement — Read More vs GitHub:** https://us.posthog.com/project/411570/insights/JpvJZCsB

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
