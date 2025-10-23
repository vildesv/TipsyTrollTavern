// Hent popup-elementer
const specialPopup = document.getElementById('specialPopup');
const doorPopup = document.getElementById('doorPopup');
const aboutPopup = document.getElementById('aboutPopup');

// Hent close-knapper
const closeButtons = document.querySelectorAll('.close-btn');

// Hent alle <area>-elementer
const areaElements = document.querySelectorAll('area');

// Funksjoner for å lukke/aktivere popup
function closeAllPopups() {
  specialPopup.style.display = 'none';
  doorPopup.style.display = 'none';
  aboutPopup.style.display = 'none';
  enableMap();
}

function disableMap() {
  areaElements.forEach(area => (area.style.pointerEvents = 'none'));
}

function enableMap() {
  areaElements.forEach(area => (area.style.pointerEvents = 'auto'));
}

// === GLASS ===
document.getElementById('specialGlassBar').addEventListener('click', e => {
  e.preventDefault();
  closeAllPopups();
  disableMap();
  specialPopup.style.display = 'block';
  new Audio('audio/glass-clink.mp3').play();
});
document.getElementById('specialGlassTable').addEventListener('click', e => {
  e.preventDefault();
  closeAllPopups();
  disableMap();
  specialPopup.style.display = 'block';
  new Audio('audio/glass-clink.mp3').play();
});

// === DØR ===
const doorQuestion = document.querySelector('.door-question');
doorQuestion.addEventListener('click', () => {
  closeAllPopups();
  disableMap();
  doorPopup.style.display = 'block';
  new Audio('audio/door-creak.mp3').play();
});

// === ABOUT US ===
const aboutOverlay = document.querySelector('.about-overlay');
aboutOverlay.addEventListener('click', () => {
  closeAllPopups();
  disableMap();
  aboutPopup.style.display = 'block';
  new Audio('audio/book-open.mp3').play();
});

// === LUKK-KNAPPER ===
closeButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.target.parentElement.style.display = 'none';
    enableMap();
  });
});

// === BAKGRUNNSLYD ===
const bgAudio = new Audio('audio/my-tavern-1.wav'); // endre per side
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