// Hent popup-elementer
const specialPopup = document.getElementById('specialPopup');
const doorPopup = document.getElementById('doorPopup'); 
const aboutPopup = document.getElementById('aboutPopup');
const bottlePopup = document.getElementById('bottlePopup');

// Hent close-knapper
const closeButtons = document.querySelectorAll('.close-btn');

// Hent alle <area>-elementer
const areaElements = document.querySelectorAll('area');

// Funksjoner for å lukke/aktivere popup
function closeAllPopups() {
  specialPopup.style.display = 'none';
  doorPopup.style.display = 'none';
  aboutPopup.style.display = 'none';
  bottlePopup.style.display = 'none'; 
  enableMap();
}

function disableMap() {
  areaElements.forEach(area => (area.style.pointerEvents = 'none'));
}

function enableMap() {
  areaElements.forEach(area => (area.style.pointerEvents = 'auto'));
}

// GLASS
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

// DØR 
const doorQuestion = document.querySelector('.door-question');
doorQuestion.addEventListener('click', () => {
  closeAllPopups();
  disableMap();
  doorPopup.style.display = 'block';
  new Audio('audio/door-creak.mp3').play();
});

// OM OSS OVERLAY
const aboutOverlay = document.querySelector('.about-overlay');
aboutOverlay.addEventListener('click', () => {
  closeAllPopups();
  disableMap();
  aboutPopup.style.display = 'block';
  new Audio('audio/book-open.mp3').play();
});

// FLASKE OVERLAY
const bottleOverlay = document.querySelector('.bottle-overlay');
bottleOverlay.addEventListener('click', () => {
  closeAllPopups();
  disableMap();
  bottlePopup.style.display = 'block';
  new Audio('audio/glass-clink.mp3').play();
});

// TROLL-POPUP
const trollOverlay = document.querySelector(".character-overlay.troll");
const trollPopup = document.getElementById("trollPopup");

trollOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAllPopups();
  disableMap();
  trollPopup.style.display = "block";
});

// LUKK-KNAPPER
closeButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.target.parentElement.style.display = 'none';
    enableMap();
  });
});

// BAKGRUNNSLYD
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

// Dialog mellom Traveler og Witch
const dialogSequence = [
  { speaker: "traveler", text: "Greetings… I heard whispers of Princess Pixelia's visit here." },
  { speaker: "witch", text: "Ah… the princess, yes. Rumor says she indulged a bit too much of the Giggling Goblin Grog…" },
  { speaker: "traveler", text: "Really? I hope she left without trouble." },
  { speaker: "witch", text: "Trouble? Ha! She proclaimed our tavern 'terribly outdated!' after her… spirited visit." },
  { speaker: "traveler", text: "Terribly outdated? The Tipsy Troll Tavern? Legends would shiver at such a claim!" },
  { speaker: "witch", text: "Indeed. Even magic can’t shield a place from the eyes of a restless princess." },
  { speaker: "traveler", text: "Then she wants us to adapt… perhaps a new digital home?" },
  { speaker: "witch", text: "Aye… she desires our tales and laughter to echo in the digital age, or vanish like mist." },
  { speaker: "traveler", text: "I see… secrets, spirits, and spells… all need a modern stage." },
  { speaker: "witch", text: "Exactly. And only the curious and brave will uncover what lingers beyond the ale and shadows." },
  { speaker: "traveler", text: "Very well, I will heed your words… and find Princess Pixelia’s trail." },
  { speaker: "witch", text: "Go, traveler… and remember, the tavern’s magic is subtle, yet ever watching." }
];

const traveler = document.querySelector(".character-overlay.traveler");
const witch = document.querySelector(".character-overlay.witch");
const travelerBubble = traveler.querySelector(".speech-bubble");
const witchBubble = witch.querySelector(".speech-bubble");

let currentStep = 0;

// Oppdater bobler basert på tur i dialogen 
function showDialogue(step) {
  const current = dialogSequence[step];

  if (current.speaker === "traveler") {
    travelerBubble.innerHTML = current.text;
    witchBubble.innerHTML = "...";
  } else {
    witchBubble.innerHTML = current.text;
    travelerBubble.innerHTML = "...";
  }
}

// Gå videre i dialogen om riktig karakter klikkes
function nextDialogue(speaker) {
  if (dialogSequence[currentStep].speaker === speaker) {
    showDialogue(currentStep);
    currentStep++;
    if (currentStep >= dialogSequence.length) {
      currentStep = 0; // loop tilbake til start
    }
  }
}

// Klikk på Traveler
traveler.addEventListener("click", (e) => {
  e.stopPropagation();
  nextDialogue("traveler");
});

// Klikk på Witch
witch.addEventListener("click", (e) => {
  e.stopPropagation();
  nextDialogue("witch");
});

// Klikk utenfor: avslutt samtale, nullstill dialogen
document.addEventListener("click", () => {
  currentStep = 0;
  travelerBubble.innerHTML = "...";
  witchBubble.innerHTML = "...";
});