const PARKS_CONFIG = Object.freeze({
  roomNumber: "516",
});

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = PARKS_CONFIG.roomNumber;
}
