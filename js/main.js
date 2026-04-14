// BAKGRUNNSLYD
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

// MUTE / UNMUTE-KNAPP 
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

// EASTER EGG MED "OH?" TEKST 
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

  // Hjelpefunksjon for å lukke popup
  function closePopup(previousMuteState = false) {
    popup.classList.add("hidden");
    videoFrame.src = "";
    clearTimeout(videoTimeout);

    // Gjenopprett bakgrunnslyden
    bgAudio.muted = previousMuteState;
    muteBtn.textContent = previousMuteState ? '🔇' : '🔊';
  }

  // HOTSPOT INTERAKSJON
const hotspotPopup = document.getElementById('hotspot-popup');
const hotspots = document.querySelectorAll('.hotspot');
let activeHotspot = null;

hotspots.forEach(spot => {
  // Hover → vis hover-tekst uansett
  spot.addEventListener('mouseenter', () => {
    hotspotPopup.textContent = spot.dataset.hover;

    const rect = spot.getBoundingClientRect();
    hotspotPopup.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    hotspotPopup.style.top = `${rect.top - 70 + window.scrollY}px`; // over hotspot
    hotspotPopup.classList.add('show');
  });

  spot.addEventListener('mouseleave', () => {
    // Skjul kun hvis click-tekst ikke vises
    if (activeHotspot !== spot) {
      hotspotPopup.classList.remove('show');
    }
  });

  // Klikk → vis click-tekst
  spot.addEventListener('click', e => {
    e.stopPropagation();
    if (!spot.dataset.click) return; // hopp over hvis ingen click-tekst

    hotspotPopup.textContent = spot.dataset.click;
    const rect = spot.getBoundingClientRect();
    hotspotPopup.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    hotspotPopup.style.top = `${rect.top - 70 + window.scrollY}px`;
    hotspotPopup.classList.add('show');
    activeHotspot = spot;
  });
});

// Klikk utenfor → skjul popup
document.addEventListener('click', e => {
  if (!e.target.classList.contains('hotspot')) {
    hotspotPopup.classList.remove('show');
    activeHotspot = null;
  }
});
});

// const villagePath = document.querySelector(".path-to-village");
// const forestPath = document.querySelector(".path-to-forest");

// villagePath.addEventListener("click", function () {
//   window.location.href = "village.html";
// });

// forestPath.addEventListener("click", function () {
//   window.location.href = "forest.html";
// });