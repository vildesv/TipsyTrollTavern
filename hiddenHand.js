// Hent popup
const contactPopup = document.getElementById('contactPopup');
const contactForm = document.getElementById('contactForm');

// Hent overlay
const contactOverlay = document.querySelector('.contact-overlay');

// Hent close-knapp
const closeButton = contactPopup.querySelector('.close-btn');

// === Åpne popup ved klikk på overlay ===
contactOverlay.addEventListener('click', () => {
  contactPopup.style.display = 'block';
});

// === Close-knapp ===
closeButton.addEventListener('click', () => {
  contactPopup.style.display = 'none';
  contactForm.reset();
});

// === Send skjema ===
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value
  };
  
  // Logg i konsollen
  console.log("Contact form submitted:", formData);
  
  // Lagre lokalt
  const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  storedMessages.push(formData);
  localStorage.setItem('messages', JSON.stringify(storedMessages));

  // Bekreftelse og reset
  alert("Message sent! Check console or localStorage.");
  contactForm.reset();
  contactPopup.style.display = 'none';
});