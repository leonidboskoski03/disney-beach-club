const DEMAND_CONFIG = Object.freeze({
  roomNumber: "516",
});

const ON_DEMAND_LINKS = Object.freeze({
  cars: "https://www.disneyplus.com/en-mk/browse/entity-9c1b0ec2-2e4e-4717-89fb-bdf3a45523df",
  findingNemo: "https://www.disneyplus.com/en-mk/browse/entity-37b62808-2368-4688-9410-2dcf7461e258",
  hercules: "https://www.disneyplus.com/en-mk/browse/entity-ae19dd2f-a945-442b-a18e-d57fa8f5091f",
  hunchbackOfNotreDame: "https://www.disneyplus.com/en-mk/browse/entity-487dcb63-61e4-49ba-9f44-ce0aab176ab9",
  incredibles2: "https://www.disneyplus.com/en-mk/browse/entity-9da2c0fb-a380-4180-b67f-006fbaaa89ab",
  monstersInc: "https://www.disneyplus.com/en-mk/browse/entity-3c90b85f-ba5e-4351-be87-e625d5706952",
  ratatouille: "https://www.disneyplus.com/en-mk/browse/entity-ab7c4e29-04f1-46dd-931a-d43be1ce0f8c",
  waltDisneyWorld: "https://disneyworld.disney.go.com/",
  disneySprings: "https://www.disneysprings.com/",
  disneyWaterParks: "https://disneyworld.disney.go.com/destinations/water-parks/",
  disneyVacationClub: "https://disneyvacationclub.disney.go.com/",
  aulani: "https://www.disneyaulani.com/",
});

function openExternalLink(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

const onDemandCards = [...document.querySelectorAll("[data-on-demand-link]")];

function selectOnDemandCard(card) {
  onDemandCards.forEach((item) => item.classList.toggle("is-selected", item === card));
}

onDemandCards.forEach((card) => {
  const url = ON_DEMAND_LINKS[card.dataset.onDemandLink];

  if (!url) {
    card.setAttribute("aria-disabled", "true");
    card.title = "Link unavailable";
    return;
  }

  card.tabIndex = 0;
  card.setAttribute("role", "link");
  card.addEventListener("mouseenter", () => selectOnDemandCard(card));
  card.addEventListener("focus", () => selectOnDemandCard(card));

  card.addEventListener("click", () => openExternalLink(url));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openExternalLink(url);
  });
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

  const currentIndex = onDemandCards.indexOf(document.activeElement);
  if (currentIndex < 0) return;

  event.preventDefault();
  const columns = 6;
  const offsets = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -columns,
    ArrowDown: columns,
  };
  const nextIndex =
    (currentIndex + offsets[event.key] + onDemandCards.length) % onDemandCards.length;
  onDemandCards[nextIndex].focus();
});

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = DEMAND_CONFIG.roomNumber;
}
