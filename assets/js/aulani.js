const AULANI_CONFIG = Object.freeze({
  roomNumber: "516",
});

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = AULANI_CONFIG.roomNumber;
}

const cards = [...document.querySelectorAll(".aulani-card")];
cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });
});
