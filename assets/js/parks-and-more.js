const PARKS_CONFIG = Object.freeze({
  roomNumber: "516",
});

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = PARKS_CONFIG.roomNumber;
}

const cards = [...document.querySelectorAll(".park-card, .destination-card")];

function selectCard(card) {
  cards.forEach((item) => item.classList.toggle("is-selected", item === card));
}

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => selectCard(card));
  card.addEventListener("focus", () => selectCard(card));
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

  event.preventDefault();
  const currentIndex = Math.max(0, cards.indexOf(document.activeElement));
  let nextIndex = currentIndex;

  if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + cards.length) % cards.length;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % cards.length;
  if (event.key === "ArrowDown" && currentIndex < 4) nextIndex = 4 + Math.min(currentIndex, 2);
  if (event.key === "ArrowUp" && currentIndex >= 4) nextIndex = Math.min(currentIndex - 4, 3);

  cards[nextIndex].focus();
});
