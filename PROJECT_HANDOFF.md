# Resort TV Welcome Screen — Project Handoff

## Purpose

This is a private, family-oriented resort TV welcome-screen project. The client wants to display it on a television at home as entertainment for his children.

The visual direction is based on a Disney Beach Club Resort television welcome screen. It is a personal recreation rather than an official Disney product. The interface should feel like a dedicated resort-TV experience rather than a conventional website.

The current implementation covers only the main welcome/hero screen. The five menu destinations, background-video system, TV-remote navigation, and deployment/device setup will be developed later.

## Technology

- Semantic HTML
- CSS without a framework
- Vanilla JavaScript
- Open-Meteo for live weather
- Google Fonts: Cinzel and Montserrat
- Inline SVG icons using `currentColor`
- Static deployment; no build system is currently required

The project should remain lightweight and easy to deploy to GitHub Pages, Cloudflare Pages, Vercel, or a local web server connected to the television.

## Current files

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
├── PROJECT_HANDOFF.md
└── assets/
    └── beach-club-hero.jpg
```

### File responsibilities

- `index.html`: Main welcome-screen structure and inline SVG artwork.
- `assets/css/styles.css`: Textures, proportions, typography, responsive layouts, and interaction states.
- `assets/js/script.js`: Client configuration, live time/date, weather retrieval, weather icons, and basic menu selection.
- `pages/aulani.html`: Aulani-style resort category menu page linked from Hotel Services.
- `aulani.css`: Aulani page layout, patterned headers, card grid, hover states, and CSS photo placeholders.
- `aulani.js`: Aulani page room-number injection and card active-state behavior.
- `pages/around-the-island.html`: Aulani-style Around the Island category menu linked from Daily ‘Iwa.
- `pages/connect-device.html`: Coronado Springs-style Connect My Device instruction screen linked from Connect My Device.
- `connect-device.css`: Connect screen wood header, blue fabric title bar, device mockups, and instruction panels.
- `connect-device.js`: Connect screen room-number injection.
- `assets/images/beach-club-hero.jpg`: Hero poster/fallback image.
- `assets/media/background-music.mp3`: Welcome-screen-only looping background music.
- `README.md`: Basic local-running, configuration, and deployment notes.

## Client information

The following values have been confirmed:

- Family name: **The Nelson Family**
- Room number: **4565** for now; it may be changed later
- Location: **Morris, Illinois, United States**
- Timezone: **America/Chicago**
- Temperature unit: **Fahrenheit**
- Expected internet connection: Yes, with offline weather fallback required
- Primary target resolution: **1920×1080**
- Intended display: A home television
- Likely input method: TV remote
- Desired presentation: Fullscreen or kiosk-style
- Background audio: Not specified
- Menu destinations: All five should eventually become functional pages

## Current client configuration

The first-screen configuration now uses:

- `The Nelson Family`
- Morris, Illinois coordinates: `41.3573, -88.4212`
- `America/Chicago`
- Fahrenheit
- Room `4565`

Weather now follows a three-stage fallback chain:

1. Fetch current weather from Open-Meteo.
2. If that fails, show the last successful result saved in `localStorage`.
3. If no saved result exists, show the configured static fallback of `72°F` and partly cloudy.

## Main-screen structure

The screen is divided into five horizontal bands.

The welcome screen also contains a hidden looping audio element for ambient background music. Because browser autoplay policies block unmuted audio on initial load, `index.html` now includes a TV-style start overlay. Pressing Select/OK/Enter/Space on a remote/keyboard, or clicking/tapping in a browser, fades the overlay from opacity `1` to `0` and starts the music from that user gesture.

The member/globe emblem in the guest bar and start overlay uses `assets/images/member-logo.jpeg`; the old inline SVG member mark has been removed from `index.html`.

## Aulani menu page

`pages/aulani.html` is the first secondary page. It follows the supplied Aulani TV-menu reference:

- Dark reddish-brown patterned top header.
- Left brand: `AULANI` plus `a Disney Resort & Spa`.
- Right label: `ROOM 516`.
- Gold/yellow patterned section header with a simple A-shaped resort mark and `AT AULANI RESORT`.
- Eight-card resort menu arranged as a 4-column by 2-row grid.
- Card labels sit at the bottom with semicircle icon tabs.
- Default label color is light tan; hover/active state changes to ruby.
- Current card imagery is recreated with CSS gradient placeholders, not final photo assets.

The main welcome screen currently links the Hotel Services tile to `pages/aulani.html`.

`pages/around-the-island.html` reuses the same Aulani visual system and adds the supplied three-card Around the Island menu:

- Excursions
- Golf
- Shopping Around Oahu

Its card photos come from `assets/images/around-the-island/1.png` through `3.png`. The Daily ‘Iwa card links to `pages/around-the-island.html`.

## Connect My Device page

`pages/connect-device.html` recreates the supplied Chromecast/Connect My Device TV reference:

- Warm reddish wood resort header.
- Left label: `Nelson Coronado Springs Resort`.
- Right label: `ROOM 516`.
- Blue fabric title bar with cast icon and `CONNECT MY DEVICE`.
- Main cream instruction area with three numbered steps, pairing code, QR placeholder, help screen badge, and Disney+ casting panel.
- The device image area is recreated as CSS screen/device mockups rather than using copyrighted reference imagery.

The main welcome screen currently links Connect My Device to `pages/connect-device.html`.

### 1. Resort header

- Teal woven-fabric appearance
- Thin gold divider along the bottom
- Left: `Disney’s Beach Club Resort`
- Right: `Room 4565`
- Cinzel is used for the prominent resort name
- Montserrat is used for supporting labels and room information

### 2. Guest and conditions bar

- Walnut/wood appearance
- Left side:
  - Member globe emblem
  - `Welcome Home`
  - Family name
- Right side:
  - Current-weather icon
  - Temperature in Fahrenheit
  - Local time with AM/PM
  - Weekday, month, ordinal date, and year

### 3. Hero visual

- Large central resort photograph
- Uses `object-fit: cover`
- Current image is temporary and was cropped from the user-provided screenshot
- It was not downloaded from an external source
- This area will eventually support a looping background video

### 4. Service navigation

Five navigation options are shown over a sand/parchment texture:

1. Watch TV
2. Disney+ & On Demand
3. Connect My Device
4. Hotel Services
5. Parks & More

The active option is teal; inactive options use dark brown. Clicking an item currently changes its active state. Separate destination screens have not yet been built.

### 5. Footer trim

- Short dark-walnut strip
- Decorative rather than interactive

## Design system

### Colors

```css
--teal: #047989;
--teal-deep: #006b79;
--cream: #f7f1d8;
--walnut: #573318;
--walnut-deep: #351f0f;
--sand: #e5d8ad;
--sand-light: #f3e8c2;
--gold: #b69b38;
--active: #007c92;
--nav-brown: #542b0c;
```

Avoid pure white and black unless technically necessary. Warm cream, wood brown, resort teal, and aged sand create the intended hospitality atmosphere.

### Typography

- Cinzel: Resort display typography
- Montserrat: Guest name, date, time, weather, labels, room number, and navigation

Typography uses responsive `clamp()` values. Preserve the clear TV-scale hierarchy and check legibility from several meters away.

### Textures

The header, information bar, navigation, and footer use layered CSS gradients to approximate woven fabric, walnut, sand tiles, and dark wood. Do not replace these with flat colors unless requested.

## SVG icon status

The icons are inline in `index.html` so they remain sharp at Full HD and 4K sizes.

- **Member emblem:** Mickey-like ears, globe ring, and simplified North/South America shapes. Continents are clipped inside the globe boundary.
- **Watch TV:** Solid display with a pedestal and horizontal base.
- **Disney+ & On Demand:** Mickey-style silhouette with a transparent play-button cutout.
- **Connect My Device:** Screen outline with compact cast/radio waves contained within the icon bounds.
- **Hotel Services:** Layered hotel service bell/cloche.
- **Parks & More:** Castle silhouette.

Continue using `currentColor` so active and hover colors are controlled by CSS. Avoid hardcoded SVG colors.

## Viewport and responsive rules

The page must not scroll. It should always behave like a contained TV interface.

- `html` and `body` are locked to the viewport.
- The main screen uses `100dvh`, with `100vh` as a fallback.
- Page overflow is hidden.
- Grid-row percentages at tablet and phone sizes add up to exactly `100dvh`.
- All five navigation options remain visible on small screens.
- Do not reintroduce vertical or horizontal page scrolling.

The main target remains 1920×1080. Responsive support exists as a safety measure, but desktop/TV fidelity takes priority.

## Current JavaScript behavior

The top of `assets/js/script.js` contains a `CONFIG` object. It controls:

- Latitude
- Longitude
- IANA timezone
- Family name
- Room number
- Weather-refresh interval

### Clock and date

- Uses `Intl.DateTimeFormat`
- Uses the configured timezone rather than the browser’s local timezone
- Displays a 12-hour clock with AM/PM
- Generates ordinal suffixes such as `1st`, `2nd`, `3rd`, and `23rd`
- Updates every 15 seconds

### Weather

- Uses Open-Meteo
- Requests Fahrenheit directly
- Maps Open-Meteo weather codes to inline SVG states
- Supported visual states include clear, partly cloudy, cloudy, fog, rain, storm, and snow
- Refreshes periodically based on the configured interval

### Navigation

- Clicking an option applies the active class
- `aria-current="page"` moves to the selected option
- Current hash links are placeholders rather than completed pages

## Required offline-weather strategy

The client expects an internet connection, but the screen must remain presentable when weather retrieval fails.

Implement the following priority order:

1. Request current weather from Open-Meteo.
2. After a successful response, save a small JSON record in `localStorage` containing:
   - Rounded Fahrenheit temperature
   - Weather code or normalized icon name
   - Timestamp of the successful request
3. If the network request fails, load and display the last successful cached result.
4. If no cached result exists, display configurable hardcoded fallback values.

Suggested fallback:

```js
fallbackTemperature: 72,
fallbackWeather: "partlyCloudy"
```

Do not make the interface collapse or remove the weather icon when offline. Optionally add an unobtrusive offline indicator later, but only if the client wants one.

The time and date do not require internet access and should continue to work from the device clock.

## Background-video system

The hero area now uses two optimized local MP4 loops:

- `assets/media/day-loop-video.optimized.mp4`
- `assets/media/night-loop-video-new.optimized.mp4`

The original larger source files are still present but should not be used for the page:

- `assets/day-loop-video.mp4`
- `assets/night-loop-video.mp4`

Video behavior:

- The video is muted, autoplayed, looped, and uses `playsinline`.
- `assets/images/beach-club-hero.jpg` remains the poster/fallback image.
- The hero uses two stacked video layers and crossfades between day/night.
- During a transition, both videos briefly play; after the fade, the hidden video is paused and unloaded.
- The day/night decision uses Morris, Illinois via `America/Chicago`.
- The preferred switch uses Open-Meteo sunrise/sunset data.
- The daily sun schedule is cached in `localStorage`.
- If sunrise/sunset cannot be loaded, the backup window is `6 AM` to `7 PM` for daytime.
- Night mode also displays a brown resort-update ticker over the bottom of the hero area.
- The ticker message scrolls right-to-left infinitely and uses a generated maintenance date.
- The maintenance date is configurable with `resortUpdateDaysAhead` and is clamped to `1–3` days ahead.

Topics still to decide later:

- Whether transitions between day/night videos should crossfade
- Whether weather should influence the chosen background
- Whether playback should resume at a calculated position after refresh
- Whether video audio should ever be enabled

Recommended starting behavior:

- Autoplay
- Muted
- Looping
- `playsinline`
- Poster-image fallback
- Preserve the current image if video playback fails

Browsers generally block autoplay with sound, so muted autoplay is the reliable default.

## Planned TV-remote support

Treat a TV remote as keyboard-like directional input unless the final device requires a platform-specific integration.

Planned behavior:

- Left/Right arrows move between the five primary menu items
- Enter activates the focused item
- Back or Escape returns to the welcome screen
- Focus should be obvious from a couch-viewing distance
- Focus should wrap from the last option to the first and vice versa
- The currently active item and currently focused item should remain visually distinguishable

When the target hardware/browser is confirmed, test the exact remote key codes rather than assuming all television browsers behave identically.

## Fullscreen and device considerations

A normal website generally cannot enter fullscreen automatically without user interaction. True unattended startup may require device-level kiosk configuration.

Possible deployment devices include:

- Small PC or laptop connected through HDMI
- Raspberry Pi running Chromium kiosk mode
- Fire TV or Android TV browser/wrapper
- Smart TV’s built-in browser

Do not choose a device-specific solution until the client confirms the hardware. The web interface itself should remain platform-neutral where possible.

## Future pages

Each primary menu option will eventually lead to a separate page or screen. Exact functionality has not yet been defined.

Potential architecture:

```text
index.html              Welcome screen
pages/watch-tv.html
pages/on-demand.html
pages/connect.html
pages/hotel-services.html
pages/parks.html
```

Alternatively, the project could remain a single-page interface with separate `<section>` views. Choose after the navigation and transition requirements are known.

For a small static project, separate HTML pages are simple and robust. A single-page state router may be preferable if seamless TV-like transitions and persistent background playback become important.

## Accessibility and interaction expectations

- Keep semantic headings, navigation, links, and time elements.
- Maintain meaningful `aria-label` and `aria-current` attributes.
- Preserve `prefers-reduced-motion` support.
- Ensure text contrast remains readable over textured backgrounds.
- Keep navigation targets large enough for remote control and pointer use.
- Avoid interactions that depend exclusively on hover.

## Deployment direction

The current project can be hosted as static files without a compilation step.

Potential hosts:

- GitHub Pages
- Cloudflare Pages
- Vercel
- Local HTTP server on the television-connected device

Live weather requires the page to be served through HTTP/HTTPS rather than opened as a raw local file in some browser environments. Test Open-Meteo CORS behavior on the final target browser.

## Known legal/asset context

This is intended for private use in the client’s home. The design references Disney resort branding and imagery. It should not be presented as an official Disney service.

The temporary hero photograph came from the supplied screenshot. Replace it with client-provided or appropriately licensed source media when available.

## Development principles

- Preserve the established visual composition.
- Prioritize the 1920×1080 television experience.
- Keep the implementation lightweight and framework-free unless requirements justify a change.
- Keep client-specific values centralized in configuration.
- Avoid scattering family, room, location, or fallback values through the markup.
- Do not change the room number until instructed.
- Do not change the decided day/night video schedule, sound behavior, or final hardware assumptions without client confirmation.
- Use progressive enhancement so a weather or video failure never leaves a broken screen.
- Verify JavaScript syntax and HTML structure after edits.
- Visually test the full 1920×1080 viewport after significant layout changes.

## Recommended next implementation sequence

1. Test online and simulated-offline states in the final target browser.
2. Confirm target TV hardware/browser.
3. Add TV-remote focus navigation.
4. Define and build the five destination screens.
5. Configure deployment and optional kiosk startup.
6. Perform final testing at 1920×1080 on the intended device.

## Questions still open

- What exact hardware and browser will display the project?
- Will the room number remain `4565`?
- What background-video files will be supplied?
- Should backgrounds change with time, weather, or both?
- Should video audio ever be enabled?
- What content belongs on each of the five destination screens?
- Should navigation transitions be animated?
- Should the project remember the last selected screen after restarting?
- Does the family want an obvious offline indicator?
- Will the project run from a public host or a local home-network device?

## Prompt for a future Codex session

When continuing in another Codex account, start with:

> Read `PROJECT_HANDOFF.md`, then inspect `index.html`, `assets/css/styles.css`, and `assets/js/script.js`. Preserve the existing design and full-screen behavior. Before editing, summarize the current implementation and identify which items from the recommended next sequence are already complete. Do not change the room number or make assumptions about the background-video schedule.
