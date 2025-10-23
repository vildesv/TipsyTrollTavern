// === BAKGRUNNSLYD ===
const bgAudio = new Audio('audio/ambient-music.mp3'); // endre per side
bgAudio.loop = true;
bgAudio.volume = 0.3;

let audioStarted = false;
function startAudio() {
  if (!audioStarted) {
    bgAudio.play().catch(() => console.log('Autoplay blokkert'));
    audioStarted = true;
  }
}

document.addEventListener('click', startAudio, { once: true });
document.addEventListener('keydown', startAudio, { once: true });

// === MUTE / UNMUTE-KNAPP ===
const muteBtn = document.createElement('button');
muteBtn.classList.add('mute-btn');
muteBtn.textContent = '🔊';
document.body.appendChild(muteBtn);

let isMuted = false;
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  bgAudio.muted = isMuted;
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
});

// === EASTER EGG MED "OH?" TEKST ===
document.addEventListener("DOMContentLoaded", () => {
  const secretSpot = document.getElementById("secret-spot");
  const ohText = document.getElementById("oh-text");
  const popup = document.getElementById("video-popup");
  const videoFrame = document.getElementById("easter-egg-video");

  let videoTimeout;

  // Vis "Oh?" når brukeren hover over det hemmelige området
  secretSpot.addEventListener("mouseenter", () => {
    if (!popup.classList.contains("hidden")) return; // skjul når popup er åpen
    ohText.classList.remove("hidden");
  });
  secretSpot.addEventListener("mouseleave", () => {
    ohText.classList.add("hidden");
  });

  // Klikk på "Oh?" → åpner popup og spiller video
  ohText.addEventListener("click", () => {
    ohText.classList.add("hidden"); // skjul teksten når popup åpnes
    popup.classList.remove("hidden");

    const videoUrl =
      "https://www.youtube.com/embed/IxX_QHay02M?autoplay=1&start=0&end=61&controls=0&modestbranding=1";
    videoFrame.src = videoUrl;

    // Demper bakgrunnslyden mens videoen spilles
    const previousMuteState = bgAudio.muted;
    bgAudio.muted = true;

    // Popupen forsvinner etter 60 sekunder
    videoTimeout = setTimeout(() => {
      closePopup(previousMuteState);
    }, 61000);
  });

  // Klikk utenfor videoen → lukker popup
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(bgAudio.muted);
    }
  });

  // === Hjelpefunksjon for å lukke popup ===
  function closePopup(previousMuteState = false) {
    popup.classList.add("hidden");
    videoFrame.src = "";
    clearTimeout(videoTimeout);

    // Gjenopprett bakgrunnslyden
    bgAudio.muted = previousMuteState;
    muteBtn.textContent = previousMuteState ? '🔇' : '🔊';
  }
});