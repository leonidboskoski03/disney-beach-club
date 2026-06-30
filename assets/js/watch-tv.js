const WATCH_CONFIG = Object.freeze({
  roomNumber: "516",
  timeZone: "America/Chicago",
  slotMinutes: 30,
});

const WATCH_TV_LINKS = Object.freeze({
  67: "https://www.disneyplus.com/en-mk",
  68: "https://www.disneyplus.com/en-mk",
  69: "https://www.disneyplus.com/en-mk",
  2: "https://disneyworld.disney.go.com/",
  1: "https://www.disneyplus.com/en-mk",
  3: "https://disneynow.com/all-shows/disney-channel",
  4: "https://disneynow.com/all-shows/disney-junior",
  5: "https://disneynow.com/all-shows",
});

function openExternalLink(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = WATCH_CONFIG.roomNumber;
}

const dateElement = document.querySelector("[data-guide-date]");
const timeElements = [...document.querySelectorAll("[data-time-slot]")];
const featuredTime = document.querySelector("[data-featured-time]");

const zonedPartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: WATCH_CONFIG.timeZone,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function getIllinoisWallClock(now = new Date()) {
  const parts = Object.fromEntries(
    zonedPartsFormatter.formatToParts(now).map(({ type, value }) => [type, value]),
  );

  return new Date(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
  );
}

function updateGuideClock() {
  const illinoisNow = getIllinoisWallClock();
  const slotStart = new Date(illinoisNow);
  slotStart.setMinutes(
    Math.floor(slotStart.getMinutes() / WATCH_CONFIG.slotMinutes) * WATCH_CONFIG.slotMinutes,
    0,
    0,
  );

  if (dateElement) {
    dateElement.textContent = dateFormatter.format(illinoisNow).toUpperCase();
  }

  timeElements.forEach((element, index) => {
    const slot = new Date(slotStart);
    slot.setMinutes(slot.getMinutes() + index * WATCH_CONFIG.slotMinutes);
    element.textContent = timeFormatter.format(slot);
  });

  if (featuredTime) {
    const end = new Date(slotStart);
    end.setHours(end.getHours() + 2);
    featuredTime.textContent = `${timeFormatter.format(slotStart)} – ${timeFormatter.format(end)}`;
  }
}

const programs = [...document.querySelectorAll(".program")];

function selectProgram(program) {
  programs.forEach((item) => item.classList.remove("is-selected"));
  program.classList.add("is-selected");
}

programs.forEach((program) => {
  program.addEventListener("click", () => selectProgram(program));
  program.addEventListener("focus", () => selectProgram(program));
});

document.querySelectorAll("[data-watch-tv-link]").forEach((rowItem) => {
  const url = WATCH_TV_LINKS[rowItem.dataset.watchTvLink];

  if (!url) {
    rowItem.setAttribute("aria-disabled", "true");
    rowItem.title = "Link unavailable";
    return;
  }

  if (!(rowItem instanceof HTMLButtonElement)) {
    rowItem.tabIndex = 0;
  }
  rowItem.setAttribute("role", "link");

  rowItem.addEventListener("click", () => openExternalLink(url));
  rowItem.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openExternalLink(url);
  });
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

  event.preventDefault();
  const currentIndex = Math.max(0, programs.indexOf(document.activeElement));
  const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
  const nextIndex = (currentIndex + direction + programs.length) % programs.length;
  programs[nextIndex].focus();
});

updateGuideClock();
setInterval(updateGuideClock, 60_000);
