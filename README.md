# Disney Beach Club Resort TV Experience

This project is a fullscreen resort television interface created for the Nelson family. It displays a personalized welcome screen, Illinois time and weather, day/night background video, music, a TV guide, Disney On Demand links, resort information, and parks information.

The project uses plain HTML, CSS, and JavaScript. There is no build process, project dependency installation, database, account, or hosting service required.

## Quick start

### Requirements

- Windows, macOS, or Linux
- A current version of Google Chrome, Microsoft Edge, Firefox, or Safari
- Node.js and npm (recommended), or Python 3, to run a local web server
- Internet access for live weather, Google Fonts, and external Disney links

### Start on Windows

1. Copy the complete project folder to the computer connected to the television.
2. Open the project folder in File Explorer.
3. Click the address bar, type `powershell`, and press Enter.
4. Run:

   ```powershell
   npx serve . -l 8080
   ```

5. Open a browser and visit:

   ```text
   http://localhost:8080
   ```

6. Click the opening screen or press Enter to begin. This first interaction allows the browser to play the background music.
7. Put the browser into fullscreen mode. In Chrome and Edge, press F11.

Keep the PowerShell window open while the experience is running. To stop the local server, return to PowerShell and press Ctrl+C.

The first run may ask permission to download the `serve` package. Enter `y` and press Enter. If the `npx` command is unavailable, install the current Node.js LTS release, reopen PowerShell, and run the command again.

### Python alternative

If Python 3 is already installed, the project can be started without `npx`. Open PowerShell in the project folder and run:

```powershell
py -m http.server 8080
```

Then open `http://localhost:8080`. On systems where `py` is unavailable but `python` works, use:

```powershell
python -m http.server 8080
```

Both server methods run the same project. `npx serve` is the recommended method, while Python is a convenient alternative. Only one server should be running at a time.

> Do not open `index.html` directly by double-clicking it. Serving the folder through `http://localhost:8080` gives the browser the correct environment for media, weather requests, navigation, and local storage.

## Everyday operation

- The opening screen accepts a mouse click, touchscreen tap, Enter, Space, or a TV remote selection key represented by the browser as a key press.
- Main-menu items open the individual resort screens.
- Clicking the resort name in a secondary screen returns to the welcome screen.
- Watch TV and Disney On Demand entries open their configured websites in a new browser tab.
- Arrow keys navigate selectable Watch TV and Disney On Demand entries.
- The interface is designed for a 16:9 display, ideally 1920×1080, with browser zoom set to 100%.

## Included screens

| Screen | File | Purpose |
| --- | --- | --- |
| Welcome | `index.html` | Personalized greeting, room number, date, time, weather, video, music, and main menu |
| Watch TV | `pages/watch-tv.html` | Time-aware television guide and channel links |
| Disney On Demand | `pages/disney-on-demand.html` | Movie and destination artwork with external links |
| Connect My Device | `pages/connect-device.html` | Static device-connection instructions and QR artwork |
| At the Resort | `pages/aulani.html` | Beach Club resort services |
| Around the Island | `pages/around-the-island.html` | Activities and local information |
| Parks & More | `pages/parks-and-more.html` | Disney parks, water parks, and Disney Springs |

## Project structure

```text
Disney Project/
├── index.html
├── README.md
├── pages/
│   └── Secondary screen HTML files
└── assets/
    ├── css/      Page layouts and visual styling
    ├── images/   Logos, textures, cards, posters, and QR artwork
    ├── js/       Configuration and screen behavior
    └── media/    Day/night videos and background music
```

All folders and files under `assets` are required unless the source code is also updated. Keep the folder structure unchanged when copying the project to another computer.

## Personalization and configuration

Before editing any source file, make a backup copy of the complete folder. Use a plain-text code editor such as Visual Studio Code or Notepad++.

### Welcome screen settings

The `CONFIG` block at the top of `assets/js/script.js` contains the primary settings:

- `locationName`, `latitude`, and `longitude` — weather location
- `timeZone` — time, date, birthday, sunrise, and sunset timezone
- `familyName` — family name shown on normal days
- `defaultGreeting` — standard welcome message
- `birthdayGreetings` — birthday dates and names
- `roomNumber` — room displayed on the welcome screen
- `backgroundMusicVolume` — music volume from `0` to `1`
- `fallbackDayStartHour` and `fallbackNightStartHour` — offline video switching times
- `fallbackWeather` — temperature and weather code used if live and cached weather are unavailable

The current location is Morris, Illinois, using the `America/Chicago` timezone. The current room is 516.

### Room number on secondary screens

Each secondary JavaScript file has its own `roomNumber` setting near the top:

- `assets/js/watch-tv.js`
- `assets/js/disney-on-demand.js`
- `assets/js/connect-device.js`
- `assets/js/aulani.js`
- `assets/js/parks-and-more.js`

Update all of these files if the room number changes throughout the experience.

### External links

- Watch TV destinations are stored in `WATCH_TV_LINKS` inside `assets/js/watch-tv.js`.
- Movie and destination links are stored in `ON_DEMAND_LINKS` inside `assets/js/disney-on-demand.js`.

These links require an internet connection. Disney+ content may also require a valid subscription, login, supported country, and compatible browser. The project does not bypass authentication or play protected Disney+ video inside the interface.

### Replacing images or media

The safest replacement method is to keep the existing filename, file type, and approximate aspect ratio. This avoids editing HTML or CSS and prevents unwanted cropping.

Large images and videos should be optimized before replacement. Do not rename or remove a referenced file without updating every matching path in the HTML, CSS, or JavaScript.

## Automatic behavior

### Illinois clock and birthdays

Time-sensitive content uses `America/Chicago`, not the timezone configured on the viewing computer.

- June 28 shows Happy Birthday Brenda.
- January 18 shows Happy Birthday Roger.
- Every other date shows Welcome Home and Nelson Family.

Birthday layouts can be previewed without changing the computer clock:

- `http://localhost:8080/?celebration=brenda`
- `http://localhost:8080/?celebration=roger`
- `http://localhost:8080/?celebration=default`

Remove the text after `8080/` to return to automatic behavior.

### Weather

Weather and sunrise/sunset data come from Open-Meteo using the configured coordinates. Weather refreshes every 15 minutes and successful results are cached in the browser.

If the internet is unavailable, the interface uses the last cached weather result. If no cache exists, it uses the fallback weather configured in `assets/js/script.js`.

### Day and night video

The welcome screen automatically selects the day or night video using live sunrise and sunset data. Without internet access, it falls back to 6:00 AM for day mode and 7:00 PM for night mode.

The modes can be previewed manually:

- `http://localhost:8080/?heroVideo=day`
- `http://localhost:8080/?heroVideo=night`

The local media files are:

- `assets/media/day-loop-video.optimized.mp4`
- `assets/media/night-loop-video-new.optimized.mp4`
- `assets/media/background-music.mp3`

## Online and offline operation

The main interface remains usable without internet after the complete folder is copied to the viewing computer. Local pages, images, videos, music, navigation, clock, birthday logic, and fallback weather continue to work.

Internet access is required for:

- Current weather and sunrise/sunset updates
- Google Fonts (the browser uses fallback fonts if unavailable)
- Disney+, Disney Parks, and other external links

## Troubleshooting

### The page does not open

Confirm that the PowerShell server is still running and that the browser address is exactly `http://localhost:8080`. If port 8080 is already in use, use another port:

```powershell
npx serve . -l 8081
```

or:

```powershell
py -m http.server 8081
```

Then open `http://localhost:8081`.

### Music does not play

Click or press a key on the opening screen. Browsers block audio until the user interacts with the page. Also check the browser tab, Windows volume mixer, television volume, and audio output device.

### Weather does not update

Check the internet connection and confirm that the computer date and time are correct. The interface will continue using cached or fallback weather while offline.

### The wrong day/night video appears

Remove any `?heroVideo=day` or `?heroVideo=night` test value from the address. Confirm the viewing computer has the correct date and time and that internet access is available for sunrise/sunset data.

### A Disney link does not open

Allow pop-ups for `localhost`, check the internet connection, and verify the relevant URL in `assets/js/watch-tv.js` or `assets/js/disney-on-demand.js`. External services can change their URLs or regional availability independently of this project.

### The layout is cropped or oversized

Use a 16:9 display, set browser zoom to 100%, and enter fullscreen mode. Check the television's picture-size setting and disable overscan if the outer edges are cut off.

## Important limitations

- Connect My Device is an informational screen; this website is not an AirPlay or Google Cast receiver.
- Disney+ playback, accounts, subscriptions, regional access, and DRM are controlled by Disney.
- Live weather and external websites depend on third-party services and internet availability.
- The experience is intended to run locally and does not require deployment or hosting.
