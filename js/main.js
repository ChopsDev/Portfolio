// Main initialization and event coordination

// Resume download - tries PDF first, falls back to print
const RESUME_PDF_PATH = 'files/resume.pdf'; // Change this path when you add your PDF

function downloadResume() {
  fetch(RESUME_PDF_PATH, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        // PDF exists, download it
        const link = document.createElement('a');
        link.href = RESUME_PDF_PATH;
        link.download = 'Bryn_Carter_Resume.pdf';
        link.click();
      } else {
        // PDF doesn't exist, fall back to print
        window.print();
      }
    })
    .catch(() => {
      // Network error or file doesn't exist, fall back to print
      window.print();
    });
}

// CRT click sound on any click (only in cheat mode)
// Skip elements that have their own sound effects
document.addEventListener('click', (e) => {
  if (!cheatsEnabled) return;
  if (e.target.closest('.collapsible, .dropdown-header')) return;
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
