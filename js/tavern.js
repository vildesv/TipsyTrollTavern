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

// === Dialog mellom Traveler og Witch ===
const dialogSequence = [
  { 
    traveler: "Greetings… I heard whispers of Princess Pixelia's visit here.", 
    witch: "Ah… the princess, yes. Rumor says she indulged a bit too much of the Giggling Goblin Grog…" 
  },
  { 
    traveler: "Really? I hope she left without trouble.", 
    witch: "Trouble? Ha! She proclaimed our tavern 'terribly outdated!' after her… spirited visit." 
  },
  { 
    traveler: "Terribly outdated? The Tipsy Troll Tavern? Legends would shiver at such a claim!", 
    witch: "Indeed. Even magic can’t shield a place from the eyes of a restless princess." 
  },
  { 
    traveler: "Then she wants us to adapt… perhaps a new digital home?", 
    witch: "Aye… she desires our tales and laughter to echo in the digital age, or vanish like mist." 
  },
  { 
    traveler: "I see… secrets, spirits, and spells… all need a modern stage.", 
    witch: "Exactly. And only the curious and brave will uncover what lingers beyond the ale and shadows." 
  },
  { 
    traveler: "Very well, I will heed your words… and find Princess Pixelia’s trail.", 
    witch: "Go, traveler… and remember, the tavern’s magic is subtle, yet ever watching." 
  }
];

const traveler = document.querySelector(".character-overlay.traveler");
const witch = document.querySelector(".character-overlay.witch");

const travelerBubble = traveler.querySelector(".speech-bubble");
const witchBubble = witch.querySelector(".speech-bubble");

let currentStep = 0;

const showDialog = (speaker) => {
  // Sett melding for begge karakterer basert på step
  travelerBubble.innerHTML = dialogSequence[currentStep].traveler;
  witchBubble.innerHTML = dialogSequence[currentStep].witch;

  // Vis boblene
  travelerBubble.style.opacity = 1;
  witchBubble.style.opacity = 1;

  // Oppdater step kun når karakteren som snakker klikkes
  currentStep = (currentStep + 1) % dialogSequence.length;
};

// Klikk på Traveler
traveler.addEventListener("click", (e) => {
  e.stopPropagation();
  showDialog("traveler");
});

// Klikk på Witch
witch.addEventListener("click", (e) => {
  e.stopPropagation();
  showDialog("witch");
});

// Klikk andre steder lukker boblene
document.addEventListener("click", () => {
  travelerBubble.style.opacity = 0;
  witchBubble.style.opacity = 0;
});