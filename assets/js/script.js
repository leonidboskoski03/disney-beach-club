const CONFIG = Object.freeze({
  locationName: "Morris, Illinois",
  latitude: 41.3573,
  longitude: -88.4212,
  timeZone: "America/Chicago",
  familyName: "Nelson Family",
  defaultGreeting: "Welcome Home",
  birthdayGreetings: Object.freeze({
    "06-28": Object.freeze({ greeting: "Happy Birthday", familyName: "Brenda", isBirthday: true }),
    "01-18": Object.freeze({ greeting: "Happy Birthday", familyName: "Roger", isBirthday: true }),
  }),
  roomNumber: "516",
  weatherRefreshMinutes: 15,
  weatherCacheKey: "resort-welcome-weather",
  sunScheduleCacheKey: "resort-welcome-sun-schedule",
  heroVideoCheckSeconds: 60,
  heroVideoTransitionMs: 1400,
  backgroundMusicVolume: 0.18,
  fallbackDayStartHour: 6,
  fallbackNightStartHour: 19,
  heroVideos: Object.freeze({
    day: "assets/media/day-loop-video.optimized.mp4",
    night: "assets/media/night-loop-video-new.optimized.mp4",
  }),
  resortUpdateDaysAhead: 2,
  // Set to "day" or "night" for manual testing, or keep null for real Illinois time.
  // You can also test without editing this file by adding ?heroVideo=night to the URL.
  heroVideoModeOverride: null,
  fallbackWeather: Object.freeze({
    temperature: 72,
    weatherCode: 2,
  }),
});

const elements = {
  families: [...document.querySelectorAll("[data-family]")],
  greetings: [...document.querySelectorAll("[data-greeting]")],
  defaultMemberMarks: [...document.querySelectorAll("[data-default-member-mark]")],
  birthdayMarks: [...document.querySelectorAll("[data-birthday-mark]")],
  defaultStartHeaders: [...document.querySelectorAll("[data-default-start-header]")],
  birthdayStartHeaders: [...document.querySelectorAll("[data-birthday-start-header]")],
  room: document.querySelector("[data-room]"),
  time: document.querySelector("[data-time]"),
  date: document.querySelector("[data-date]"),
  temperature: document.querySelector("[data-temperature]"),
  weatherIcon: document.querySelector("[data-weather-icon]"),
  heroVideos: {
    day: document.querySelector('[data-hero-video="day"]'),
    night: document.querySelector('[data-hero-video="night"]'),
  },
  resortUpdateMessage: document.querySelector("[data-resort-update-message]"),
  backgroundMusic: document.querySelector("[data-background-music]"),
  startOverlay: document.querySelector("[data-start-overlay]"),
};

const weatherIcons = {
  clear: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="8"/><path d="M24 3v7m0 28v7M3 24h7m28 0h7M9 9l5 5m20 20 5 5M39 9l-5 5M14 34l-5 5"/></svg>`,
  partlyCloudy: `<svg viewBox="0 0 48 48"><path d="M19 12a10 10 0 0 1 19 5"/><path d="M17 37H9a7 7 0 1 1 2-14 12 12 0 0 1 23 4h2a5 5 0 0 1 0 10H17Z"/></svg>`,
  cloudy: `<svg viewBox="0 0 48 48"><path d="M12 38a8 8 0 1 1 3-15 12 12 0 0 1 23 4h1a6 6 0 0 1 0 11H12Z"/></svg>`,
  rain: `<svg viewBox="0 0 48 48"><path d="M11 31a7 7 0 1 1 3-14 12 12 0 0 1 23 4h1a5 5 0 0 1 0 10H11Z"/><path d="m16 36-2 6m12-6-2 6m12-6-2 6"/></svg>`,
  storm: `<svg viewBox="0 0 48 48"><path d="M11 29a7 7 0 1 1 3-14 12 12 0 0 1 23 4h1a5 5 0 0 1 0 10H11Z"/><path d="m26 31-6 9h7l-4 6"/></svg>`,
  snow: `<svg viewBox="0 0 48 48"><path d="M11 28a7 7 0 1 1 3-14 12 12 0 0 1 23 4h1a5 5 0 0 1 0 10H11Z"/><path d="M15 35v9m-4-7 8 5m0-5-8 5m18-7v9m-4-7 8 5m0-5-8 5"/></svg>`,
  fog: `<svg viewBox="0 0 48 48"><path d="M8 17h32M4 24h34M10 31h34M6 38h30"/></svg>`,
};

let sunScheduleRetryAfter = 0;
let heroVideoTransitionTimer = null;

function lockDownHeroVideoControls(video) {
  if (!video) return;

  video.controls = false;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
  video.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
  video.addEventListener("contextmenu", (event) => event.preventDefault());
}

function getOrdinal(number) {
  const remainder100 = number % 100;
  if (remainder100 >= 11 && remainder100 <= 13) return `${number}th`;

  return `${number}${({ 1: "st", 2: "nd", 3: "rd" })[number % 10] ?? "th"}`;
}

function getDateParts(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
}

function getZonedNumericParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  return Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
}

function getZonedDateToken(date = new Date()) {
  const parts = getZonedNumericParts(date);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function getWelcomeState(date = new Date()) {
  const override = new URLSearchParams(window.location.search)
    .get("celebration")
    ?.toLowerCase();

  if (override === "brenda" || override === "roger") {
    return {
      greeting: "Happy Birthday",
      familyName: override === "brenda" ? "Brenda" : "Roger",
      isBirthday: true,
    };
  }

  if (override === "default") {
    return {
      greeting: CONFIG.defaultGreeting,
      familyName: CONFIG.familyName,
      isBirthday: false,
    };
  }

  const parts = getZonedNumericParts(date);
  const dateKey = `${parts.month}-${parts.day}`;
  return CONFIG.birthdayGreetings[dateKey] ?? {
    greeting: CONFIG.defaultGreeting,
    familyName: CONFIG.familyName,
    isBirthday: false,
  };
}

function renderWelcomeMessage(date = new Date()) {
  const state = getWelcomeState(date);
  elements.greetings.forEach((element) => {
    element.textContent = state.greeting;
  });
  elements.families.forEach((element) => {
    element.textContent = state.familyName;
  });
  elements.defaultMemberMarks.forEach((element) => {
    element.hidden = state.isBirthday;
  });
  elements.birthdayMarks.forEach((element) => {
    element.hidden = !state.isBirthday;
  });
  elements.defaultStartHeaders.forEach((element) => {
    element.hidden = state.isBirthday;
  });
  elements.birthdayStartHeaders.forEach((element) => {
    element.hidden = !state.isBirthday;
  });
  document.body.classList.toggle("is-birthday", state.isBirthday);
}

function getZonedMinutes(date = new Date()) {
  const parts = getZonedNumericParts(date);
  return Number(parts.hour) * 60 + Number(parts.minute);
}

function timeStringToMinutes(value) {
  const time = value?.split("T").at(-1);
  const [hour, minute] = time?.split(":").map(Number) ?? [];

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;

  return hour * 60 + minute;
}

function getFutureZonedDateParts(daysAhead) {
  const todayParts = getZonedNumericParts();
  const date = new Date(
    Date.UTC(
      Number(todayParts.year),
      Number(todayParts.month) - 1,
      Number(todayParts.day) + daysAhead,
    ),
  );
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
}

function getHeroVideoModeOverride() {
  const queryMode = new URLSearchParams(window.location.search).get("heroVideo");
  const mode = queryMode ?? CONFIG.heroVideoModeOverride;

  return ["day", "night"].includes(mode) ? mode : null;
}

function getResortUpdateText() {
  const daysAhead = Math.min(3, Math.max(1, Number(CONFIG.resortUpdateDaysAhead) || 2));
  const parts = getFutureZonedDateParts(daysAhead);
  const maintenanceDate = `${parts.weekday}, ${parts.month} ${getOrdinal(Number(parts.day))}`;

  return `*** Resort Update *** There will be scheduled maintenance on ${maintenanceDate}, between 12:00 AM - 4:00 AM. During this time, the hot water and air conditioning in your room will be impacted. If you require additional assistance, please contact the Front Desk.`;
}

function renderResortUpdateTicker(mode) {
  document.body.dataset.heroMode = mode;

  if (!elements.resortUpdateMessage) return;

  const updateText = getResortUpdateText();
  elements.resortUpdateMessage.textContent = updateText;
}

function updateClock() {
  const now = new Date();
  renderWelcomeMessage(now);
  const timeText = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  const parts = getDateParts(now);
  const dateText = `${parts.weekday}, ${parts.month} ${getOrdinal(Number(parts.day))}, ${parts.year}`;

  elements.time.textContent = timeText;
  elements.time.dateTime = now.toISOString();
  elements.date.textContent = dateText;
  elements.date.dateTime = `${parts.year}-${String(new Date(`${parts.month} 1, 2000`).getMonth() + 1).padStart(2, "0")}-${parts.day.padStart(2, "0")}`;
}

function iconForWeatherCode(code) {
  if (code === 0) return "clear";
  if ([1, 2].includes(code)) return "partlyCloudy";
  if (code === 3) return "cloudy";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "partlyCloudy";
}

function renderWeather({ temperature, weatherCode }) {
  const roundedTemperature = Math.round(Number(temperature));
  const safeTemperature = Number.isFinite(roundedTemperature)
    ? roundedTemperature
    : CONFIG.fallbackWeather.temperature;
  const safeWeatherCode = Number.isFinite(Number(weatherCode))
    ? Number(weatherCode)
    : CONFIG.fallbackWeather.weatherCode;

  elements.temperature.textContent = `${safeTemperature}°F`;
  elements.weatherIcon.innerHTML = weatherIcons[iconForWeatherCode(safeWeatherCode)];
}

function readCachedWeather() {
  try {
    const cachedWeather = JSON.parse(localStorage.getItem(CONFIG.weatherCacheKey));
    if (
      cachedWeather &&
      Number.isFinite(Number(cachedWeather.temperature)) &&
      Number.isFinite(Number(cachedWeather.weatherCode))
    ) {
      return cachedWeather;
    }
  } catch (error) {
    console.warn("Cached weather could not be read.", error);
  }

  return null;
}

function cacheWeather(weather) {
  try {
    localStorage.setItem(
      CONFIG.weatherCacheKey,
      JSON.stringify({
        ...weather,
        location: CONFIG.locationName,
        savedAt: new Date().toISOString(),
      }),
    );
  } catch (error) {
    console.warn("Weather could not be cached on this device.", error);
  }
}

async function updateWeather() {
  const query = new URLSearchParams({
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    current: "temperature_2m,weather_code",
    temperature_unit: "fahrenheit",
    timezone: CONFIG.timeZone,
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`);
    if (!response.ok) throw new Error(`Weather service returned ${response.status}`);

    const { current } = await response.json();
    if (
      !current ||
      !Number.isFinite(Number(current.temperature_2m)) ||
      !Number.isFinite(Number(current.weather_code))
    ) {
      throw new Error("Weather service returned incomplete data");
    }

    const weather = {
      temperature: current.temperature_2m,
      weatherCode: current.weather_code,
    };

    renderWeather(weather);
    cacheWeather(weather);
  } catch (error) {
    const cachedWeather = readCachedWeather();
    renderWeather(cachedWeather ?? CONFIG.fallbackWeather);
    console.warn(
      cachedWeather
        ? "Live weather is unavailable; showing the last saved weather."
        : "Live weather is unavailable; showing the configured fallback weather.",
      error,
    );
  }
}

function readCachedSunSchedule() {
  try {
    const schedule = JSON.parse(localStorage.getItem(CONFIG.sunScheduleCacheKey));
    if (
      schedule?.date === getZonedDateToken() &&
      Number.isFinite(Number(schedule.sunriseMinutes)) &&
      Number.isFinite(Number(schedule.sunsetMinutes))
    ) {
      return schedule;
    }
  } catch (error) {
    console.warn("Cached sun schedule could not be read.", error);
  }

  return null;
}

function cacheSunSchedule(schedule) {
  try {
    localStorage.setItem(CONFIG.sunScheduleCacheKey, JSON.stringify(schedule));
  } catch (error) {
    console.warn("Sun schedule could not be cached on this device.", error);
  }
}

async function fetchSunSchedule() {
  const dateToken = getZonedDateToken();
  const query = new URLSearchParams({
    latitude: CONFIG.latitude,
    longitude: CONFIG.longitude,
    daily: "sunrise,sunset",
    timezone: CONFIG.timeZone,
    start_date: dateToken,
    end_date: dateToken,
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`);
  if (!response.ok) throw new Error(`Sun schedule service returned ${response.status}`);

  const { daily } = await response.json();
  const sunriseMinutes = timeStringToMinutes(daily?.sunrise?.[0]);
  const sunsetMinutes = timeStringToMinutes(daily?.sunset?.[0]);

  if (!Number.isFinite(sunriseMinutes) || !Number.isFinite(sunsetMinutes)) {
    throw new Error("Sun schedule service returned incomplete data");
  }

  const schedule = {
    date: dateToken,
    location: CONFIG.locationName,
    sunriseMinutes,
    sunsetMinutes,
    savedAt: new Date().toISOString(),
  };

  cacheSunSchedule(schedule);
  return schedule;
}

async function getSunSchedule() {
  const cachedSchedule = readCachedSunSchedule();
  if (cachedSchedule) return cachedSchedule;

  if (Date.now() < sunScheduleRetryAfter) return null;

  try {
    const schedule = await fetchSunSchedule();
    sunScheduleRetryAfter = 0;
    return schedule;
  } catch (error) {
    sunScheduleRetryAfter = Date.now() + 60 * 60 * 1_000;
    console.warn(
      "Live sun schedule is unavailable; using configured day/night fallback hours.",
      error,
    );
    return null;
  }
}

async function getHeroVideoMode() {
  const overrideMode = getHeroVideoModeOverride();
  if (overrideMode) return overrideMode;

  const schedule = await getSunSchedule();
  const currentMinutes = getZonedMinutes();

  if (schedule) {
    return currentMinutes >= schedule.sunriseMinutes &&
      currentMinutes < schedule.sunsetMinutes
      ? "day"
      : "night";
  }

  return currentMinutes >= CONFIG.fallbackDayStartHour * 60 &&
    currentMinutes < CONFIG.fallbackNightStartHour * 60
    ? "day"
    : "night";
}

async function updateHeroVideo() {
  const videos = elements.heroVideos;
  if (!videos.day || !videos.night) return;
  Object.values(videos).forEach(lockDownHeroVideoControls);

  const mode = await getHeroVideoMode();
  const activeVideo = videos[mode];
  const inactiveVideo = videos[mode === "day" ? "night" : "day"];
  const source = CONFIG.heroVideos[mode];
  renderResortUpdateTicker(mode);

  if (document.body.dataset.activeHeroVideo === mode) return;

  if (!activeVideo.src.endsWith(source)) {
    activeVideo.src = source;
    activeVideo.load();
  }

  document.body.dataset.activeHeroVideo = mode;

  const playback = activeVideo.play();
  if (playback) {
    playback.catch((error) => {
      console.warn("Hero video autoplay was blocked or interrupted.", error);
    });
  }

  window.clearTimeout(heroVideoTransitionTimer);
  heroVideoTransitionTimer = window.setTimeout(() => {
    inactiveVideo.pause();
    inactiveVideo.removeAttribute("src");
    inactiveVideo.load();
  }, CONFIG.heroVideoTransitionMs);
}

function initializeNavigation() {
  const links = [...document.querySelectorAll(".service-link")];
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((item) => {
        item.classList.remove("is-active");
        item.removeAttribute("aria-current");
      });
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    });
  });
}

const EXPERIENCE_STARTED_KEY = "resort-welcome-started";

function hasStartedExperience() {
  try {
    return sessionStorage.getItem(EXPERIENCE_STARTED_KEY) === "true";
  } catch (error) {
    console.warn("The experience state could not be read on this device.", error);
    return false;
  }
}

function rememberStartedExperience() {
  try {
    sessionStorage.setItem(EXPERIENCE_STARTED_KEY, "true");
  } catch (error) {
    console.warn("The experience state could not be saved on this device.", error);
  }
}

function initializeBackgroundMusic() {
  const music = elements.backgroundMusic;
  const overlay = elements.startOverlay;
  if (!music || !overlay) return;

  music.volume = CONFIG.backgroundMusicVolume;

  if (hasStartedExperience()) {
    document.body.classList.add("is-started");
    const resumedPlayback = music.play();
    resumedPlayback?.catch((error) => {
      console.warn("Background music could not resume after returning home.", error);
    });
    return;
  }

  document.body.classList.remove("is-started");

  const validStartKeys = new Set([
    "Enter",
    " ",
    "Spacebar",
    "Select",
    "OK",
    "Accept",
    "NumpadEnter",
  ]);

  const cleanup = () => {
    overlay.removeEventListener("click", startExperience);
    overlay.removeEventListener("pointerdown", startExperience);
    window.removeEventListener("keydown", startExperience);
  };

  function startExperience(event) {
    if (event?.type === "keydown") {
      const isSelectKey =
        validStartKeys.has(event.key) ||
        event.code === "Enter" ||
        event.code === "NumpadEnter" ||
        event.code === "Space" ||
        event.keyCode === 13 ||
        event.keyCode === 32;

      if (!isSelectKey) return;
    }

    event?.preventDefault?.();
    document.body.classList.add("is-started");

    const playback = music.play();
    if (playback) {
      playback
        .then(() => {
          rememberStartedExperience();
          cleanup();
        })
        .catch((error) => {
          document.body.classList.remove("is-started");
          console.warn("Background music could not start from the selected interaction.", error);
        });
    }
  }

  overlay.addEventListener("click", startExperience);
  overlay.addEventListener("pointerdown", startExperience);
  window.addEventListener("keydown", startExperience);
}

elements.room.textContent = CONFIG.roomNumber;
renderWeather(readCachedWeather() ?? CONFIG.fallbackWeather);
updateClock();
updateWeather();
updateHeroVideo();
initializeNavigation();
initializeBackgroundMusic();

window.setInterval(updateClock, 15_000);
window.setInterval(updateWeather, CONFIG.weatherRefreshMinutes * 60_000);
window.setInterval(updateHeroVideo, CONFIG.heroVideoCheckSeconds * 1_000);
