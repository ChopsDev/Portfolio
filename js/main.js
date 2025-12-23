// Main initialization and event coordination

// CRT click sound on any click (only in cheat mode)
document.addEventListener('click', () => {
  if (!cheatsEnabled) return;
  playCRTClick();
});

// CRT hover sound on interactive elements (only in cheat mode)
document.addEventListener('mouseover', (e) => {
  if (!cheatsEnabled) return;

  const interactive = e.target.closest('a, button, .collapsible, .dropdown-header, .page-btn, .contact-link, .game-link, .theme-toggle, .lightbox-img, .panel');
  if (interactive && !interactive.dataset.hovered) {
    interactive.dataset.hovered = 'true';
    playCRTHover();
  }
});

document.addEventListener('mouseout', (e) => {
  const interactive = e.target.closest('a, button, .collapsible, .dropdown-header, .page-btn, .contact-link, .game-link, .theme-toggle, .lightbox-img, .panel');
  if (interactive) {
    delete interactive.dataset.hovered;
  }
});

// CRT typing sound on input fields (only in cheat mode)
document.addEventListener('input', (e) => {
  if (!cheatsEnabled) return;

  const tagName = e.target.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea') {
    playCRTType();
  }
}, true);

// Initialize name click easter egg
initNameClickEasterEgg();
