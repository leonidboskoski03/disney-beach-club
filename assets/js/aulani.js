const AULANI_CONFIG = Object.freeze({
  roomNumber: "516",
});

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = AULANI_CONFIG.roomNumber;
}

const cards = [...document.querySelectorAll(".aulani-card")];
cards.forEach((card) => {
  if (!card.hasAttribute("href")) card.tabIndex = 0;

  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });

  card.addEventListener("focus", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

  event.preventDefault();
  const currentIndex = Math.max(0, cards.indexOf(document.activeElement));
  const columns = cards.length > 4 ? 4 : 3;
  const offsets = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -columns,
    ArrowDown: columns,
  };
  const nextIndex = (currentIndex + offsets[event.key] + cards.length) % cards.length;
  cards[nextIndex].focus();
});
