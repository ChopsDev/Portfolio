const htmlBody = document.querySelector("body")
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const leftHeading = leftPanel.querySelector('h1');
const rightHeading = rightPanel.querySelector('h1');
const leftContent = leftPanel.querySelector('.panel-content');
const rightContent = rightPanel.querySelector('.panel-content')
const middle = document.querySelector('.middle');

const HIDE_TEXT = "HIDE"

// Show middle content on page load
middle.classList.add('ready');

// Mark intro animations as complete after they finish
setTimeout(() => {
  middle.classList.add('intro-done');
}, 1000);

// Function to close all panels and reset
function closeAll(keepMiddleShrunk = false) {
  toggleScroll(false);

  leftPanel.classList.remove('expanded', 'expanding');
  rightPanel.classList.remove('expanded', 'expanding');
  leftHeading.classList.remove('slide-left');
  rightHeading.classList.remove('slide-right');
  leftContent.classList.remove('visible');
  rightContent.classList.remove('visible');

  if (!keepMiddleShrunk) {
    middle.classList.remove('shrink');
    // Delay showing content until layout has settled
    setTimeout(() => {
      if (!middle.classList.contains('shrink')) {
        middle.classList.add('ready');
      }
    }, 150);
  }

  rightHeading.textContent = "OTHER"
  leftHeading.textContent = "GAME DEV"
}

// Expand the left panel and shrink the middle
function expandLeft() {
  middle.classList.remove('ready');
  middle.classList.add('shrink');
  closeAll(true);
  toggleScroll(true);
  leftHeading.classList.add('slide-left');
  leftPanel.classList.add('expanding', 'expanded');

  // Hide hint for this panel after first interaction
  leftPanel.classList.add('hint-hidden');

  rightHeading.textContent = HIDE_TEXT
  leftContent.classList.add('visible');
}

// Expand the right panel and shrink the middle
function expandRight() {
  middle.classList.remove('ready');
  middle.classList.add('shrink');
  closeAll(true);
  toggleScroll(true);
  rightHeading.classList.add('slide-right');
  rightPanel.classList.add('expanding', 'expanded');

  // Hide hint for this panel after first interaction
  rightPanel.classList.add('hint-hidden');

  leftHeading.textContent = HIDE_TEXT
  rightContent.classList.add('visible');
}

function toggleScroll(toggle){
    if (toggle){
        htmlBody.classList.remove("no-scroll");
        htmlBody.classList.add("allow-scroll");
    }else {
        htmlBody.classList.remove("allow-scroll");
        htmlBody.classList.add("no-scroll");
    }
}

// Clicking "Game Dev" (left panel)
leftPanel.addEventListener('click', (e) => {
  // Don't trigger panel expansion when clicking on content inside
  if (e.target.closest('.collapsible, .dropdown-header, .content')) return;

  if (rightPanel.classList.contains('expanded')) {
    closeAll();
  } else if (!leftPanel.classList.contains('expanded')) {
    expandLeft();
  }
});

// Clicking "Other Projects" (right panel)
rightPanel.addEventListener('click', (e) => {
  // Don't trigger panel expansion when clicking on content inside
  if (e.target.closest('.collapsible, .dropdown-header, .content')) return;

  if (leftPanel.classList.contains('expanded')) {
    closeAll();
  } else if (!rightPanel.classList.contains('expanded')) {
    expandRight();
  }
});

const coll = document.getElementsByClassName("collapsible");

// Toggle collapsible function
function toggleCollapsible(element) {
  element.classList.toggle("active");
  const isExpanded = element.classList.contains("active");
  element.setAttribute("aria-expanded", isExpanded);

  let content = element.nextElementSibling;

  while (content) {
    if (content.nodeName === "DIV" && content.classList.contains("content")) {
      content.classList.toggle("show");
      content.setAttribute("aria-hidden", !isExpanded);
      break;
    }
    content = content.nextElementSibling;
  }
}

for (let i = 0; i < coll.length; i++) {
  // Add accessibility attributes
  coll[i].setAttribute("role", "button");
  coll[i].setAttribute("tabindex", "0");
  coll[i].setAttribute("aria-expanded", "false");

  coll[i].addEventListener("click", function() {
    toggleCollapsible(this);
  });

  // Keyboard accessibility - Enter and Space to toggle
  coll[i].addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCollapsible(this);
    }
  });
}

// Dropdown functionality for section headers
const dropdownHeaders = document.getElementsByClassName("dropdown-header");

// Toggle dropdown function
function toggleDropdown(header) {
  header.classList.toggle("active");
  const isExpanded = header.classList.contains("active");
  header.setAttribute("aria-expanded", isExpanded);

  const targetId = header.getAttribute("data-target");
  const dropdownContent = document.getElementById(targetId);

  if (dropdownContent) {
    dropdownContent.classList.toggle("show");
  }
}

// Initialize all dropdowns as open by default
for (let i = 0; i < dropdownHeaders.length; i++) {
  const targetId = dropdownHeaders[i].getAttribute("data-target");
  const dropdownContent = document.getElementById(targetId);
  if (dropdownContent) {
    dropdownContent.classList.add("show");
    dropdownHeaders[i].classList.add("active");
    dropdownHeaders[i].setAttribute("aria-expanded", "true");
  }
}

// Add click and keyboard event listeners
for (let i = 0; i < dropdownHeaders.length; i++) {
  dropdownHeaders[i].addEventListener("click", function(e) {
    e.stopPropagation();
    this.blur();
    toggleDropdown(this);
  });

  // Keyboard accessibility - Enter and Space to toggle
  dropdownHeaders[i].addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(this);
    }
  });
}

// Easter egg quotes
const easterEggMessages = [
  "There's nothing out here.",
  "Looking for something?",
  "The void thanks you for visiting.",
  "Some things are better left unzoomed.",
  "You went too far.",
  "There’s no reason to be zoomed out here.",
  "This is not part of the experience.",
  "You found the quiet place.",
  "You’re not meant to be out this far.",
];

let easterEggOverlay = null;
let easterEggShown = false;
let lastWidth = window.innerWidth;

function createEasterEggOverlay() {
  if (easterEggOverlay) return;

  easterEggOverlay = document.createElement('div');
  easterEggOverlay.id = 'zoom-easter-egg';
  easterEggOverlay.innerHTML = `
    <div class="easter-egg-content">
      <p class="easter-egg-message">${easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)]}</p>
      <p class="easter-egg-hint">Zoom in to return</p>
    </div>
  `;
  document.body.appendChild(easterEggOverlay);
}

function triggerReactivePulse() {
  if (!easterEggOverlay) return;
  const message = easterEggOverlay.querySelector('.easter-egg-message');

  easterEggOverlay.classList.remove('reactive');
  void easterEggOverlay.offsetWidth;
  easterEggOverlay.classList.add('reactive');

  if (message) {
    message.classList.remove('reactive');
    void message.offsetWidth;
    message.classList.add('reactive');
  }
}

function checkZoomLevel() {
  // At 30% zoom, innerWidth becomes ~3.3x larger
  // Your screen: 1920px at 100% → 6400px at 30%
  // Trigger when innerWidth > 3800 (catches ~50% zoom on 1920px screens)
  const isZoomedWayOut = window.innerWidth > 3800;
  const widthChanged = Math.abs(window.innerWidth - lastWidth) > 50;

  if (isZoomedWayOut && !easterEggShown) {
    createEasterEggOverlay();
    easterEggOverlay.classList.add('visible');
    easterEggShown = true;
  } else if (!isZoomedWayOut && easterEggShown) {
    if (easterEggOverlay) {
      easterEggOverlay.classList.remove('visible');
    }
    easterEggShown = false;
  } else if (isZoomedWayOut && easterEggShown && widthChanged) {
    triggerReactivePulse();
  }

  lastWidth = window.innerWidth;
}

// Check zoom on resize (debounced for performance)
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkZoomLevel, 30);
});

// Initial check
checkZoomLevel();

// Escape key to close panels
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (leftPanel.classList.contains('expanded') || rightPanel.classList.contains('expanded')) {
      closeAll();
    }
  }
});

// Add keyboard support for panels
leftPanel.setAttribute('tabindex', '0');
rightPanel.setAttribute('tabindex', '0');

leftPanel.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.closest('.collapsible, .dropdown-header, .content')) return;
    e.preventDefault();
    if (rightPanel.classList.contains('expanded')) {
      closeAll();
    } else if (!leftPanel.classList.contains('expanded')) {
      expandLeft();
    }
  }
});

rightPanel.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.closest('.collapsible, .dropdown-header, .content')) return;
    e.preventDefault();
    if (leftPanel.classList.contains('expanded')) {
      closeAll();
    } else if (!rightPanel.classList.contains('expanded')) {
      expandRight();
    }
  }
});

// Dark mode toggle for middle section
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved preference or system preference
function getPreferredTheme() {
  const saved = localStorage.getItem('middle-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    middle.classList.add('dark-mode');
    document.body.classList.add('middle-dark');
  } else {
    middle.classList.remove('dark-mode');
    document.body.classList.remove('middle-dark');
  }
  localStorage.setItem('middle-theme', theme);
}

// Initialize theme and remove pending class
setTheme(getPreferredTheme());
document.documentElement.classList.remove('middle-dark-pending');

// Toggle on click
themeToggle.addEventListener('click', () => {
  const isDark = middle.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('middle-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Konami Code Easter Egg
const konamiSequence = [];
const konamiCode = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  if (konamiSequence.length > 10) konamiSequence.shift();

  if (konamiSequence.join(',') === konamiCode) {
    konamiSequence.length = 0;
    triggerKonamiEasterEgg();
  }
});

function triggerKonamiEasterEgg() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'konami-overlay';
  overlay.innerHTML = `
    <div class="konami-content">
      <p class="konami-code">↑↑↓↓←→←→BA</p>
      <p class="konami-message">+30 Lives Granted</p>
      <p class="konami-sub">You found the secret!</p>
    </div>
  `;
  document.body.appendChild(overlay);

  // Create confetti
  for (let i = 0; i < 50; i++) {
    setTimeout(() => createConfetti(), i * 30);
  }

  // Remove after animation
  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 500);
  }, 2500);
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'konami-confetti';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'][Math.floor(Math.random() * 6)];
  confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
  confetti.style.animationDelay = Math.random() * 0.5 + 's';
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 4000);
}
