# Project Refinement Tasks

## Scope rules

- Preserve the existing fullscreen 1920×1080 layout.
- Keep the site responsive and non-scrollable on TV screens.
- Use `Nelson` only for family-related text.
- Preserve Disney branding where it appears in the references.
- Direct Disney+ playback and iPhone-to-TV casting are not included.
- External channel or movie redirects require URLs from the client.

## Phase 1 — Branding corrections

- [x] Replace secondary-page resort names with `DISNEY’S BEACH CLUB RESORT`.
- [x] Apply the client-confirmed wood texture to every secondary page’s resort header.
- [x] Replace `The Nelson Family` with `Nelson Family` everywhere.
- [x] Remove incorrect phrases such as `Nelson Beach Club`.
- [x] Preserve `Disney’s` anywhere it belongs to the resort or product name.
- [x] Verify Room 516 remains consistent across all pages.

### Acceptance checks

- [x] No incorrect Coronado Springs or Aulani branding remains in shared headers.
- [x] No family label begins with `The`.
- [x] Resort and family branding are clearly separated.

## Phase 2 — Member logo refinement

- [x] Add `MEMBER` beneath the logo on the welcome loader.
- [x] Add or refine `MEMBER` beneath the logo on the main welcome menu.
- [x] Match the reference’s uppercase lettering, size, spacing, alignment, and color.
- [x] Verify that the logo and label remain transparent without a white background box.

### Acceptance checks

- [x] Both logos use matching MEMBER labels.
- [x] Labels remain readable at 1920×1080.
- [x] Logo blocks do not affect surrounding alignment.

## Phase 3 — Birthday messages

### Waiting for client asset

- [x] Receive the birthday logo/image reference and recreate the cake emblem.

### Implementation

- [x] Use the `America/Chicago` timezone for birthday-date checks.
- [x] On June 28, display `HAPPY BIRTHDAY BRENDA`.
- [x] On January 18, display `HAPPY BIRTHDAY ROGER`.
- [x] On all other dates, display the normal welcome message and `Nelson Family`.
- [x] Change only the requested text/logo content—not the layout or color system.
- [x] Add a safe development override for testing both birthday states.

### Acceptance checks

- [x] Both birthday dates can be tested without changing the computer clock.
- [x] Normal dates restore the default welcome content.
- [x] Date calculations use Illinois time, not the viewer’s device timezone.

## Phase 4 — Cross-page consistency

- [x] Compare header height, padding, typography, and textures across every page.
- [x] Verify the room number and return-home links.
- [x] Verify all menu routes after the project reorganization.
- [ ] Check layouts at 1920×1080.
- [x] Check that no page scrolls.
- [x] Verify keyboard and TV-remote navigation.
- [x] Verify images, videos, music, stylesheets, and scripts load successfully.

## Phase 5 — Optional external navigation

### Waiting for client information

- [x] Receive exact channel destination URLs.
- [x] Receive exact movie or Disney+ destination URLs.

### Implementation

- [x] Make Watch TV channel entries open supplied external pages.
- [x] Make movie cards open supplied external pages.
- [x] Decide whether links should open in the current tab or a new tab.
- [x] Provide a visible fallback when a URL has not been configured.

## Phase 6 — Final delivery

- [ ] Test live Illinois time, date, weather, sunrise, and sunset behavior.
- [ ] Test cached and hardcoded offline weather fallbacks.
- [ ] Test day/night video switching and transitions.
- [ ] Test the background-music start interaction.
- [ ] Run a final broken-link and missing-asset audit.
- [ ] Deploy a Vercel preview.
- [ ] Send the preview to the client for one final review round.
- [ ] Apply agreed final corrections.
- [ ] Deliver the production URL and source repository.

## Explicitly out of scope

- Direct Disney+ video playback inside this website.
- Bypassing Disney+ authentication, subscriptions, or DRM.
- Turning the static Connect My Device screen into an iPhone casting receiver.
- Recreating Google Cast or AirPlay infrastructure.
- Hosting or distributing copyrighted Disney video content without authorization.
