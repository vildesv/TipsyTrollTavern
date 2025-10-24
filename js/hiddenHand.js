// === CONTACT POPUP ===
const contactPopup = document.getElementById("contactPopup");
const contactForm = document.getElementById("contactForm");
const contactOverlay = document.querySelector(".contact-overlay");
const contactCloseBtn = contactPopup.querySelector(".close-btn");

contactOverlay.addEventListener("click", () => {
  contactPopup.style.display = "block";
});

contactCloseBtn.addEventListener("click", () => {
  contactPopup.style.display = "none";
  contactForm.reset();
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
  };

  console.log("Contact form submitted:", formData);

  const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  storedMessages.push(formData);
  localStorage.setItem("messages", JSON.stringify(storedMessages));

  alert("Message sent! Check console or localStorage.");
  contactForm.reset();
  contactPopup.style.display = "none";
});

// === CHARACTER POPUPS ===
const characters = [
  {
    overlay: document.querySelector(".character-overlay.one"),
    popupId: "infoPopup",
    text: `
      Ah, traveler, come closer… <br /><br />
      Though your eyes see the hall, few perceive the quiet hand that guides the unseen. 
      We, <em>the Hidden Hand</em>, move like whispers among shadows, weaving secrets older than the oldest trees. 
      Knowledge is our companion, patience our ally. <br /><br />
      Heed well, for the world is richer than it appears, and even the faintest light may reveal a path where none seemed to exist.
      Remember, not all is as it seems. Trust in the unseen, for in the hidden lies true power.<br /><br />
    `,
  },
  {
    overlay: document.querySelector(".character-overlay.two"),
    popupId: "infoPopup2",
    text: `
      Wisdom is whispered, not shouted. 
      Those who rush through the halls find only echoes, while the careful observer discerns what others overlook. <br /><br />
    `,
  },
  {
    overlay: document.querySelector(".character-overlay.three"),
    popupId: "infoPopup3",  
    text: `
    Heh, heh… you’ve got the look of someone who fancies a little <em>risk</em>. <br /><br />
    Name’s Gribz. Cards, dice, coins — if it clinks or flips, I’ve probably lost and won it twice. 
    Luck? Bah! Luck’s just the name fools give to skill they don’t understand. <br /><br />
    Every hand’s a story, every shuffle a chance to rewrite it. 
    The trick isn’t knowing when to play your cards — it’s making others believe you’ve already won. <br /><br />
    `,
  },
];

// Hjelpefunksjon for å lukke alle popups
function closeAllCharacterPopups() {
  characters.forEach(c => {
    const popup = document.getElementById(c.popupId);
    if (popup) popup.style.display = "none";
  });
}

characters.forEach((char) => {
  // Opprett popup dynamisk hvis den ikke finnes
  let popup = document.getElementById(char.popupId);
  if (!popup) {
    popup = document.createElement("div");
    popup.id = char.popupId;
    popup.classList.add("popup");
    popup.innerHTML = `
      <p>${char.text}</p>
      <button type="button" class="close-btn">Close</button>
    `;
    document.body.appendChild(popup);
  }

  const closeBtn = popup.querySelector(".close-btn");

  char.overlay.addEventListener("click", () => {
    closeAllCharacterPopups();  // Lukk alle før vi åpner denne
    popup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

// === BAKGRUNNSLYD ===
const bgAudio = new Audio('audio/pirate-tavern.wav'); // endre per side
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
