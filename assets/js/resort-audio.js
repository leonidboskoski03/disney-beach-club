(() => {
  const STARTED_KEY = "resort-welcome-started";
  const PLAYBACK_KEY = "resort-music-playback";
  const VOLUME = 0.5;

  let hasStarted = false;
  try {
    hasStarted = sessionStorage.getItem(STARTED_KEY) === "true";
  } catch (error) {
    console.warn("The music session state could not be read.", error);
  }

  if (!hasStarted) return;

  const music = new Audio("../assets/media/background-music.mp3");
  music.preload = "auto";
  music.loop = true;
  music.volume = VOLUME;

  function readPlaybackState() {
    try {
      return JSON.parse(sessionStorage.getItem(PLAYBACK_KEY)) ?? null;
    } catch (error) {
      console.warn("The saved music position could not be read.", error);
      return null;
    }
  }

  function savePlaybackState() {
    if (!Number.isFinite(music.currentTime)) return;

    try {
      sessionStorage.setItem(
        PLAYBACK_KEY,
        JSON.stringify({ position: music.currentTime, savedAt: Date.now() }),
      );
    } catch (error) {
      console.warn("The music position could not be saved.", error);
    }
  }

  function restorePlaybackPosition() {
    const state = readPlaybackState();
    if (!state || !Number.isFinite(Number(state.position)) || !music.duration) return;

    const elapsed = Math.max(0, (Date.now() - Number(state.savedAt || Date.now())) / 1_000);
    music.currentTime = (Number(state.position) + elapsed) % music.duration;
  }

  function playMusic() {
    const playback = music.play();
    playback?.catch(() => {
      document.addEventListener("pointerdown", playMusic, { once: true });
      document.addEventListener("keydown", playMusic, { once: true });
    });
  }

  music.addEventListener("loadedmetadata", () => {
    restorePlaybackPosition();
    playMusic();
  }, { once: true });

  window.addEventListener("pagehide", savePlaybackState);
  window.setInterval(savePlaybackState, 2_000);
  music.load();
})();
