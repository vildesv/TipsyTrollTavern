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