const CONNECT_CONFIG = Object.freeze({
  roomNumber: "516",
});

const roomElement = document.querySelector("[data-room]");
if (roomElement) {
  roomElement.textContent = CONNECT_CONFIG.roomNumber;
}
