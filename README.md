# Resort TV Experience

A fullscreen resort television interface built with static HTML, CSS, and JavaScript. It includes a time-aware welcome screen, weather, day/night video loops, background music, and several TV-style menu pages.

## Project structure

```text
.
├── index.html                 # Main welcome screen and deployment entry point
├── pages/                     # Secondary TV screens
├── assets/
│   ├── css/                   # Page stylesheets
│   ├── js/                    # Page scripts and configuration
│   ├── images/                # Textures, logos, posters, and card artwork
│   └── media/                 # Background music and optimized videos
├── vercel.json                # Vercel static-hosting configuration
└── PROJECT_HANDOFF.md         # Detailed project context
```

## Pages

- `/index.html` — welcome screen
- `/pages/watch-tv.html` — dynamic television guide
- `/pages/disney-on-demand.html` — on-demand poster library
- `/pages/connect-device.html` — device-casting instructions
- `/pages/aulani.html` — resort services menu
- `/pages/around-the-island.html` — island activities menu
- `/pages/parks-and-more.html` — parks and destinations

## Run locally

Serve the project over HTTP so weather requests, media, and browser behavior match production:

```powershell
cd "C:\Users\Leonyx\Documents\Disney Project"
npx serve .
```

Then open the localhost URL printed in the terminal.

## Configuration

The main configuration is at the top of `assets/js/script.js`. It controls:

- Morris, Illinois coordinates and `America/Chicago` timezone
- Fahrenheit weather and offline fallback values
- Nelson family and room information
- Weather refresh and caching
- Day/night video sources and fallback switching hours

Each secondary page has a small configuration file in `assets/js/` containing its room number.

### Birthday-message testing

The welcome screen automatically uses Illinois dates for annual birthday messages. They can be previewed without changing the device clock:

- `/?celebration=brenda`
- `/?celebration=roger`
- `/?celebration=default`

## Media behavior

The welcome screen uses:

- `assets/media/day-loop-video.optimized.mp4`
- `assets/media/night-loop-video-new.optimized.mp4`
- `assets/media/background-music.mp3`

The start overlay provides the user interaction required by browsers before unmuted audio can play. Day/night switching prefers live sunrise and sunset data and falls back to configured local hours when the internet is unavailable.

## Deploy to Vercel

This is a static site and needs no build command.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Choose **Other** as the framework preset.
4. Leave Build Command and Output Directory empty.
5. Deploy.

Vercel will use `index.html` as the entry point and `vercel.json` for clean URLs and security headers.
